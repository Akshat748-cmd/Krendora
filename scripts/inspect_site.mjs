import fs from "fs";

const content = fs.readFileSync("C:/Users/Office/.gemini/antigravity-ide/brain/0552b917-1c72-46c7-9ede-141f66f920e6/.system_generated/steps/125/content.md", "utf8");

// Announcement bar
const annRegex = /announcement[\s\S]*?<\/div>/gi;
const m = content.match(/<header[\s\S]*?<\/header>/i);
if (m) {
  const headerText = m[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  console.log("Header text:", headerText.substring(0, 500));
}

// Check announcements
const annSection = content.match(/announcement-bar[\s\S]*?<\/aside>/i) || content.match(/announcements_[\s\S]*?<\/header>/i);
if (annSection) {
  console.log("Announcement section text:", annSection[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").substring(0, 300));
}

// Find all collection titles and links in header
const headerHtml = m ? m[0] : "";
const linkMatches = [...headerHtml.matchAll(/href="([^"]+)"[^>]*>([^<]+)<\/a>/g)];
console.log("Header links found:", linkMatches.map(lm => ({ href: lm[1], text: lm[2].trim() })).filter(l => l.text));
