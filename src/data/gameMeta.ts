export interface GameMetaData {
  id: number;
  levelNumber: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  tagline: string;
  description: string;
  detailedObjective: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  xpReward: number;
  skills: string[];
  interactionType: string;
  hintAvailability: string;
  iconName?: string;
  howToPlay: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  previewData?: {
    array?: number[];
    target?: number;
    low?: number;
    mid?: number;
    high?: number;
  };
}

export const GAME_CATALOG: GameMetaData[] = [
  // =========================================================================
  // LEVEL 01: BINARY SEARCH BASICS (FIND THE MIDDLE)
  // =========================================================================
  {
    id: 1,
    levelNumber: 1,
    title: 'FIND THE MIDDLE',
    shortTitle: 'Find the Middle',
    subtitle: 'Binary Search Basics',
    tagline: 'Identify the middle element in a sorted array.',
    description: 'Identify the middle element of a sorted array.',
    detailedObjective: 'Understand where Binary Search starts by computing the middle index and inspecting arr[mid].',
    difficulty: 'Beginner',
    duration: '2 min',
    xpReward: 100,
    skills: ['Binary Search Basics', 'Midpoint Calculation', 'Zero-Indexed Arrays'],
    interactionType: 'Inspect middle element and verify match',
    hintAvailability: '3-stage progressive hints',
    iconName: 'target',
    howToPlay: [
      { stepNumber: 1, title: 'Observe Array', description: 'low = 0, high = 6 in [5, 12, 18, 23, 31, 39, 45].' },
      { stepNumber: 2, title: 'Calculate Mid', description: 'mid = Math.floor((0 + 6) / 2) = 3.' },
      { stepNumber: 3, title: 'Check Value', description: 'arr[3] is 23, which matches the target.' },
    ],
    previewData: { array: [5, 12, 18, 23, 31, 39, 45], target: 23, low: 0, mid: 3, high: 6 },
  },

  // =========================================================================
  // LEVEL 02: LEFT OR RIGHT (CHOOSE THE HALF)
  // =========================================================================
  {
    id: 2,
    levelNumber: 2,
    title: 'CHOOSE THE HALF',
    shortTitle: 'Choose the Half',
    subtitle: 'Left or Right Decision',
    tagline: 'Compare TARGET with MID and choose the correct half.',
    description: 'Compare TARGET with MID and choose the correct half.',
    detailedObjective: 'Understand the rule: target > mid → RIGHT HALF, target < mid → LEFT HALF.',
    difficulty: 'Beginner',
    duration: '2 min',
    xpReward: 100,
    skills: ['Value Comparison', 'Direction Decision', 'Half Elimination'],
    interactionType: 'Directional selection',
    hintAvailability: '3-stage progressive hints',
    iconName: 'predict',
    howToPlay: [
      { stepNumber: 1, title: 'Find Mid', description: 'Current mid = 3, value is arr[3] = 23.' },
      { stepNumber: 2, title: 'Compare Target', description: 'Target 39 > 23.' },
      { stepNumber: 3, title: 'Select Half', description: 'Since 39 > 23, search the RIGHT HALF.' },
    ],
    previewData: { array: [5, 12, 18, 23, 31, 39, 45], target: 39, low: 0, mid: 3, high: 6 },
  },

  // =========================================================================
  // LEVEL 03: LOW, MID & HIGH (MOVE THE BOUNDARIES)
  // =========================================================================
  {
    id: 3,
    levelNumber: 3,
    title: 'MOVE THE BOUNDARIES',
    shortTitle: 'Move the Boundaries',
    subtitle: 'Boundary Pointer Updates',
    tagline: 'Update LOW or HIGH after comparing target with MID.',
    description: 'Update LOW or HIGH after comparing the target with MID.',
    detailedObjective: 'Understand how setting high = mid - 1 or low = mid + 1 eliminates half the range.',
    difficulty: 'Beginner',
    duration: '2 min',
    xpReward: 120,
    skills: ['Boundary Updates', 'Pointer Mechanics', 'Search Range Reduction'],
    interactionType: 'Pointer boundary adjustment',
    hintAvailability: '3-stage progressive hints',
    iconName: 'build',
    howToPlay: [
      { stepNumber: 1, title: 'Compare', description: 'Target 12 < arr[3] (23).' },
      { stepNumber: 2, title: 'Update High', description: 'High becomes mid - 1 = 2.' },
      { stepNumber: 3, title: 'Observe Range', description: 'Active range narrows to [0 .. 2].' },
    ],
    previewData: { array: [5, 12, 18, 23, 31, 39, 45], target: 12, low: 0, mid: 3, high: 6 },
  },

  // =========================================================================
  // LEVEL 04: CALCULATE MID (MIDPOINT MASTER)
  // =========================================================================
  {
    id: 4,
    levelNumber: 4,
    title: 'MIDPOINT MASTER',
    shortTitle: 'Midpoint Master',
    subtitle: 'Calculate Midpoint',
    tagline: 'mid = (low + high) / 2 and mid = low + (high - low) / 2.',
    description: 'Calculate the middle index correctly using integer arithmetic.',
    detailedObjective: 'Master both standard and overflow-safe midpoint formulas for integer indexing.',
    difficulty: 'Beginner',
    duration: '2 min',
    xpReward: 120,
    skills: ['Midpoint Formula', 'Integer Arithmetic', 'Overflow Prevention'],
    interactionType: 'Calculation and verification',
    hintAvailability: '3-stage progressive hints',
    iconName: 'speed',
    howToPlay: [
      { stepNumber: 1, title: 'Given Range', description: 'low = 2, high = 9.' },
      { stepNumber: 2, title: 'Apply Formula', description: 'mid = Math.floor((2 + 9) / 2) = 5.' },
      { stepNumber: 3, title: 'Verify', description: 'arr[5] = 29 matches the target.' },
    ],
    previewData: { array: [3, 7, 11, 16, 22, 29, 36, 44, 53, 63], target: 29, low: 2, mid: 5, high: 9 },
  },

  // =========================================================================
  // LEVEL 05: COMPLETE THE SEARCH (SEARCH TO THE TARGET)
  // =========================================================================
  {
    id: 5,
    levelNumber: 5,
    title: 'SEARCH TO THE TARGET',
    shortTitle: 'Search to the Target',
    subtitle: 'Complete Algorithm Execution',
    tagline: 'Find MID → Compare → Choose Half → Update Range → Repeat.',
    description: 'Perform the complete Binary Search algorithm step by step.',
    detailedObjective: 'Follow the full Binary Search process to eliminate half the array at every step.',
    difficulty: 'Intermediate',
    duration: '3 min',
    xpReward: 150,
    skills: ['Full Execution', 'Iterative Loop', 'Convergence'],
    interactionType: 'Multi-step interactive search',
    hintAvailability: '3-stage progressive hints',
    iconName: 'target',
    howToPlay: [
      { stepNumber: 1, title: 'Step 1', description: 'mid = 3 (23). Target 39 > 23 → search right (low = 4).' },
      { stepNumber: 2, title: 'Step 2', description: 'mid = 5 (39). Target 39 === arr[5] → Target Found!' },
    ],
    previewData: { array: [5, 12, 18, 23, 31, 39, 45, 60], target: 39, low: 0, mid: 3, high: 7 },
  },

  // =========================================================================
  // LEVEL 06: TARGET NOT FOUND (FIND OR FAIL)
  // =========================================================================
  {
    id: 6,
    levelNumber: 6,
    title: 'FIND OR FAIL',
    shortTitle: 'Find or Fail',
    subtitle: 'Target Not Found',
    tagline: 'Search until low > high, then conclude NOT FOUND.',
    description: 'Search for a value that does not exist and detect failure.',
    detailedObjective: 'Understand the stopping condition: when low > high, the target cannot exist.',
    difficulty: 'Intermediate',
    duration: '3 min',
    xpReward: 150,
    skills: ['Stopping Conditions', 'Empty Search Space', 'Target Not Found'],
    interactionType: 'Search until exhaustion',
    hintAvailability: '3-stage progressive hints',
    iconName: 'predict',
    howToPlay: [
      { stepNumber: 1, title: 'Search Steps', description: 'Follow pointer narrowing for missing target 30.' },
      { stepNumber: 2, title: 'Pointers Cross', description: 'low becomes 4, high becomes 3 (low > high).' },
      { stepNumber: 3, title: 'Conclude', description: 'Click TARGET NOT FOUND.' },
    ],
    previewData: { array: [5, 12, 18, 23, 31, 45, 60], target: 30, low: 0, mid: 3, high: 6 },
  },

  // =========================================================================
  // LEVEL 07: DEBUG BINARY SEARCH (FIX THE SEARCH)
  // =========================================================================
  {
    id: 7,
    levelNumber: 7,
    title: 'FIX THE SEARCH',
    shortTitle: 'Fix the Search',
    subtitle: 'Debug Binary Search',
    tagline: 'Identify and fix incorrect pointer updates.',
    description: 'Identify incorrect boundary updates and debug algorithm.',
    detailedObjective: 'Spot buggy boundary logic: when target > mid, low must be mid + 1, not mid - 1.',
    difficulty: 'Intermediate',
    duration: '3 min',
    xpReward: 160,
    skills: ['Debugging', 'Code Inspection', 'Boundary Invariants'],
    interactionType: 'Bug identification and correction',
    hintAvailability: '3-stage progressive hints',
    iconName: 'debug',
    howToPlay: [
      { stepNumber: 1, title: 'Spot Bug', description: 'Target 50 > mid 30, but algorithm set LOW = MID - 1.' },
      { stepNumber: 2, title: 'Analyze', description: 'Setting low = mid - 1 moves in the wrong direction.' },
      { stepNumber: 3, title: 'Fix', description: 'Correct update is LOW = MID + 1 (Search Right).' },
    ],
    previewData: { array: [10, 20, 30, 40, 50, 60, 70], target: 50, low: 0, mid: 2, high: 6 },
  },

  // =========================================================================
  // LEVEL 08: FIRST OCCURRENCE (FIND THE FIRST)
  // =========================================================================
  {
    id: 8,
    levelNumber: 8,
    title: 'FIND THE FIRST',
    shortTitle: 'Find the First',
    subtitle: 'First Occurrence in Duplicates',
    tagline: 'Found match? Check if another duplicate exists on the left!',
    description: 'Search left after matching target to locate the first occurrence.',
    detailedObjective: 'Master the lower-bound variation where duplicate elements exist.',
    difficulty: 'Advanced',
    duration: '3 min',
    xpReward: 180,
    skills: ['Duplicate Handling', 'First Occurrence', 'Lower Bound'],
    interactionType: 'Duplicate-aware boundary narrowing',
    hintAvailability: '3-stage progressive hints',
    iconName: 'target',
    howToPlay: [
      { stepNumber: 1, title: 'Match Found', description: 'arr[2] == 4 matches target 4.' },
      { stepNumber: 2, title: 'Check Left', description: 'arr[1] is also 4! Continue searching left.' },
      { stepNumber: 3, title: 'First Confirmed', description: 'Confirm index 1 is the first occurrence.' },
    ],
    previewData: { array: [2, 4, 4, 4, 7, 9], target: 4, low: 0, mid: 2, high: 5 },
  },

  // =========================================================================
  // LEVEL 09: LAST OCCURRENCE (FIND THE LAST)
  // =========================================================================
  {
    id: 9,
    levelNumber: 9,
    title: 'FIND THE LAST',
    shortTitle: 'Find the Last',
    subtitle: 'Last Occurrence in Duplicates',
    tagline: 'Found match? Check if another duplicate exists on the right!',
    description: 'Search right after matching target to locate the final occurrence.',
    detailedObjective: 'Master the upper-bound variation where duplicate elements exist.',
    difficulty: 'Advanced',
    duration: '3 min',
    xpReward: 180,
    skills: ['Duplicate Handling', 'Last Occurrence', 'Upper Bound'],
    interactionType: 'Duplicate-aware boundary narrowing',
    hintAvailability: '3-stage progressive hints',
    iconName: 'target',
    howToPlay: [
      { stepNumber: 1, title: 'Match Found', description: 'arr[2] == 4 matches target 4.' },
      { stepNumber: 2, title: 'Check Right', description: 'arr[3] is also 4! Continue searching right.' },
      { stepNumber: 3, title: 'Last Confirmed', description: 'Confirm index 3 is the final occurrence.' },
    ],
    previewData: { array: [2, 4, 4, 4, 7, 9], target: 4, low: 0, mid: 2, high: 5 },
  },

  // =========================================================================
  // LEVEL 10: FINAL BINARY SEARCH CHALLENGE (BINARY SEARCH MASTER)
  // =========================================================================
  {
    id: 10,
    levelNumber: 10,
    title: 'BINARY SEARCH MASTER',
    shortTitle: 'Binary Search Master',
    subtitle: 'Final Challenge',
    tagline: 'Demonstrate complete Binary Search mastery independently.',
    description: 'Solve a larger sorted array problem without automatic guidance.',
    detailedObjective: 'Combine low/mid/high, mid calculation, range reduction, and target convergence.',
    difficulty: 'Expert',
    duration: '4 min',
    xpReward: 250,
    skills: ['Complete Mastery', 'Large Datasets', 'O(log n) Precision', 'Independent Problem Solving'],
    interactionType: 'Comprehensive independent challenge',
    hintAvailability: '3-stage progressive hints',
    iconName: 'target',
    howToPlay: [
      { stepNumber: 1, title: '12 Elements', description: 'Array has 12 items (indices 0..11), target = 51.' },
      { stepNumber: 2, title: 'Full Trace', description: 'Independently narrow the range step by step.' },
      { stepNumber: 3, title: 'Find Target', description: 'Arrive at index 7 and declare Target Found.' },
    ],
    previewData: { array: [3, 8, 14, 19, 27, 34, 42, 51, 63, 71, 85, 96], target: 51, low: 0, mid: 5, high: 11 },
  },
];
