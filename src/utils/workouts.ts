import {KeyboardAvoidingViewBase} from 'react-native';

type TMuscleGroup =
  | 'shoulders'
  | 'upper arms'
  | 'forearms'
  | 'back'
  | 'chest'
  | 'waist'
  | 'hips'
  | 'thighs'
  | 'calves'
  | 'others';
type TWorkoutGroup = {
  [key: string]: {
    scientificName: string;
    workouts: Array<TWorkout>;
  };
};

type TWorkoutVariation = {
  variant: string;
  equipment?: Array<Array<string>>;
  images?: Array<string>;
  notes?: string;
  video?: string;
  variation?: Array<TWorkoutVariation>;
};

type TWorkout = {
  name: string;
  equipment?: Array<Array<string>>;
  variation: Array<TWorkoutVariation>;
};

// ================== SHOULDERS ==================

const overheadPressPoseVariation: Array<TWorkoutVariation> = [
  // standing
  {
    variant: 'standing',
  },
  // seated
  {
    variant: 'seated',
    equipment: [['adjustable bench', 'upright bench']],
    variation: [
      // recline
      {
        variant: 'recline',
      },
      // upright
      {
        variant: 'upright',
      },
    ],
  },
];

const frontRaisePoseVariation: Array<TWorkoutVariation> = [
  // standing
  {
    variant: 'standing',
  },
  // incline
  {
    variant: 'incline',
    equipment: [['adjustable bench', 'upright bench']],
    variation: [
      // forward
      {
        variant: 'forward',
      },
      // backward
      {
        variant: 'backward',
      },
    ],
  },
];

const rearLateralRaisePoseVariation: Array<TWorkoutVariation> = [
  // standing
  {
    variant: 'standing',
  },
  // seated
  {
    variant: 'seated',
    equipment: [['adjustable bench', 'upright bench', 'flat bench']],
  },
];

export const shoulders: TWorkoutGroup = {
  frontDelt: {
    scientificName: 'anterior deltoid',
    workouts: [
      // overhead/shoulder press
      {
        name: 'overhead/shoulder press',
        variation: [
          // barbell
          {
            variant: 'barbell',
            equipment: [['fixed barbell', 'olympic barbell', 'smith machine']],
            variation: overheadPressPoseVariation,
          },
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: [['fixed dumbbell']],
            variation: [
              // normal
              {
                variant: '',

                variation: overheadPressPoseVariation,
              },
              // parallel grip
              {
                variant: 'parallel grip',

                variation: overheadPressPoseVariation,
              },
            ],
          },
          // cable
          {
            variant: 'cable',
            equipment: [['cable pulley machine', 'cable crossover machine']],
            variation: [
              // bar
              {
                variant: 'bar',
                equipment: [['cable barbell']],
                variation: overheadPressPoseVariation,
              },
              // hand grip
              {
                variant: 'hand grip',
                equipment: [['hand grip']],
                variation: [
                  ...overheadPressPoseVariation,
                  //twisting overhead
                  {
                    variant: 'twisting overhead',
                    equipment: [],
                  },
                ],
              },
            ],
          },
          // machine
          {
            variant: 'machine',
            equipment: [['shoulder press machine', 'hammer strength machine']],
            variation: [
              // normal
              {
                variant: '',

                variation: overheadPressPoseVariation,
              },
              // parallel grip
              {
                variant: 'parallel grip',

                variation: overheadPressPoseVariation,
              },
            ],
          },
        ],
      },
      // front raise
      {
        name: 'front raise',
        variation: [
          // barbell
          {
            variant: 'barbell',
            equipment: [['fixed barbell', 'olympic barbell', 'smith machine']],
            variation: frontRaisePoseVariation,
          },
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: [['fixed dumbbell']],
            variation: frontRaisePoseVariation,
          },
          // cable
          {
            variant: 'cable',
            equipment: [['cable pulley machine', 'cable crossover machine']],
            variation: [
              // bar
              {
                variant: 'bar',
                equipment: [['cable barbell']],
              },
              // hand grip
              {
                variant: 'hand grip',
                equipment: [['hand grip']],
              },
            ],
          },
        ],
      },
      // arnold press
      {
        name: 'arnold press',
        equipment: [['fixed dumbbell']],
        variation: [
          // standing
          {
            variant: 'standing',
          },
          // seated
          {
            variant: 'seated',
            equipment: [['adjustable bench', 'upright bench', 'flat bench']],
          },
        ],
      },
    ],
  },
  midDelt: {
    scientificName: 'lateral deltoid',
    workouts: [
      // lateral raise
      {
        name: 'lateral raise',
        variation: [
          // cable
          {
            variant: 'cable',
            equipment: [
              ['cable crossover machine', 'cable pulley machine'],
              ['cable hand grip'],
            ],
          },
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: [['fixed dumbbell']],
            variation: [
              // bent arm
              {
                variant: 'bent arm',
                variation: [
                  // standing
                  {
                    variant: 'standing',
                  },
                  // seated
                  {
                    variant: 'seated',
                    equipment: [
                      ['adjustable bench', 'upright bench', 'flat bench'],
                    ],
                  },
                ],
              },
              // straight arm
              {
                variant: 'straight arm',
                variation: [
                  // standing
                  {
                    variant: 'standing',
                  },
                  // seated
                  {
                    variant: 'seated',
                    equipment: [
                      ['adjustable bench', 'upright bench', 'flat bench'],
                    ],
                  },
                  // leaning
                  {
                    variant: 'leaned',
                  },
                ],
              },
            ],
          },
          // machine
          {
            variant: 'machine',
            equipment: [['lateral raise machine']],
          },
        ],
      },
    ],
  },
  rearDelt: {
    scientificName: 'posterior deltoid',
    workouts: [
      // rear delt row
      {
        name: 'rear delt row',
        variation: [
          // barbell
          {
            variant: 'barbell',
            equipment: [['fixed barbell', 'olympic barbell', 'smith machine']],
          },
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: [['fixed dumbbell'], ['adjustable bench', 'flat bench']],
          },
          // cable
          {
            variant: 'cable',
            equipment: [['cable crossover machine', 'cable pulley machine']],
            variation: [
              // seated
              {
                variant: 'seated',
                equipment: [['cable row machine']],
                variation: [
                  // row bar
                  {
                    variant: '',
                    equipment: [['cable row bar']],
                  },
                  // one arm
                  {
                    variant: 'one arm',
                    equipment: [['cable hand grip', 'cable double d row bar']],
                  },
                ],
              },
              // standing
              {
                variant: 'standing',
                variation: [
                  // row bar
                  {
                    variant: '',
                    equipment: [['cable row bar']],
                  },
                  // rope
                  {
                    variant: 'rope',
                    equipment: [['cable tricep rope']],
                  },
                ],
              },
            ],
          },
          // lever
          {
            variant: 'lever',
            variation: [
              // incline
              {
                variant: 'incline',
                equipment: [['incline lever row machine']],
              },
              // t-bar
              {
                variant: 't-bar',
                equipment: [['t-bar row platform']],
              },
            ],
          },
          // machine
          {
            variant: 'machine',
            equipment: [['seated row machine']],
          },
        ],
      },
      // rear delt raise
      {
        name: 'rear delt raise',
        variation: [
          // barbell
          {
            variant: 'barbell',
            equipment: [['fixed barbell', 'olympic barbell', 'smith machine']],
          },
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: [['fixed dumbbell']],
          },
        ],
      },
      // rear lateral raise
      {
        name: 'rear lateral raise',
        variation: [
          // cable
          {
            variant: 'cable',
            equipment: [
              ['cable crossover machine', 'cable pulley machine'],
              ['cable hand grip'],
            ],
            variation: rearLateralRaisePoseVariation,
          },
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: [['fixed dumbbell']],
            variation: rearLateralRaisePoseVariation,
          },
          // machine
          {
            variant: 'machine',
            equipment: [
              ['rear lateral raise machine', 'lateral raise machine'],
            ],
          },
        ],
      },
      // reverse fly
      {
        name: 'reverse fly',
        variation: [
          // cable
          {
            variant: 'cable',
            equipment: [
              ['cable crossover machine', 'cable pulley machine'],
              ['cable hand grip'],
            ],
            variation: [
              // one arm
              {
                variant: 'one arm',
              },
              // supine
              {
                variant: 'supine',
                equipment: [['adjustable bench', 'flat bench']],
              },
            ],
          },
          // machine
          {
            variant: 'machine',
            equipment: [['chest/pec fly machine', 'pec deck machine']],
          },
        ],
      },
      // standing cross row
      {
        name: 'standing cross row',
        equipment: [
          ['cable crossover machine', 'cable pulley machine'],
          ['cable hand grip'],
        ],
        variation: [
          // two arms
          {
            variant: '',
          },
          // one arm
          {
            variant: 'one arm',
          },
        ],
      },
    ],
  },
};

// ================== CHEST ==================

const benchPressLoadVariation: Array<TWorkoutVariation> = [
  // barbell
  {
    variant: 'barbell',
    equipment: [['fixed barbell', 'olympic barbell', 'smith machine']],
  },
  // dumbbell
  {
    variant: 'dumbbell',
    equipment: [['fixed dumbbell']],
  },
  // cable
  {
    variant: 'cable',
    equipment: [
      ['cable crossover machine', 'cable pulley machine'],
      ['cable hand grip', 'cable barbell'],
    ],
  },
];

export const chest: TWorkoutGroup = {
  midChest: {
    scientificName: 'pectoralis major, sternal',
    workouts: [
      // bench press
      {
        name: 'bench press',
        equipment: [
          [
            'flat bench',
            'flat bench press',
            'adjustable bench',
            'adjustable bench press',
          ],
        ],
        // barbell
        // dumbbell
        // cable
        variation: benchPressLoadVariation,
      },
      // fly
      {
        name: 'fly',
        variation: [
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: [['fixed dumbbell']],
          },
          // cable
          {
            variant: 'cable',
            equipment: [
              ['cable crossover machine', 'cable pulley machine'],
              ['cable hand grip'],
            ],
          },
          // machine
          {
            variant: 'machine',
            equipment: [['chest/pec fly machine']],
          },
        ],
      },
      // machine chest/bench press
      {
        name: 'machine chest/bench press',
        variation: [
          // default
          {
            variant: '',
            equipment: [['chest press machine', 'bench press machine']],
          },
        ],
      },
    ],
  },
  upperChest: {
    scientificName: 'pectoralis major, clavicular',
    workouts: [
      // incline bench press
      {
        name: 'incline bench press',
        equipment: [
          ['incline/decline bench', 'incline bench press', 'adjustable bench'],
        ],
        // barbell
        // dumbbell
        // cable
        variation: benchPressLoadVariation,
      },
      // incline fly
      {
        name: 'incline fly',
        variation: [
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: [
              ['fixed dumbbell'],
              [
                'incline/decline bench',
                'incline bench press',
                'adjustable bench',
              ],
            ],
          },
          // cable
          {
            variant: 'cable',
            equipment: [
              ['cable crossover machine', 'cable pulley machine'],
              ['cable hand grip', 'cable barbell'],
            ],
            variation: [
              // standing
              {
                variant: 'standing',
              },
              // seated
              {
                variant: 'seated',
                equipment: [
                  [
                    'incline/decline bench',
                    'incline bench press',
                    'adjustable bench',
                  ],
                ],
              },
            ],
          },
          // machine
          {
            variant: 'machine',
            equipment: [['incline fly machine']],
          },
        ],
      },
      // machine incline bench press
      {
        name: 'machine incline bench press',
        equipment: [['incline bench press machine']],
        variation: [],
      },
    ],
  },
  lowerChest: {
    scientificName: 'pectoralis minor',
    workouts: [
      // decline bench press
      {
        name: 'decline bench press',
        equipment: [
          ['incline/decline bench', 'decline bench', 'abdominal bench'],
        ],
        variation: benchPressLoadVariation,
      },
      // striaght bar dip
      {
        name: 'straight bar dip',
        equipment: [['smith machine']],
        variation: [],
      },
      // chest dip
      {
        name: 'chest dip',
        variation: [
          // bodyweight/weighted
          {
            variant: 'bodyweight',
            equipment: [['dipping station', 'power rack']],
          },
          // machine
          {
            variant: 'machine',
            equipment: [['seated dip machine']],
          },
        ],
      },
      // decline fly
      {
        name: 'decline fly',
        variation: [
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: [
              ['fixed dumbbell'],
              ['incline/decline bench', 'decline bench', 'abdominal bench'],
            ],
          },
          // cable
          {
            variant: 'cable',
            equipment: [
              [
                'cable crossover machine',
                'cable pulley machine',
                'cable hand grip',
              ],
            ],
          },
        ],
      },
    ],
  },
};

// ================== CHEST ==================
