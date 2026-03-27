import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../public/images");
const API_KEY = "AIzaSyC5PYtojm4UZI10Yuhqk6_BG88FLSMW1JM";
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;

const images = [
  {
    name: "about-petra",
    prompt:
      "Professional portrait photo of a Czech female physiotherapist in her mid-30s, warm confident smile, shoulder-length dark brown hair, wearing a clean white medical uniform, standing in a bright modern private physiotherapy practice with sage green plants and wooden accents in the background. Natural window light, editorial photography style, shallow depth of field.",
    aspectRatio: "3:4",
  },
  {
    name: "about-petra-work",
    prompt:
      "Female physiotherapist in her 30s with dark hair gently treating a patient's neck in a cozy private clinic. Sage green walls, natural wood furniture, warm light. Intimate, professional atmosphere. Editorial documentary style photography.",
    aspectRatio: "16:9",
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
  if (!base64) throw new Error(`No image data: ${JSON.stringify(data)}`);

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
