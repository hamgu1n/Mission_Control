import { Tag } from '@/context/MissionContext';

export function groupTags(missions: { tags?: Tag[] }[]) {
  const allTags = new Map<string, Tag>();

  missions.forEach((mission) => {
    mission.tags?.forEach((tag) => {
      if (!allTags.has(tag.name)) {
        allTags.set(tag.name, tag);
      }
    });
  });

  const labelTags: Tag[] = [];
  const statusTags: Tag[] = [];
  const dateTags: Tag[] = [];
  const timeTags: Tag[] = [];

  Array.from(allTags.values()).forEach((tag) => {
    switch (tag.type) {
      case 'label':
        labelTags.push(tag);
        break;
      case 'status':
        statusTags.push(tag);
        break;
      case 'date':
        dateTags.push(tag);
        break;
      case 'time':
        timeTags.push(tag);
        break;
      default:
        if (!tag.type) labelTags.push(tag);
    }
  });

  return {
    labelTags,
    statusTags,
    dateTags,
    timeTags,
  };
}
