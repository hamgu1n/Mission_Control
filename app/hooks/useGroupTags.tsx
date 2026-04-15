import { useMemo } from 'react';
import { groupTags } from '../helpers/groupTags';
import { Mission } from '../../context/MissionContext';

export function useGroupedTags(currentMissions: Mission[]) {
  return useMemo(() => groupTags(currentMissions), [currentMissions]);
}
