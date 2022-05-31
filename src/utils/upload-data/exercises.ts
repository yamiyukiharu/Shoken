import {
  TAllExercises,
  TAllFlattenedExercises,
  TExercise,
  TExerciseVariation,
  TFlattenedExercises,
  TFlattenedExerciseVariations,
  TMuscleCategory,
  TMuscleGroup,
} from '../firebase/types';

// ================== SHOULDERS ==================

const overheadPressPoseVariation: Array<TExerciseVariation> = [
  // standing
  {
    variant: 'standing',
  },
  // seated
  {
    variant: 'seated',
    equipment: ['adjustable bench, upright bench'],
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

const frontRaisePoseVariation: TExerciseVariations = [
  // standing
  {
    variant: 'standing',
  },
  // incline
  {
    variant: 'incline',
    equipment: ['adjustable bench, upright bench'],
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

const rearLateralRaisePoseVariation: TExerciseVariations = [
  // standing
  {
    variant: 'standing',
  },
  // seated
  {
    variant: 'seated',
    equipment: ['adjustable bench, upright bench, flat bench'],
  },
];

const shoulders: TMuscleGroup = {
  frontDelt: {
    scientificName: 'anterior deltoid',
    exercises: [
      // overhead press
      {
        name: 'overhead press',
        variation: [
          // barbell
          {
            variant: 'barbell',
            equipment: ['fixed barbell, olympic barbell, smith machine'],
            variation: overheadPressPoseVariation,
          },
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: ['fixed dumbbell'],
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
            equipment: ['cable pulley machine, cable crossover machine'],
            variation: [
              // bar
              {
                variant: 'bar',
                equipment: ['cable barbell'],
                variation: overheadPressPoseVariation,
              },
              // hand grip
              {
                variant: 'hand grip',
                equipment: ['hand grip'],
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
            equipment: ['shoulder press machine, hammer strength machine'],
            variation: [
              // normal
              {
                variant: '',
              },
              // parallel grip
              {
                variant: 'parallel grip',
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
            equipment: ['fixed barbell, olympic barbell, smith machine'],
            variation: frontRaisePoseVariation,
          },
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: ['fixed dumbbell'],
            variation: frontRaisePoseVariation,
          },
          // cable
          {
            variant: 'cable',
            equipment: ['cable pulley machine, cable crossover machine'],
            variation: [
              // bar
              {
                variant: 'bar',
                equipment: ['cable barbell'],
              },
              // hand grip
              {
                variant: 'hand grip',
                equipment: ['hand grip'],
              },
            ],
          },
        ],
      },
      // arnold press
      {
        name: 'arnold press',
        equipment: ['fixed dumbbell'],
        variation: [
          // standing
          {
            variant: 'standing',
          },
          // seated
          {
            variant: 'seated',
            equipment: ['adjustable bench, upright bench, flat bench'],
          },
        ],
      },
    ],
  },
  midDelt: {
    scientificName: 'lateral deltoid',
    exercises: [
      // lateral raise
      {
        name: 'lateral raise',
        variation: [
          // cable
          {
            variant: 'cable',
            equipment: [
              'cable crossover machine, cable pulley machine',
              'cable hand grip',
            ],
          },
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: ['fixed dumbbell'],
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
                    equipment: ['adjustable bench, upright bench, flat bench'],
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
                    equipment: ['adjustable bench, upright bench, flat bench'],
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
            equipment: ['lateral raise machine'],
          },
        ],
      },
    ],
  },
  rearDelt: {
    scientificName: 'posterior deltoid',
    exercises: [
      // rear delt row
      {
        name: 'rear delt row',
        variation: [
          // barbell
          {
            variant: 'barbell',
            equipment: ['fixed barbell, olympic barbell, smith machine'],
          },
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: ['fixed dumbbell', 'adjustable bench, flat bench'],
          },
          // cable
          {
            variant: 'cable',
            equipment: ['cable crossover machine, cable pulley machine'],
            variation: [
              // seated
              {
                variant: 'seated',
                equipment: ['cable row machine'],
                variation: [
                  // row bar
                  {
                    variant: '',
                    equipment: ['cable row bar'],
                  },
                  // one arm
                  {
                    variant: 'one arm',
                    equipment: ['cable hand grip, cable double d row bar'],
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
                    equipment: ['cable row bar'],
                  },
                  // rope
                  {
                    variant: 'rope',
                    equipment: ['cable tricep rope'],
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
                equipment: ['incline lever row machine'],
              },
              // t-bar
              {
                variant: 't-bar',
                equipment: ['t-bar row platform'],
              },
            ],
          },
          // machine
          {
            variant: 'machine',
            equipment: ['seated row machine'],
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
            equipment: ['fixed barbell, olympic barbell, smith machine'],
          },
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: ['fixed dumbbell'],
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
              'cable crossover machine, cable pulley machine',
              'cable hand grip',
            ],
            variation: rearLateralRaisePoseVariation,
          },
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: ['fixed dumbbell'],
            variation: rearLateralRaisePoseVariation,
          },
          // machine
          {
            variant: 'machine',
            equipment: ['rear lateral raise machine, lateral raise machine'],
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
              'cable crossover machine, cable pulley machine',
              'cable hand grip',
            ],
            variation: [
              // one arm
              {
                variant: 'one arm',
              },
              // supine
              {
                variant: 'supine',
                equipment: ['adjustable bench, flat bench'],
              },
            ],
          },
          // machine
          {
            variant: 'machine',
            equipment: ['chest/pec fly machine, pec deck machine'],
          },
        ],
      },
      // standing cross row
      {
        name: 'standing cross row',
        equipment: [
          'cable crossover machine, cable pulley machine',
          'cable hand grip',
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

const benchPressLoadVariation: TExerciseVariations = [
  // barbell
  {
    variant: 'barbell',
    equipment: ['fixed barbell, olympic barbell, smith machine'],
  },
  // dumbbell
  {
    variant: 'dumbbell',
    equipment: ['fixed dumbbell'],
  },
  // cable
  {
    variant: 'cable',
    equipment: [
      'cable crossover machine, cable pulley machine',
      'cable hand grip, cable barbell',
    ],
  },
];

const chest: TMuscleGroup = {
  midChest: {
    scientificName: 'pectoralis major, sternal',
    exercises: [
      // bench press
      {
        name: 'bench press',
        equipment: [
          'flat bench, flat bench press, adjustable bench, adjustable bench press',
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
            equipment: ['fixed dumbbell'],
          },
          // cable
          {
            variant: 'cable',
            equipment: [
              'cable crossover machine, cable pulley machine',
              'cable hand grip',
            ],
          },
          // machine
          {
            variant: 'machine',
            equipment: ['chest/pec fly machine'],
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
            equipment: ['chest press machine, bench press machine'],
          },
        ],
      },
    ],
  },
  upperChest: {
    scientificName: 'pectoralis major, clavicular',
    exercises: [
      // incline bench press
      {
        name: 'incline bench press',
        equipment: [
          'incline/decline bench, incline bench press, adjustable bench',
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
              'fixed dumbbell',
              'incline/decline bench, incline bench press adjustable bench',
            ],
          },
          // cable
          {
            variant: 'cable',
            equipment: [
              'cable crossover machine, cable pulley machine',
              'cable hand grip, cable barbell',
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
                  'incline/decline bench, incline bench press, adjustable bench',
                ],
              },
            ],
          },
          // machine
          {
            variant: 'machine',
            equipment: ['incline fly machine'],
          },
        ],
      },
      // machine incline bench press
      {
        name: 'machine incline bench press',
        equipment: ['incline bench press machine'],
        variation: [],
      },
    ],
  },
  lowerChest: {
    scientificName: 'pectoralis minor',
    exercises: [
      // decline bench press
      {
        name: 'decline bench press',
        equipment: ['incline/decline bench, decline bench, abdominal bench'],
        variation: benchPressLoadVariation,
      },
      // striaght bar dip
      {
        name: 'straight bar dip',
        equipment: ['smith machine'],
        variation: [],
      },
      // chest dip
      {
        name: 'chest dip',
        variation: [
          // bodyweight/weighted
          {
            variant: 'bodyweight',
            equipment: ['dipping station, power tower'],
          },
          // machine
          {
            variant: 'machine',
            equipment: ['seated dip machine'],
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
              'fixed dumbbell',
              'incline/decline bench, decline bench, abdominal bench',
            ],
          },
          // cable
          {
            variant: 'cable',
            equipment: [
              'cable crossover machine, cable pulley machine, cable hand grip',
            ],
          },
        ],
      },
    ],
  },
};

// ================== BACK ==================

const back: TMuscleGroup = {
  generalBack: {
    scientificName: 'back',
    exercises: [],
  },
  lats: {
    scientificName: 'latissimus dorsi, teres major',
    exercises: [],
  },
  upperTraps: {
    scientificName: 'upper trapezius',
    exercises: [],
  },
  middleTraps: {
    scientificName: 'middle trapezius',
    exercises: [],
  },
  lowerTraps: {
    scientificName: 'lower trapezius',
    exercises: [],
  },
  rotatorCuffs: {
    scientificName: 'supraspinatus, infraspinatus, subscapularis, teres minor',
    exercises: [],
  },
};

// ================== ARMS ==================

const arms: TMuscleGroup = {
  triceps: {
    scientificName: 'triceps brachii',
    exercises: [
      // triceps dips
      {
        name: 'tricep dips',
        variation: [
          // bench
          {
            variant: 'bench',
            equipment: ['flat bench, adjustable bench'],
          },
          // assisted
          {
            variant: 'assisted',
            equipment: ['assisted pull-up/dip machine'],
          },
          // bodyweight/weighted
          {
            variant: 'bodyweight/weighted',
            equipment: ['dipping station, power tower'],
          },
        ],
      },
      // close grip bench press
      {
        name: 'close grip bench press',
        equipment: [
          'flat bench press, adjustable bench press, flat bench, adjustable bench',
        ],
        variation: [
          // barbell
          {
            variant: 'barbell',
            equipment: [
              'fixed barbell, olympic barbell, ez bar, smith machine',
            ],
          },
          // dumbbell
          {
            variant: 'dumbbell',
            equipment: ['fixed dumbbell'],
          },
        ],
      },
      // jm bench press
      {
        name: 'jm bench press',
        equipment: [
          'flat bench press, adjustable bench press, flat bench, adjustable bench',
          'fixed barbell, olympic barbell, ez bar',
        ],
        variation: [
          {
            variant: '',
          },
        ],
      },
      // triceps extension
      // dumbbell
      // barbell
      // machine
      // cable overhead
      // straight bar
      // rope
      // single arm
      // triceps kickback
      // triceps pushdown
      {
        name: 'pushdown',
        variation: [
          // machine
          {
            variant: 'machine',
            equipment: ['tricep pushdown machine'],
          },
          // cable
          {
            variant: 'cable',
            equipment: ['cable crossover machine, cable pulley machine'],
            variation: [
              // straight bar
              {
                variant: 'straight bar',
                equipment: ['cable straight bar'],
                variation: [
                  // forward grip
                  // upright
                  // forward lean
                  // reverse grip
                  // upright
                  // forward lean
                ],
              },
              // rope

              // v-bar

              // single arm
            ],
          },
        ],
      },
    ],
  },
  biceps: {
    scientificName: 'biceps brachii, brachialis',
    exercises: [],
  },
  forearms: {
    scientificName:
      'brachioradialis, pronators, supinators, flexors, extensors',
    exercises: [],
  },
};

// ================== HIPS ==================

const hips: TMuscleGroup = {
  glutes: {
    scientificName: 'Gluteus Maximus',
    exercises: [],
  },
  hipAbductors: {
    scientificName: 'gluteus medius, gluteus minimus',
    exercises: [],
  },
  hipFlexors: {
    scientificName:
      'iliopsoas, sartorius, rectus femoris, tensor fasciae latae, pectineus',
    exercises: [],
  },
};

// ================== LEGS ==================

const legs: TMuscleGroup = {
  quads: {
    scientificName: 'quadriceps',
    exercises: [],
  },
  hamstrings: {
    scientificName: 'hamstrings',
    exercises: [],
  },
  hipAdductors: {
    scientificName: 'adductors, pectineus, gracilis',
    exercises: [],
  },
  calf: {
    scientificName: 'gastrocnemius, soleus, tibialis anterior',
    exercises: [],
  },
};

// ================== WAIST ==================

const waist: TMuscleGroup = {
  abs: {
    scientificName: 'rectus abdominis',
    exercises: [],
  },
  obliques: {
    scientificName: 'obliques',
    exercises: [],
  },
  lowerBack: {
    scientificName: 'erector spinae',
    exercises: [],
  },
};

// ================= OTHERS ===================

const others: TMuscleGroup = {};

// ================= ALL ===================

export const allExercises: TAllExercises = {
  shoulders: shoulders,
  chest: chest,
  arms: arms,
  back: back,
  waist: waist,
  hips: hips,
  legs: legs,
  others: others,
};

import {addCollectionAndDocuments} from './index';

const flattenExerciseVariations: (
  exercicseVariantArray: TExerciseVariations,
) => TFlattenedExerciseVariations = exercicseVariantArray => {
  const result: TFlattenedExerciseVariations = [];

  // recursive loop over every variant and subvariant
  exercicseVariantArray.forEach((exercicseVariant, index) => {
    if (exercicseVariant.variation) {
      const data = flattenExerciseVariations(exercicseVariant.variation);

      data.forEach(subvariant => {
        // joins the variant names together
        // insert spaces at the right places
        let name = '';
        let equipment = [];
        if (exercicseVariant.variant === '') {
          name = subvariant.name;
        } else if (subvariant.name === '') {
          name = exercicseVariant.variant;
        } else {
          name = `${subvariant.name} ${exercicseVariant.variant}`;
        }

        // handle equipment
        if (subvariant.equipment) {
          equipment.push(...subvariant.equipment);
        }
        if (exercicseVariant.equipment) {
          equipment.push(...exercicseVariant.equipment);
        }

        result.push({
          id: [index, ...subvariant.id],
          name: name,
          equipment: equipment,
        });
      });
    } else {
      result.push({
        id: [index],
        name: exercicseVariant.variant,
        equipment: exercicseVariant.equipment,
      });
    }
  });

  return result;
};

const flattenExercises: (
  exercises: Array<TExercise>,
) => TFlattenedExercises = exercises => {
  const result: TFlattenedExercises = {};

  exercises.forEach((exercise, index) => {
    let variations = flattenExerciseVariations(exercise.variation);

    variations.forEach(variant => {
      let uid = '';
      variant.id.forEach(digit => (uid += digit.toString()));
      uid = index.toString() + uid;

      if (Object.keys(result).includes(uid)) {
        throw 'clash!';
      }
      result[uid] = {
        name: variant.name + ' ' + exercise.name,
        equipment: variant.equipment,
      };
    });
  });
  return result;
};

export const flattenAllExercises: (
  allExercises: TAllExercises,
) => TAllFlattenedExercises = allExercises => {
  const result: TAllFlattenedExercises = {};

  const muscleCategories = Object.keys(allExercises) as Array<TMuscleCategory>;
  muscleCategories.forEach(muscleCategory => {
    const muscles = Object.keys(allExercises[muscleCategory]);

    result[muscleCategory] = {};
    muscles.forEach(muscle => {
      result[muscleCategory][muscle] = flattenExercises(
        allExercises[muscleCategory][muscle].exercises,
      );
    });
  });

  return result;
};

import * as fs from 'fs';

const data = flattenAllExercises(allExercises);
const jsonData = JSON.stringify(data);
fs.writeFileSync('flattened_exercises.json', jsonData);

// addCollectionAndDocuments('test', 'shoulders', shoulders);
// addCollectionAndDocuments('test', 'chest', chest);
