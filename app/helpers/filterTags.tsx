import { Tag } from '@/context/MissionContext';

export function areTagsEqual(a: Tag, b: Tag) {
  return a.name === b.name && a.type === b.type;
}

export function isTagActive(tag: Tag, filters: Tag[]) {
  return filters.some((f) => areTagsEqual(f, tag));
}

export function removeTag(filters: Tag[], tag: Tag) {
  return filters.filter((f) => !areTagsEqual(f, tag));
}

export function addTag(filters: Tag[], tag: Tag) {
  return [...filters, tag];
}

export function setStatusFilter(filters: Tag[], tag: Tag | null) {
  const withoutStatus = filters.filter((f) => f.type !== 'status');
  if (!tag) return withoutStatus;
  return [...withoutStatus, tag];
}
