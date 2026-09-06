export interface BinarySearchChallenge {
  id: string;
  challengeNumber: number;
  totalChallengesInLevel: number;
  question: string;
  instruction: string;
  array: number[];
  target: number;
  targetExists: boolean;
  targetIndex?: number;
  mode?: 'standard' | 'first-occurrence' | 'last-occurrence' | 'missing' | 'speed' | 'boss';
  targetAction?: 'LEFT' | 'RIGHT' | 'FOUND' | 'NOT_FOUND';
  hints: string[]; // Progressive clues [1: Concept, 2: Direction, 3: Calculation & Exact Action]
  guide: {
    ruleTitle: string;
    ruleDescription: string;
    example: string;
  };
  feedback: {
    correctTitle: string;
    correctActionText: string;
    reason: string;
    incorrectTip: string;
  };
  xpReward: number;
}

export interface BinarySearchLevelConfig {
  id: number;
  levelNumber: number;
  title: string;
  subtitle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
  xpReward: number;
  stars: number;
  hints: string[];
  challenges: BinarySearchChallenge[];
}

export const GAME_LEVELS: BinarySearchLevelConfig[] = [
  // =========================================================================
  // LEVEL 01: FIND THE MIDDLE (Binary Search Basics)
  // =========================================================================
  {
    id: 1,
    levelNumber: 1,
    title: 'Level 01: Find the Middle',
    subtitle: 'Binary Search Basics',
    difficulty: 'Beginner',
    description: 'Identify the middle element in a sorted array and understand where Binary Search begins.',
    xpReward: 100,
    stars: 3,
    hints: [
      'In a 0-indexed array with range [low .. high], midpoint is mid = Math.floor((low + high) / 2).',
      'With low = 0 and high = 6, mid = Math.floor(6 / 2) = 3.',
      'Check arr[3]: it is 23, matching our target! Click "TARGET FOUND".',
    ],
    challenges: [
      {
        id: 'l1-c1',
        challengeNumber: 1,
        totalChallengesInLevel: 2,
        question: 'INSPECT MIDPOINT [ 23 ]',
        instruction: 'Array has 7 elements: [5, 12, 18, 23, 31, 39, 45]. Calculate mid = Math.floor((0 + 6) / 2). Inspect arr[mid] and take action!',
        array: [5, 12, 18, 23, 31, 39, 45],
        target: 23,
        targetExists: true,
        targetIndex: 3,
        mode: 'standard',
        hints: [
          'Binary search always starts at the middle: mid = Math.floor((low + high) / 2).',
          'low=0, high=6: mid = Math.floor(6 / 2) = 3. The element at index 3 is 23.',
          'arr[3] matches target 23! Click "TARGET FOUND".',
        ],
        guide: {
          ruleTitle: 'Midpoint Calculation',
          ruleDescription: 'Binary Search always starts at the center element using integer division.',
          example: 'low=0, high=6 → mid = Math.floor((0+6)/2) = 3.',
        },
        feedback: {
          correctTitle: 'Bullseye! Direct Midpoint Match!',
          correctActionText: 'Target 23 located at index [3] on the very first comparison!',
          reason: 'When arr[mid] === target, lookup completes in O(1) best-case time.',
          incorrectTip: 'Inspect the middle element arr[mid] and compare it to 23.',
        },
        xpReward: 50,
      },
      {
        id: 'l1-c2',
        challengeNumber: 2,
        totalChallengesInLevel: 2,
        question: 'INSPECT MIDPOINT [ 30 ]',
        instruction: 'Array: [10, 20, 30, 40, 50]. low=0, high=4. What is mid, and does arr[mid] match target 30?',
        array: [10, 20, 30, 40, 50],
        target: 30,
        targetExists: true,
        targetIndex: 2,
        mode: 'standard',
        hints: [
          'mid = Math.floor((0 + 4) / 2) = 2.',
          'Check the value at index 2: arr[2] is 30.',
          'Target 30 matches arr[2]! Click "TARGET FOUND".',
        ],
        guide: {
          ruleTitle: 'Center Element',
          ruleDescription: 'In an odd-length array, mid lands exactly on the center index.',
          example: '5 elements (0..4) → center is index 2.',
        },
        feedback: {
          correctTitle: 'Target Located!',
          correctActionText: 'Target 30 matched at center index [2].',
          reason: 'arr[2] === 30 satisfies the search condition.',
          incorrectTip: 'Calculate mid = Math.floor((0 + 4) / 2) = 2.',
        },
        xpReward: 50,
      },
    ],
  },

  // =========================================================================
  // LEVEL 02: CHOOSE THE HALF (Left or Right Decision)
  // =========================================================================
  {
    id: 2,
    levelNumber: 2,
    title: 'Level 02: Choose the Half',
    subtitle: 'Left or Right Decision',
    difficulty: 'Beginner',
    description: 'Compare TARGET with MID and decide whether to search the left or right half.',
    xpReward: 100,
    stars: 3,
    hints: [
      'If target > arr[mid], the target must be in the right half.',
      'If target < arr[mid], the target must be in the left half.',
      'Compare the values and click the correct directional half.',
    ],
    challenges: [
      {
        id: 'l2-c1',
        challengeNumber: 1,
        totalChallengesInLevel: 2,
        question: 'WHICH HALF? TARGET [ 39 ]',
        instruction: 'Array: [5, 12, 18, 23, 31, 39, 45]. mid = 3 (val = 23). Target is 39. Which half contains 39?',
        array: [5, 12, 18, 23, 31, 39, 45],
        target: 39,
        targetExists: true,
        targetIndex: 5,
        targetAction: 'RIGHT',
        hints: [
          'mid = 3, value is arr[3] = 23.',
          'Compare target 39 with 23: 39 > 23.',
          'Because the array is sorted, 39 must be in the RIGHT HALF. Click "SEARCH RIGHT HALF".',
        ],
        guide: {
          ruleTitle: 'Direction Rule: target > mid',
          ruleDescription: 'When target > arr[mid], all elements at or below mid are too small. Search the right half.',
          example: '39 > 23 → Search Right.',
        },
        feedback: {
          correctTitle: 'Correct Decision: Right Half!',
          correctActionText: 'Target 39 > 23, so the search moves to the right half.',
          reason: 'All elements <= 23 are discarded in a single step.',
          incorrectTip: '39 is larger than 23, so look to the right.',
        },
        xpReward: 50,
      },
      {
        id: 'l2-c2',
        challengeNumber: 2,
        totalChallengesInLevel: 2,
        question: 'WHICH HALF? TARGET [ 12 ]',
        instruction: 'Array: [10, 12, 25, 40, 55, 70, 85]. mid = 3 (val = 40). Target is 12. Which half contains 12?',
        array: [10, 12, 25, 40, 55, 70, 85],
        target: 12,
        targetExists: true,
        targetIndex: 1,
        targetAction: 'LEFT',
        hints: [
          'mid = 3, value is arr[3] = 40.',
          'Compare target 12 with 40: 12 < 40.',
          'Because 12 < 40, search the LEFT HALF. Click "SEARCH LEFT HALF".',
        ],
        guide: {
          ruleTitle: 'Direction Rule: target < mid',
          ruleDescription: 'When target < arr[mid], all elements at or above mid are too large. Search the left half.',
          example: '12 < 40 → Search Left.',
        },
        feedback: {
          correctTitle: 'Correct Decision: Left Half!',
          correctActionText: 'Target 12 < 40, so the search moves to the left half.',
          reason: 'All elements >= 40 are discarded in a single step.',
          incorrectTip: '12 is smaller than 40, so look to the left.',
        },
        xpReward: 50,
      },
    ],
  },

  // =========================================================================
  // LEVEL 03: MOVE THE BOUNDARIES (Boundary Pointer Updates)
  // =========================================================================
  {
    id: 3,
    levelNumber: 3,
    title: 'Level 03: Move the Boundaries',
    subtitle: 'Boundary Pointer Updates',
    difficulty: 'Beginner',
    description: 'Update LOW or HIGH pointer to eliminate half the search range.',
    xpReward: 120,
    stars: 3,
    hints: [
      'To search the left half, move the upper boundary: high = mid - 1.',
      'To search the right half, move the lower boundary: low = mid + 1.',
      'The element at mid is already inspected, so never include mid in the next range.',
    ],
    challenges: [
      {
        id: 'l3-c1',
        challengeNumber: 1,
        totalChallengesInLevel: 2,
        question: 'UPDATE BOUNDARY: TARGET [ 18 ]',
        instruction: 'Array: [5, 12, 18, 23, 31, 39, 45]. mid = 3 (23). Target 18 < 23. Update the boundary to eliminate the right half!',
        array: [5, 12, 18, 23, 31, 39, 45],
        target: 18,
        targetExists: true,
        targetIndex: 2,
        targetAction: 'LEFT',
        hints: [
          'Target 18 < arr[3] (23). The target lies to the left of mid.',
          'To discard index 3 and everything above it, set high = mid - 1.',
          'Select "SEARCH LEFT HALF" to shift high to index 2.',
        ],
        guide: {
          ruleTitle: 'Pointer Rule: high = mid - 1',
          ruleDescription: 'When moving left, high = mid - 1 contracts the upper boundary and preserves low.',
          example: 'mid=3 → high becomes 2.',
        },
        feedback: {
          correctTitle: 'Boundary Updated: high = mid - 1',
          correctActionText: 'High pointer shifted to [2]. Search range narrowed to [0 .. 2].',
          reason: 'Indices 3 through 6 are eliminated.',
          incorrectTip: 'Target 18 < 23, so high must move to mid - 1.',
        },
        xpReward: 60,
      },
      {
        id: 'l3-c2',
        challengeNumber: 2,
        totalChallengesInLevel: 2,
        question: 'UPDATE BOUNDARY: TARGET [ 46 ]',
        instruction: 'Array: [4, 9, 15, 28, 37, 46, 58]. mid = 3 (28). Target 46 > 28. Update the boundary to eliminate the left half!',
        array: [4, 9, 15, 28, 37, 46, 58],
        target: 46,
        targetExists: true,
        targetIndex: 5,
        targetAction: 'RIGHT',
        hints: [
          'Target 46 > arr[3] (28). The target lies to the right of mid.',
          'To discard index 3 and everything below it, set low = mid + 1.',
          'Select "SEARCH RIGHT HALF" to shift low to index 4.',
        ],
        guide: {
          ruleTitle: 'Pointer Rule: low = mid + 1',
          ruleDescription: 'When moving right, low = mid + 1 contracts the lower boundary and preserves high.',
          example: 'mid=3 → low becomes 4.',
        },
        feedback: {
          correctTitle: 'Boundary Updated: low = mid + 1',
          correctActionText: 'Low pointer shifted to [4]. Search range narrowed to [4 .. 6].',
          reason: 'Indices 0 through 3 are eliminated.',
          incorrectTip: 'Target 46 > 28, so low must move to mid + 1.',
        },
        xpReward: 60,
      },
    ],
  },

  // =========================================================================
  // LEVEL 04: MIDPOINT MASTER (Calculate Midpoint Formulas)
  // =========================================================================
  {
    id: 4,
    levelNumber: 4,
    title: 'Level 04: Midpoint Master',
    subtitle: 'Calculate Midpoint Formulas',
    difficulty: 'Beginner',
    description: 'Master both midpoint formulas: mid = (low + high) / 2 and mid = low + (high - low) / 2.',
    xpReward: 120,
    stars: 3,
    hints: [
      'Formula 1: mid = Math.floor((low + high) / 2).',
      'Formula 2 (Overflow-safe): mid = low + Math.floor((high - low) / 2).',
      'Both formulas yield the exact same integer index.',
    ],
    challenges: [
      {
        id: 'l4-c1',
        challengeNumber: 1,
        totalChallengesInLevel: 2,
        question: 'FORMULA PRACTICE: TARGET [ 29 ]',
        instruction: 'Array: [3, 7, 11, 16, 22, 29, 36, 44, 53, 63] (10 items). Apply midpoint formulas step by step to reach 29!',
        array: [3, 7, 11, 16, 22, 29, 36, 44, 53, 63],
        target: 29,
        targetExists: true,
        targetIndex: 5,
        mode: 'standard',
        hints: [
          'Step 1: low=0, high=9. mid = Math.floor((0 + 9) / 2) = 4 (value 22). 29 > 22 → Search RIGHT.',
          'Step 2: low=5, high=9. mid = Math.floor((5 + 9) / 2) = 7 (value 44). 29 < 44 → Search LEFT.',
          'Step 3: low=5, high=6. mid = Math.floor((5 + 6) / 2) = 5 (value 29). Match found! Click "TARGET FOUND".',
        ],
        guide: {
          ruleTitle: 'Standard vs Overflow-Safe Midpoint',
          ruleDescription: 'Standard: mid = Math.floor((low + high) / 2). Overflow-safe: mid = low + Math.floor((high - low) / 2). Both yield identical results without 32-bit integer overflow!',
          example: 'low=5, high=9: 5 + Math.floor((9-5)/2) = 7.',
        },
        feedback: {
          correctTitle: 'Midpoint Mastery Proven!',
          correctActionText: 'Target 29 pinpointed at index [5] using exact midpoint math.',
          reason: 'Consistent integer division guided each boundary shift.',
          incorrectTip: 'Check mid = Math.floor((low + high) / 2).',
        },
        xpReward: 60,
      },
      {
        id: 'l4-c2',
        challengeNumber: 2,
        totalChallengesInLevel: 2,
        question: 'EVEN-LENGTH ARRAY: TARGET [ 48 ]',
        instruction: 'Array: [2, 6, 14, 20, 35, 48, 62, 75] (8 elements). With even length, Math.floor selects the lower middle index.',
        array: [2, 6, 14, 20, 35, 48, 62, 75],
        target: 48,
        targetExists: true,
        targetIndex: 5,
        mode: 'standard',
        hints: [
          'low=0, high=7. mid = Math.floor(7 / 2) = 3 (val = 20). 48 > 20 → Search RIGHT (low = 4).',
          'low=4, high=7. mid = 4 + Math.floor((7 - 4) / 2) = 5 (val = 48). Matches target! Click "TARGET FOUND".',
          'arr[5] is 48! Click "TARGET FOUND".',
        ],
        guide: {
          ruleTitle: 'Floor of Even Sizes',
          ruleDescription: 'For length 8 (0..7), 7/2 = 3.5 -> floor is 3.',
          example: 'mid = Math.floor(7 / 2) = 3.',
        },
        feedback: {
          correctTitle: 'Even-Length Handled Perfectly!',
          correctActionText: 'Target 48 found at index [5].',
          reason: 'Integer division rounds down predictably.',
          incorrectTip: 'Calculate mid = Math.floor((low + high) / 2).',
        },
        xpReward: 60,
      },
    ],
  },

  // =========================================================================
  // LEVEL 05: SEARCH TO THE TARGET (Complete Algorithm Execution)
  // =========================================================================
  {
    id: 5,
    levelNumber: 5,
    title: 'Level 05: Search to the Target',
    subtitle: 'Complete Algorithm Execution',
    difficulty: 'Intermediate',
    description: 'Perform the complete Binary Search loop: Calculate Mid -> Compare -> Halve Range -> Repeat until Found.',
    xpReward: 150,
    stars: 3,
    hints: [
      'Repeat the 3 core steps: 1. Calculate mid, 2. Compare target with arr[mid], 3. Update pointer.',
      'Notice how the search range halves with every single decision.',
      'Click TARGET FOUND as soon as arr[mid] matches the target.',
    ],
    challenges: [
      {
        id: 'l5-c1',
        challengeNumber: 1,
        totalChallengesInLevel: 2,
        question: 'TRACE TO TARGET [ 39 ]',
        instruction: 'Array: [5, 12, 18, 23, 31, 39, 45, 60]. Execute the search loop until 39 is found.',
        array: [5, 12, 18, 23, 31, 39, 45, 60],
        target: 39,
        targetExists: true,
        targetIndex: 5,
        mode: 'standard',
        hints: [
          'Step 1: low=0, high=7. mid = 3 (23). 39 > 23 → Search RIGHT (low = 4).',
          'Step 2: low=4, high=7. mid = Math.floor((4 + 7) / 2) = 5 (39). Target found!',
          'arr[5] is 39! Click "TARGET FOUND".',
        ],
        guide: {
          ruleTitle: 'Full Loop Invariant',
          ruleDescription: 'At each iteration, active range [low .. high] halves, guaranteeing O(log N) convergence.',
          example: '8 elements → 4 elements → 2 elements → Found!',
        },
        feedback: {
          correctTitle: 'Target Located!',
          correctActionText: 'Target 39 found at index [5] in 2 iterations.',
          reason: 'Halved search space from 8 to 4, then hit the target.',
          incorrectTip: 'Compare 39 with mid at each step.',
        },
        xpReward: 75,
      },
      {
        id: 'l5-c2',
        challengeNumber: 2,
        totalChallengesInLevel: 2,
        question: 'TRACE TO TARGET [ 24 ]',
        instruction: 'Array: [8, 15, 24, 33, 42, 55, 68, 77, 89]. Navigate left and right until reaching 24.',
        array: [8, 15, 24, 33, 42, 55, 68, 77, 89],
        target: 24,
        targetExists: true,
        targetIndex: 2,
        mode: 'standard',
        hints: [
          'mid = 4 (42). 24 < 42 → Search LEFT (high = 3).',
          'low=0, high=3. mid = 1 (15). 24 > 15 → Search RIGHT (low = 2).',
          'low=2, high=3. mid = 2 (24). Matches 24! Click "TARGET FOUND".',
        ],
        guide: {
          ruleTitle: 'Oscillating Boundaries',
          ruleDescription: 'Binary search gracefully toggles between left and right shifts until pinpointing target.',
          example: 'Go Left → Go Right → Match Found.',
        },
        feedback: {
          correctTitle: 'Full Search Complete!',
          correctActionText: 'Target 24 found at index [2].',
          reason: 'Navigated left then right to narrow window onto target.',
          incorrectTip: '24 < 42 -> go left; 24 > 15 -> go right.',
        },
        xpReward: 75,
      },
    ],
  },

  // =========================================================================
  // LEVEL 06: FIND OR FAIL (Target Not Found)
  // =========================================================================
  {
    id: 6,
    levelNumber: 6,
    title: 'Level 06: Find or Fail',
    subtitle: 'Target Not Found',
    difficulty: 'Intermediate',
    description: 'Search for a missing value until pointers cross (low > high) and confirm TARGET NOT FOUND.',
    xpReward: 150,
    stars: 3,
    hints: [
      'If the target does not exist, pointers will eventually cross (low becomes greater than high).',
      'When low > high, the search range is empty.',
      'Click TARGET NOT FOUND once pointers cross.',
    ],
    challenges: [
      {
        id: 'l6-c1',
        challengeNumber: 1,
        totalChallengesInLevel: 2,
        question: 'GHOST ELEMENT [ 30 ]',
        instruction: 'Array: [5, 12, 18, 23, 31, 45, 60]. Target 30 is not in the array. Narrow the range until low > high!',
        array: [5, 12, 18, 23, 31, 45, 60],
        target: 30,
        targetExists: false,
        mode: 'missing',
        hints: [
          'mid = 3 (23). 30 > 23 → Search RIGHT (low = 4).',
          'mid = 5 (45). 30 < 45 → Search LEFT (high = 4).',
          'mid = 4 (31). 30 < 31 → Search LEFT (high = 3).',
          'Now low (4) > high (3)! Pointers crossed. Click "TARGET NOT FOUND".',
        ],
        guide: {
          ruleTitle: 'Termination Condition: low > high',
          ruleDescription: 'When low crosses high, the remaining interval is empty. The target is definitively absent.',
          example: 'low=4, high=3 → Empty interval → return -1.',
        },
        feedback: {
          correctTitle: 'Absence Verified!',
          correctActionText: 'Correctly proved 30 does not exist in array (returns -1).',
          reason: 'Pointers crossed cleanly at boundary [4, 3].',
          incorrectTip: 'Continue narrowing until low > high, then choose TARGET NOT FOUND.',
        },
        xpReward: 75,
      },
      {
        id: 'l6-c2',
        challengeNumber: 2,
        totalChallengesInLevel: 2,
        question: 'MISSING ELEMENT [ 65 ]',
        instruction: 'Array: [10, 20, 30, 40, 50, 60, 70, 80]. Target 65 falls between 60 and 70. Follow the pointers to exhaustion!',
        array: [10, 20, 30, 40, 50, 60, 70, 80],
        target: 65,
        targetExists: false,
        mode: 'missing',
        hints: [
          'mid = 3 (40). 65 > 40 → Search RIGHT (low = 4).',
          'low=4, high=7. mid = 5 (60). 65 > 60 → Search RIGHT (low = 6).',
          'low=6, high=7. mid = 6 (70). 65 < 70 → Search LEFT (high = 5).',
          'low (6) > high (5)! Click "TARGET NOT FOUND".',
        ],
        guide: {
          ruleTitle: 'Insertion Point Discovery',
          ruleDescription: 'When low > high on a missing value, low represents the index where target would be inserted to maintain sorted order.',
          example: 'Target 65 belongs at index 6.',
        },
        feedback: {
          correctTitle: 'Target Absence Confirmed!',
          correctActionText: 'Search window exhausted (low=6, high=5). Target 65 not found.',
          reason: 'Proven nonexistent in O(log N) comparisons.',
          incorrectTip: 'Continue until low > high.',
        },
        xpReward: 75,
      },
    ],
  },

  // =========================================================================
  // LEVEL 07: FIX THE SEARCH (Debug Binary Search)
  // =========================================================================
  {
    id: 7,
    levelNumber: 7,
    title: 'Level 07: Fix the Search',
    subtitle: 'Debug Binary Search',
    difficulty: 'Intermediate',
    description: 'Identify buggy boundary logic and choose the correct algorithmic pointer update.',
    xpReward: 160,
    stars: 3,
    hints: [
      'Examine what a buggy code did versus what the algorithm requires.',
      'When target > mid, we must search RIGHT by setting low = mid + 1.',
      'When target < mid, we must search LEFT by setting high = mid - 1.',
    ],
    challenges: [
      {
        id: 'l7-c1',
        challengeNumber: 1,
        totalChallengesInLevel: 2,
        question: 'DEBUG BOUNDARY: TARGET [ 50 ]',
        instruction: 'Array: [10, 20, 30, 40, 50, 60, 70]. mid = 2 (30). Buggy code ran: low = mid - 1. What is the correct update?',
        array: [10, 20, 30, 40, 50, 60, 70],
        target: 50,
        targetExists: true,
        targetIndex: 4,
        targetAction: 'RIGHT',
        hints: [
          'Compare target 50 with arr[2] (30): 50 > 30.',
          'To search the right half, we must advance the low pointer forward past mid.',
          'Correct update: low = mid + 1. Click "SEARCH RIGHT HALF".',
        ],
        guide: {
          ruleTitle: 'Boundary Invariant Bug',
          ruleDescription: 'Setting low = mid - 1 moves backwards and causes infinite loops. The correct update is low = mid + 1.',
          example: 'target > mid → low = mid + 1.',
        },
        feedback: {
          correctTitle: 'Bug Fixed: low = mid + 1',
          correctActionText: 'Correctly chose SEARCH RIGHT HALF (low = mid + 1).',
          reason: 'Moving low to mid + 1 ensures the search window advances and avoids infinite loops.',
          incorrectTip: 'Target 50 > 30, so search right half.',
        },
        xpReward: 80,
      },
      {
        id: 'l7-c2',
        challengeNumber: 2,
        totalChallengesInLevel: 2,
        question: 'DEBUG BOUNDARY: TARGET [ 24 ]',
        instruction: 'Array: [12, 24, 36, 48, 60, 72, 84]. mid = 3 (48). Buggy code ran: low = mid + 1. What is the correct update?',
        array: [12, 24, 36, 48, 60, 72, 84],
        target: 24,
        targetExists: true,
        targetIndex: 1,
        targetAction: 'LEFT',
        hints: [
          'Target 24 < arr[3] (48). The target lies on the left.',
          'The buggy code searched right! The correct move is to adjust high to mid - 1.',
          'Click "SEARCH LEFT HALF" to fix the search.',
        ],
        guide: {
          ruleTitle: 'Direction Guard Bug',
          ruleDescription: 'When target < mid, searching right eliminates the actual target! Always set high = mid - 1.',
          example: '24 < 48 → high = mid - 1.',
        },
        feedback: {
          correctTitle: 'Bug Fixed: high = mid - 1',
          correctActionText: 'Correctly chose SEARCH LEFT HALF (high = mid - 1).',
          reason: 'Preserves the valid search range containing 24.',
          incorrectTip: 'Target 24 < 48, so search left half.',
        },
        xpReward: 80,
      },
    ],
  },

  // =========================================================================
  // LEVEL 08: FIND THE FIRST (First Occurrence in Duplicates)
  // =========================================================================
  {
    id: 8,
    levelNumber: 8,
    title: 'Level 08: Find the First',
    subtitle: 'First Occurrence in Duplicates',
    difficulty: 'Advanced',
    description: 'Search left after matching target to locate the first occurrence (lower bound).',
    xpReward: 180,
    stars: 3,
    hints: [
      'When an element matches the target, check if the element directly to its left is also equal to the target.',
      'If arr[mid - 1] === target, continue searching left!',
      'Only select TARGET FOUND when you are at the very first occurrence.',
    ],
    challenges: [
      {
        id: 'l8-c1',
        challengeNumber: 1,
        totalChallengesInLevel: 2,
        question: 'LOWER BOUND: TARGET [ 4 ]',
        instruction: 'Array: [2, 4, 4, 4, 7, 9]. Target 4 appears multiple times. Locate the FIRST occurrence!',
        array: [2, 4, 4, 4, 7, 9],
        target: 4,
        targetExists: true,
        targetIndex: 1,
        mode: 'first-occurrence',
        hints: [
          'mid = 2 (value 4). Match! But index 1 is also 4, so you cannot stop here.',
          'Search left to find an earlier occurrence: Click "SEARCH LEFT HALF".',
          'low=0, high=1. mid = 0 (2). 4 > 2 → Search RIGHT. Now mid = 1 (4). No duplicate on left! Click "TARGET FOUND".',
        ],
        guide: {
          ruleTitle: 'First Occurrence Pattern',
          ruleDescription: 'When arr[mid] === target in duplicate arrays, record mid as candidate and continue searching left (high = mid - 1).',
          example: '[2, 4, 4, 4, 7, 9] → first 4 is at index 1.',
        },
        feedback: {
          correctTitle: 'First Occurrence Confirmed!',
          correctActionText: 'Target 4 first occurrence located at index [1]!',
          reason: 'Successfully verified that index 0 is 2, confirming index 1 is the start of the duplicate block.',
          incorrectTip: 'If arr[mid - 1] === target, keep searching left!',
        },
        xpReward: 90,
      },
      {
        id: 'l8-c2',
        challengeNumber: 2,
        totalChallengesInLevel: 2,
        question: 'LOWER BOUND: TARGET [ 30 ]',
        instruction: 'Array: [10, 20, 30, 30, 30, 40, 50]. Find the FIRST occurrence of 30.',
        array: [10, 20, 30, 30, 30, 40, 50],
        target: 30,
        targetExists: true,
        targetIndex: 2,
        mode: 'first-occurrence',
        hints: [
          'mid = 3 (30). Matches, but arr[2] is also 30! Search LEFT (high = 2).',
          'low=0, high=2. mid = 1 (20). 30 > 20 → Search RIGHT (low = 2).',
          'Now low=2, high=2. mid = 2 (30). arr[1] is 20! Index 2 is the FIRST occurrence. Click "TARGET FOUND".',
        ],
        guide: {
          ruleTitle: 'Lower Bound Invariant',
          ruleDescription: 'The first occurrence is the smallest index i where arr[i] === target.',
          example: 'Index 2 is the first 30.',
        },
        feedback: {
          correctTitle: 'First Occurrence Found!',
          correctActionText: 'First occurrence of 30 locked at index [2].',
          reason: 'arr[1] is 20, which is strictly less than 30.',
          incorrectTip: 'Search left until arr[mid-1] < target.',
        },
        xpReward: 90,
      },
    ],
  },

  // =========================================================================
  // LEVEL 09: FIND THE LAST (Last Occurrence in Duplicates)
  // =========================================================================
  {
    id: 9,
    levelNumber: 9,
    title: 'Level 09: Find the Last',
    subtitle: 'Last Occurrence in Duplicates',
    difficulty: 'Advanced',
    description: 'Search right after matching target to locate the final occurrence (upper bound).',
    xpReward: 180,
    stars: 3,
    hints: [
      'When an element matches the target, check if the element directly to its right is also equal to the target.',
      'If arr[mid + 1] === target, continue searching right!',
      'Only select TARGET FOUND when you are at the very last occurrence.',
    ],
    challenges: [
      {
        id: 'l9-c1',
        challengeNumber: 1,
        totalChallengesInLevel: 2,
        question: 'UPPER BOUND: TARGET [ 4 ]',
        instruction: 'Array: [2, 4, 4, 4, 7, 9]. Target 4 has duplicates. Locate the LAST occurrence!',
        array: [2, 4, 4, 4, 7, 9],
        target: 4,
        targetExists: true,
        targetIndex: 3,
        mode: 'last-occurrence',
        hints: [
          'mid = 2 (4). Matches, but arr[3] is also 4! Continue searching right.',
          'Click "SEARCH RIGHT HALF" (low = 3).',
          'low=3, high=5. mid = 4 (7). 4 < 7 → Search LEFT (high = 3). Now mid = 3 (4). arr[4] is 7, so index 3 is LAST! Click "TARGET FOUND".',
        ],
        guide: {
          ruleTitle: 'Last Occurrence Pattern',
          ruleDescription: 'When arr[mid] === target, record mid as candidate and continue searching right (low = mid + 1).',
          example: '[2, 4, 4, 4, 7, 9] → last 4 is at index 3.',
        },
        feedback: {
          correctTitle: 'Last Occurrence Confirmed!',
          correctActionText: 'Target 4 last occurrence located at index [3]!',
          reason: 'arr[4] is 7, confirming index 3 terminates the duplicate run.',
          incorrectTip: 'If arr[mid + 1] === target, keep searching right!',
        },
        xpReward: 90,
      },
      {
        id: 'l9-c2',
        challengeNumber: 2,
        totalChallengesInLevel: 2,
        question: 'UPPER BOUND: TARGET [ 25 ]',
        instruction: 'Array: [5, 15, 25, 25, 25, 25, 35, 45]. Find the LAST occurrence of 25.',
        array: [5, 15, 25, 25, 25, 25, 35, 45],
        target: 25,
        targetExists: true,
        targetIndex: 5,
        mode: 'last-occurrence',
        hints: [
          'mid = 3 (25). Matches! But arr[4] and arr[5] are also 25! Search RIGHT.',
          'Continue right until you find the duplicate boundary where arr[idx + 1] > 25.',
          'Index 5 is the final 25 (arr[6] is 35). Click "TARGET FOUND".',
        ],
        guide: {
          ruleTitle: 'Upper Bound Invariant',
          ruleDescription: 'The last occurrence is the largest index i where arr[i] === target.',
          example: 'Index 5 is the last 25.',
        },
        feedback: {
          correctTitle: 'Last Occurrence Found!',
          correctActionText: 'Last occurrence of 25 locked at index [5].',
          reason: 'arr[6] is 35, which is strictly greater than 25.',
          incorrectTip: 'Search right until arr[mid+1] > target.',
        },
        xpReward: 90,
      },
    ],
  },

  // =========================================================================
  // LEVEL 10: BINARY SEARCH MASTER (Final Challenge)
  // =========================================================================
  {
    id: 10,
    levelNumber: 10,
    title: 'Level 10: Binary Search Master',
    subtitle: 'Final Challenge',
    difficulty: 'Expert',
    description: 'Demonstrate complete Binary Search mastery on a 12-element sorted array without automatic guidance.',
    xpReward: 250,
    stars: 3,
    hints: [
      'In a 12-element array (indices 0..11), binary search needs at most 4 comparisons.',
      'Carefully compute mid at each step and choose the correct half.',
      'Converge onto the target and click TARGET FOUND.',
    ],
    challenges: [
      {
        id: 'l10-c1',
        challengeNumber: 1,
        totalChallengesInLevel: 2,
        question: 'MASTER CHALLENGE 1: TARGET [ 51 ]',
        instruction: 'Array: [3, 8, 14, 19, 27, 34, 42, 51, 63, 71, 85, 96] (12 elements). Target is 51. Solve independently!',
        array: [3, 8, 14, 19, 27, 34, 42, 51, 63, 71, 85, 96],
        target: 51,
        targetExists: true,
        targetIndex: 7,
        mode: 'boss',
        hints: [
          'mid = 5 (34). 51 > 34 → Search RIGHT (low = 6).',
          'low=6, high=11. mid = 8 (63). 51 < 63 → Search LEFT (high = 7).',
          'low=6, high=7. mid = 6 (42). 51 > 42 → Search RIGHT (low = 7).',
          'low=7, high=7. mid = 7 (51). Target matched! Click "TARGET FOUND".',
        ],
        guide: {
          ruleTitle: 'Mastery in Action',
          ruleDescription: 'In 12 elements, binary search finds the target in at most 4 comparisons (ceil(log2(12)) = 4).',
          example: '34 (right) → 63 (left) → 42 (right) → 51 (found!).',
        },
        feedback: {
          correctTitle: '🏆 Master Challenge 1 Conquered!',
          correctActionText: 'Target 51 pinpointed at index [7] in 4 flawless steps!',
          reason: 'Exemplary logarithmic convergence on a 12-element array.',
          incorrectTip: 'Compute mid = Math.floor((low + high) / 2) at each step.',
        },
        xpReward: 125,
      },
      {
        id: 'l10-c2',
        challengeNumber: 2,
        totalChallengesInLevel: 2,
        question: 'MASTER CHALLENGE 2: TARGET [ 44 ]',
        instruction: 'Array: [2, 5, 11, 18, 23, 31, 44, 56, 67, 78, 89, 99] (12 elements). Target is 44. Complete your campaign victory!',
        array: [2, 5, 11, 18, 23, 31, 44, 56, 67, 78, 89, 99],
        target: 44,
        targetExists: true,
        targetIndex: 6,
        mode: 'boss',
        hints: [
          'mid = 5 (31). 44 > 31 → Search RIGHT (low = 6).',
          'low=6, high=11. mid = 8 (67). 44 < 67 → Search LEFT (high = 7).',
          'low=6, high=7. mid = 6 (44). Match found! Click "TARGET FOUND".',
        ],
        guide: {
          ruleTitle: 'Campaign Finale',
          ruleDescription: 'You have mastered array midpoints, pointer movement, duplicates, missing values, and debugging.',
          example: 'Index 6 holds target 44.',
        },
        feedback: {
          correctTitle: '👑 CAMPAIGN COMPLETE! BINARY SEARCH MASTER!',
          correctActionText: 'Target 44 found at index [6]. You have completed all 10 levels!',
          reason: 'You possess full algorithmic mastery of Binary Search.',
          incorrectTip: 'Follow mid calculations diligently.',
        },
        xpReward: 125,
      },
    ],
  },
];
