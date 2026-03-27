import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../public/images");
const API_KEY = "AIzaSyC5PYtojm4UZI10Yuhqk6_BG88FLSMW1JM";
const MODEL = "imagen-4.0-generate-001";
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`;

const images = [
  {
    name: "hero-main",
    prompt:
      "Professional physiotherapist gently treating a patient's back in a bright modern clinic. Sage green and white interior, natural light through large windows, clean minimalist space. Warm professional atmosphere, documentary-style photography, soft bokeh background, 35mm lens.",
    aspectRatio: "3:4",
  },
  {
    name: "hero-secondary",
    prompt:
      "Serene physiotherapy clinic waiting room interior, Scandinavian minimal design, sage green accent wall, white furniture, potted plants, warm natural light, calm and professional atmosphere. Architectural photography.",
    aspectRatio: "3:4",
  },
  {
    name: "team-tereza",
    prompt:
      "Professional headshot portrait of a Czech female physiotherapist in her 40s, warm confident smile, wearing white medical uniform, clinic background with soft bokeh, natural lighting, professional photography.",
    aspectRatio: "3:4",
  },
  {
    name: "team-jakub",
    prompt:
      "Professional headshot portrait of a Czech male physiotherapist in his 30s, athletic build, friendly smile, wearing dark blue medical polo shirt, modern clinic background soft bokeh, natural lighting.",
    aspectRatio: "3:4",
  },
  {
    name: "team-petra",
    prompt:
      "Professional headshot portrait of a Czech female physiotherapist in her late 30s, gentle warm smile, brown hair, white medical uniform, bright clinic background with soft bokeh, natural window light.",
    aspectRatio: "3:4",
  },
  {
    name: "team-martin",
    prompt:
      "Professional headshot portrait of a Czech male physiotherapist in his early 30s, short dark hair, confident smile, white medical coat, modern physiotherapy clinic background soft bokeh, professional headshot.",
    aspectRatio: "3:4",
  },
  {
    name: "services-bg",
    prompt:
      "Abstract close-up of human hands performing gentle physiotherapy massage on a shoulder, soft focus, warm skin tones, sage green clinic towel, medical professional setting, artistic photography.",
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
    throw new Error(`API error for ${image.name}: ${response.status} ${err}`);
  }

  const data = await response.json();

  if (!data.predictions?.[0]?.bytesBase64Encoded) {
    throw new Error(`No image data returned for ${image.name}: ${JSON.stringify(data)}`);
  }

  const base64 = data.predictions[0].bytesBase64Encoded;
  const buffer = Buffer.from(base64, "base64");
  const filePath = path.join(OUTPUT_DIR, `${image.name}.png`);
  fs.writeFileSync(filePath, buffer);
  console.log(`  ✓ Saved: public/images/${image.name}.png`);
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Generating ${images.length} images via Gemini Imagen 3...\n`);

  for (const image of images) {
    try {
      await generateImage(image);
      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
    }
  }

  console.log("\nDone!");
}

main();
