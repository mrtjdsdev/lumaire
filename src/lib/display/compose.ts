import {
  PANEL,
  type Composition,
  cropRect,
  fillPlacement,
  fitPlacement,
} from "@/lib/display/geometry";

const PAPER = "#efe4d4";

function clampChannel(value: number) {
  return Math.max(0, Math.min(255, value));
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  composition: Composition,
) {
  ctx.save();
  ctx.clearRect(0, 0, PANEL.width, PANEL.height);
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, PANEL.width, PANEL.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  if (composition.mode === "fit") {
    const place = fitPlacement(sourceWidth, sourceHeight);
    ctx.drawImage(image, place.dx, place.dy, place.dw, place.dh);
  } else if (composition.mode === "fill") {
    const place = fillPlacement(sourceWidth, sourceHeight, composition);
    ctx.drawImage(image, place.dx, place.dy, place.dw, place.dh);
  } else {
    const crop = cropRect(sourceWidth, sourceHeight, composition);
    ctx.drawImage(
      image,
      crop.x * sourceWidth,
      crop.y * sourceHeight,
      crop.width * sourceWidth,
      crop.height * sourceHeight,
      0,
      0,
      PANEL.width,
      PANEL.height,
    );
  }

  if (composition.tone === "graphite") {
    const pixels = ctx.getImageData(0, 0, PANEL.width, PANEL.height);
    const data = pixels.data;
    for (let index = 0; index < data.length; index += 4) {
      const luminance = 0.2126 * data[index] + 0.7152 * data[index + 1] + 0.0722 * data[index + 2];
      const lifted = luminance * 0.92 + 16;
      data[index] = clampChannel(lifted * 1.02);
      data[index + 1] = clampChannel(lifted * 0.98);
      data[index + 2] = clampChannel(lifted * 0.9);
    }
    ctx.putImageData(pixels, 0, 0);
  }

  ctx.restore();
}

export async function renderFrameBlob(
  image: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  composition: Composition,
) {
  const canvas = document.createElement("canvas");
  canvas.width = PANEL.width;
  canvas.height = PANEL.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not prepare the frame.");
  drawFrame(ctx, image, sourceWidth, sourceHeight, composition);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Could not prepare the frame.");
  return blob;
}
