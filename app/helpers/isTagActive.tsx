import { Tag } from "@/context/MissionContext";
import areTagsEqual from "./areTagsEqual";

export default function isTagActive(tag: Tag, activeFilters: Tag[]) {
  return activeFilters.some((activeTag) => areTagsEqual(activeTag, tag));
}
