import imageCompression from "browser-image-compression";

const MAX_SIZE_MB = 0.15;

async function compressImage(image: File) {
  const compressedFile = await imageCompression(image, {
    maxSizeMB: MAX_SIZE_MB,
  });
  return compressedFile;
}

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

export async function parseImage(image: File) {
  let img: File = image;
  if (bytesToMB(image.size) > MAX_SIZE_MB) {
    img = await compressImage(image);
  }
  return getImageData(img);
}
