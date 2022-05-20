// USERS
export type TUser = {
    name: string;
    height: number;
    weight: number;
    image: string;
    level: number;
    savedGyms: Array<string>;
    savedWorkouts: Array<string>;
    email: string;
    providerId: string;
}

// WORKOUTS SECTION
export type TEquipmentCategories = 'bars'|'benches'|'cardio'|'dumbbells'|'machines'|'racks'

type dict<TValue> = {[key in TEquipmentCategories]: TValue}

export type TEquipment = {
    name: string,
    weights?: Array<string>;
}

export type TAllEquipment = dict<Array<TEquipment>>

export type TGym = {
    name: string;
    address: string;
    createdBy: string;
    size: number;
    images: string[];
    equipment: TAllEquipment;
}

export type TFbGymEntry = {
    id: string;
    gym: TGym;
}

export type TGyms = {[key:string]: TGym}