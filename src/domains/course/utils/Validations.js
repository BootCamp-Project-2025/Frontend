export function isAvalidateUrl(url) {
  try {
    const validUrl = new URL(url);
    console.log(validUrl.toString() !== "");
    return validUrl.toString() !== "";
  } catch {
    return false;
  }
}
