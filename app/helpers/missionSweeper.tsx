import { Mission } from "@/context/MissionContext";

export function missionSweeper(mission: Mission, days = 7) {
  // Find the metadata tag with timestamp
  const metadataTag = mission.tags?.find(tag => tag.type === "metadata");

  if (!metadataTag) return false;

  // metadata name is expected to be "YYYY-MM-DD HH:MM"
  const missionDate = new Date(metadataTag.name);

  const now = new Date();
  const diffMs = now.getTime() - missionDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays > days;
}
