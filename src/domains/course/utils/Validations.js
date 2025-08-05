export function isAvalidateUrl(url) {
  try {
    const validUrl = new URL(url);
    return validUrl.toString() !== "";
  } catch {
    return false;
  }
}
