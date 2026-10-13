import fs from "fs";
import path from "path";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.json();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`Failed downloading ${url}:`, err.message);
    return false;
  }
}

async function main() {
  console.log("Starting Krendora Crawler & Auditor...");

  // 1. Fetch Products
  console.log("Fetching products.json...");
  const productsData = await fetchJSON("https://krendora.com/products.json?limit=250");
  const rawProducts = productsData.products || [];
  console.log(`Retrieved ${rawProducts.length} products.`);

  // 2. Fetch Collections
  console.log("Fetching collections.json...");
  let collections = [];
  try {
    const collData = await fetchJSON("https://krendora.com/collections.json");
    collections = collData.collections || [];
    console.log(`Retrieved ${collections.length} collections.`);
  } catch (e) {
    console.warn("Collections fetch warning:", e.message);
  }

  // 3. Fetch Pages
  console.log("Fetching pages.json...");
  let pages = [];
  try {
    const pageData = await fetchJSON("https://krendora.com/pages.json");
    pages = pageData.pages || [];
    console.log(`Retrieved ${pages.length} pages.`);
  } catch (e) {
    console.warn("Pages fetch warning:", e.message);
  }

  // 4. Fetch Policies
  console.log("Fetching policies & info pages...");
  const policyUrls = {
    shipping: "https://krendora.com/policies/shipping-policy",
    refund: "https://krendora.com/policies/refund-policy",
    privacy: "https://krendora.com/policies/privacy-policy",
    terms: "https://krendora.com/policies/terms-of-service",
    contact: "https://krendora.com/pages/contact",
    faq: "https://krendora.com/pages/faq"
  };

  const policies = {};
  for (const [key, url] of Object.entries(policyUrls)) {
    try {
      const html = await fetchText(url);
      policies[key] = { url, html };
      console.log(`Fetched policy/page: ${key} (${html.length} chars)`);
    } catch (e) {
      console.warn(`Policy fetch failed for ${key}:`, e.message);
    }
  }

  // 5. Download Product Images
  console.log("Downloading primary product images to public/assets/products/...");
  const enrichedProducts = [];

  for (const p of rawProducts) {
    const localImages = [];
    for (let i = 0; i < (p.images || []).length; i++) {
      const img = p.images[i];
      const ext = path.extname(new URL(img.src).pathname) || ".jpg";
      const filename = `${p.id}_${i}${ext}`;
      const dest = path.join("public", "assets", "products", filename);
      const localRelPath = `/assets/products/${filename}`;

      // Download up to 3 images per product for speed & storage
      if (i < 4) {
        if (!fs.existsSync(dest)) {
          console.log(`Downloading ${p.id} img ${i}...`);
          const ok = await downloadImage(img.src, dest);
          if (ok) {
            localImages.push(localRelPath);
          } else {
            localImages.push(img.src);
          }
        } else {
          localImages.push(localRelPath);
        }
      } else {
        localImages.push(img.src);
      }
    }

    enrichedProducts.push({
      ...p,
      localImages: localImages.length > 0 ? localImages : [p.images?.[0]?.src || "/assets/lifestyle-accessories.jpg"],
    });
  }

  // Save data files
  fs.writeFileSync("src/data/krendora_products.json", JSON.stringify(enrichedProducts, null, 2));
  fs.writeFileSync("src/data/krendora_collections.json", JSON.stringify(collections, null, 2));
  fs.writeFileSync("src/data/krendora_pages.json", JSON.stringify(pages, null, 2));
  fs.writeFileSync("src/data/krendora_policies.json", JSON.stringify(policies, null, 2));

  console.log("Successfully scraped and saved all Krendora data!");
}

main().catch(console.error);
