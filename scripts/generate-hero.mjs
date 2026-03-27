import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../public/images");
const API_KEY = "AIzaSyC5PYtojm4UZI10Yuhqk6_BG88FLSMW1JM";
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;

const images = [
  {
    name: "hero-main",
    prompt:
      "A Czech female physiotherapist in her mid-30s with shoulder-length dark brown hair, wearing a clean white medical uniform, gently treating a patient's back in her private physiotherapy practice. Bright modern studio with sage green plants, white walls, warm natural window light. The therapist has a warm confident smile and focused expression. Editorial photography, shallow depth of field, intimate professional atmosphere.",
    aspectRatio: "9:16",
  },
  {
    name: "hero-secondary",
    prompt:
      "Cozy private physiotherapy practice interior in Prague, minimal Scandinavian design, sage green accent wall, white treatment table, wooden shelf with plants, natural light, warm and calm atmosphere. No people. Architectural photography.",
    aspectRatio: "3:4",
  },
];

async function generateImage(image) {
  console.log(`Generating: ${image.name}...`);
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt: image.prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: image.aspectRatio,
        safetyFilterLevel: "block_some",
        personGeneration: "allow_adult",
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`${response.status} ${err}`);
  }

  const data = await response.json();
  const base64 = data.predictions?.[0]?.bytesBase64Encoded;
  if (!base64) throw new Error(`No image data`);

  const buffer = Buffer.from(base64, "base64");
  const filePath = path.join(OUTPUT_DIR, `${image.name}.png`);
  fs.writeFileSync(filePath, buffer);
  console.log(`  ✓ Saved: public/images/${image.name}.png`);
}

async function main() {
  for (const image of images) {
    try {
      await generateImage(image);
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      console.error(`  ✗ Failed ${image.name}: ${err.message}`);
    }
  }
}
main();
