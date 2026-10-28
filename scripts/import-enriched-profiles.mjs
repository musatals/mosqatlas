import fs from "node:fs";
import path from "node:path";

const inputPath = process.argv[2];
const outputPath = process.argv[3] ?? "research/data/enriched_profiles_6.json";

if (!inputPath) {
  throw new Error("Usage: node scripts/import-enriched-profiles.mjs <review.md> [output.json]");
}

const markdown = fs.readFileSync(inputPath, "utf8").replaceAll("\r\n", "\n");
const lines = markdown.split("\n");
const profiles = [];
let currentProfile = null;
let currentSection = null;

const localizedTitleCorrections = new Map([
  ["MOS-0004:02:fr", "Le rythme des arcs superposés"],
]);

const finishSection = () => {
  if (!currentSection || !currentProfile) return;
  const sectionNumber = String(currentProfile.sections.length + 1).padStart(2, "0");
  currentSection.id = `${currentProfile.record_id}-${sectionNumber}`;
  for (const locale of ["en", "fr", "ar"]) {
    const correction = localizedTitleCorrections.get(`${currentProfile.record_id}:${sectionNumber}:${locale}`);
    if (correction) currentSection.content[locale].title = correction;
    if (!currentSection.content[locale]?.title || !currentSection.content[locale]?.body) {
      throw new Error(`${currentSection.id} is missing ${locale} content`);
    }
  }
  if (!currentSection.source_ids.length) throw new Error(`${currentSection.id} has no linked sources`);
  currentProfile.sections.push(currentSection);
  currentSection = null;
};

const finishProfile = () => {
  finishSection();
  if (!currentProfile) return;
  if (!currentProfile.record_id) throw new Error(`Profile ${currentProfile.names.en} has no record ID`);
  if (currentProfile.sections.length !== 4) throw new Error(`${currentProfile.record_id} must contain four sections`);
  profiles.push(currentProfile);
  currentProfile = null;
};

for (let index = 0; index < lines.length; index += 1) {
  const line = lines[index].trim();
  if (line.startsWith("## ")) {
    finishProfile();
    const names = line.slice(3).split(" · ");
    if (names.length !== 3) throw new Error(`Expected three localized names in: ${line}`);
    currentProfile = { record_id: "", names: { en: names[0], fr: names[1], ar: names[2] }, sections: [] };
    continue;
  }
  if (!currentProfile) continue;
  const recordMatch = line.match(/^\*\*Record:\*\* `([^`]+)`/);
  if (recordMatch) {
    currentProfile.record_id = recordMatch[1];
    continue;
  }
  const sectionMatch = line.match(/^### \d+\. (.+)$/);
  if (sectionMatch) {
    finishSection();
    currentSection = {
      id: "",
      visibility: "visitor_and_research",
      content: { en: { title: "", body: "" }, fr: { title: "", body: "" }, ar: { title: "", body: "" } },
      source_ids: [],
    };
    continue;
  }
  if (!currentSection) continue;
  if (line === "*Visibility: Research View only*") currentSection.visibility = "research_only";
  for (const locale of ["en", "fr", "ar"]) {
    const label = locale.toUpperCase();
    const titleMatch = line.match(new RegExp(`^\\*\\*${label} — (.+)\\*\\*$`));
    if (titleMatch) {
      currentSection.content[locale].title = titleMatch[1];
      let bodyIndex = index + 1;
      while (bodyIndex < lines.length && !lines[bodyIndex].trim()) bodyIndex += 1;
      currentSection.content[locale].body = lines[bodyIndex].trim();
    }
  }
  if (line.startsWith("**Linked sources:**")) {
    currentSection.source_ids = [...line.matchAll(/`(SRC-[A-Z-]+)`/g)].map((match) => match[1]);
  }
}
finishProfile();

if (profiles.length !== 6) throw new Error(`Expected six profiles, found ${profiles.length}`);
const data = {
  schema_version: "1.0.0",
  editorial_status: "source_linked_editorial_synthesis_pending_scholarly_and_translation_review",
  profiles,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Imported ${profiles.length} profiles and ${profiles.reduce((sum, profile) => sum + profile.sections.length, 0)} sections to ${outputPath}`);
