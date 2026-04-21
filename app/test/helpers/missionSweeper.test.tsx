import { missionSweeper } from '../../helpers/missionSweeper';
import type { Mission } from '@/context/MissionContext';

// -------------------- FIXED TIME --------------------

const BASE_DATE = new Date('2026-01-10T00:00:00.000Z');

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(BASE_DATE);
});

afterAll(() => {
  jest.useRealTimers();
});

// -------------------- TEST DATA --------------------

const baseMission = {
  title: 'Test',
  tags: [],
  goals: [],
  resources: [],
} as Mission;

// -------------------- TESTS --------------------

describe('missionSweeper', () => {
  test('returns false when no metadata tag exists', () => {
    const result = missionSweeper(baseMission);

    expect(result).toBe(false);
  });

  test('returns false when mission is within threshold', () => {
    const mission: Mission = {
      ...baseMission,
      tags: [
        {
          name: '2026-01-08 00:00',
          type: 'metadata',
          color: 'tag-slate',
        },
      ],
    };

    const result = missionSweeper(mission, 7);

    expect(result).toBe(false);
  });

  test('returns true when mission is older than threshold', () => {
    const mission: Mission = {
      ...baseMission,
      tags: [
        {
          name: '2025-12-01 00:00',
          type: 'metadata',
          color: 'tag-slate',
        },
      ],
    };

    const result = missionSweeper(mission, 7);

    expect(result).toBe(true);
  });

  test('uses custom days threshold', () => {
    const mission: Mission = {
      ...baseMission,
      tags: [
        {
          name: '2026-01-01 00:00',
          type: 'metadata',
          color: 'tag-slate',
        },
      ],
    };

    const result = missionSweeper(mission, 30);

    expect(result).toBe(false);
  });
});
