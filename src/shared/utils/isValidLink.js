export default function isValidLink(value) {
  const urlPattern = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w.-]*)*\/?$/;
  console.log(urlPattern.test(value), value, "ASAASAS");
  return urlPattern.test(value);
}
