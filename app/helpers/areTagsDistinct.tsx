export function areTagsDistinct(tags: string[]) {
  const seen = new Set<string>();

  return tags.every((tag) => {
    const key = tag.trim().toLowerCase();

    if (!key) return true;
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}
