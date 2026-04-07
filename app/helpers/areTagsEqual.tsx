import { Tag } from "@/context/MissionContext";

export default function areTagsEqual(tag1: Tag, tag2: Tag) {
  return tag1.name === tag2.name && tag1.type === tag2.type
}
