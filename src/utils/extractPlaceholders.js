// A simple regex to extract {{placeholder}} from text

export default function extractPlaceholders(text) {
  const regex = /{{(.*?)}}/g;
  const matches = new Set();
  let match;

  while ((match = regex.exec(text)) !== null) {
    matches.add(match[1].trim());
  }

  return Array.from(matches);
}
