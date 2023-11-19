import imageCompression, { Options } from "browser-image-compression";

const MAX_SIZE_MB = 0.15;

async function getImageData(image: File) {
  const dataUrl = await imageCompression.getDataUrlFromFile(image);
  return {
    name: image.name,
    dataUrl,
  };
}

function bytesToMB(bytes: number): number {
  return bytes / (1024 * 1024);
}

export async function parseImage(image: File, options: Options) {
  let img: File = image;
  if (bytesToMB(image.size) > MAX_SIZE_MB) {
    img = await imageCompression(image, {
      ...options,
      maxSizeMB: MAX_SIZE_MB,
      useWebWorker: true,
    });
  }
  return getImageData(img);
}
