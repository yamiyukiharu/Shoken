import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  createNewGymFirestore,
  getGymsFirestore,
  getEquipmentFirestore,
} from '../../utils/firebase/firestore.utils';

import {  TGym,
  TAllEquipment,
  TEquipmentCategories,
  TFbGymEntry,
  TGyms} from '../../utils/firebase/types'

interface TGymState {
  gyms: TGyms;
  savedGyms: TGyms;
  currentGym: TFbGymEntry;
  gymInEdit: TFbGymEntry;
  allEquipment: TAllEquipment;
  createNewGymLoading: boolean;
  getGymsLoading: boolean;
  getAllEquipmentLoading: boolean;
}

export type TEditGymEquipment = {
  category: TEquipmentCategories;
  equipmentName: string;
};

const emptyGym:TGym = {
  name: '',
  address: '',
  createdBy: '',
  images: [],
  size: 0,
  equipment: {
    bars: [],
    benches: [],
    cardio: [],
    machines: [],
    racks: [],
    dumbbells: [],
  },
}

const emptyGymEntry:TFbGymEntry = {
  id: 'null',
  gym: {...emptyGym},
}

export const gymInitialState: TGymState = {
  gyms: {},
  savedGyms: {},
  currentGym: {...emptyGymEntry},
  gymInEdit: {...emptyGymEntry},
  allEquipment: {
    bars: [],
    benches: [],
    cardio: [],
    machines: [],
    racks: [],
    dumbbells: [],
  },
  createNewGymLoading: false,
  getGymsLoading: false,
  getAllEquipmentLoading: false,
};

export const createNewGym = createAsyncThunk(
  'gyms/createNewGym',
  async (gymDetails: TGym, {rejectWithValue}) => {
    try {
      return await createNewGymFirestore(gymDetails);
    } catch (err) {
      return rejectWithValue('Error creating new gym');
    }
  },
);

export const getGyms = createAsyncThunk(
  'gyms/getGyms',
  async (_, {rejectWithValue}) => {
    try {
      return await getGymsFirestore();
    } catch (err) {
      return rejectWithValue('Error getting gyms');
    }
  },
);

export const getAllEquipment = createAsyncThunk(
  'gyms/getAllEquipment',
  async (_, {rejectWithValue}) => {
    try {
      return await getEquipmentFirestore();
    } catch (err) {
      return rejectWithValue('Error getting all equipment');
    }
  },
);

const gymsSlice = createSlice({
  name: 'gyms',
  initialState: gymInitialState,
  reducers: {
    setCurrentGym(state:TGymState, action:PayloadAction<TFbGymEntry>) {
      state.currentGym = action.payload
    },
    setGymInEdit(state: TGymState, action: PayloadAction<TFbGymEntry>) {
      state.gymInEdit = action.payload;
    },
    addEquipmentToGym(
      state: TGymState,
      action: PayloadAction<TEditGymEquipment>,
    ) {
      state.gymInEdit.gym.equipment[action.payload.category].push({
        name: action.payload.equipmentName,
      });
    },
    removeEquipmentFromGym(
      state: TGymState,
      action: PayloadAction<TEditGymEquipment>,
    ) {
      state.gymInEdit.gym.equipment[action.payload.category] =
        state.gymInEdit.gym.equipment[action.payload.category].filter(
          equipment => equipment.name !== action.payload.equipmentName,
        );
    },
  },
  extraReducers: {
    //createNewGym
    [createNewGym.pending.toString()]: (state: TGymState) => {
      state.createNewGymLoading = true;
    },
    [createNewGym.fulfilled.toString()]: (
      state: TGymState,
      action: PayloadAction<TFbGymEntry>,
    ) => {
      state.createNewGymLoading = false;
      state.gyms[action.payload.id] = action.payload.gym;
    },
    [createNewGym.rejected.toString()]: (
      state: TGymState,
      action: PayloadAction<string>,
    ) => {
      state.createNewGymLoading = false;
      console.log(action.payload);
    },
    //getGyms
    [getGyms.pending.toString()]: (state: TGymState) => {
      state.getGymsLoading = true;
    },
    [getGyms.fulfilled.toString()]: (
      state: TGymState,
      action: PayloadAction<TGyms>,
    ) => {
      state.getGymsLoading = false;
      state.gyms = action.payload;
    },
    [getGyms.rejected.toString()]: (state: TGymState, action: PayloadAction<string>) => {
      state.getGymsLoading = false;
      console.log(action.payload);
    },
    //getAllEquipment
    [getAllEquipment.pending.toString()]: (state: TGymState) => {
      state.getAllEquipmentLoading = true;
    },
    [getAllEquipment.fulfilled.toString()]: (
      state: TGymState,
      action: PayloadAction<TAllEquipment>,
    ) => {
      state.getAllEquipmentLoading = false;
      state.allEquipment = action.payload;
    },
    [getAllEquipment.rejected.toString()]: (
      state: TGymState,
      action: PayloadAction<string>,
    ) => {
      state.getAllEquipmentLoading = false;
      console.log(action.payload);
    },
  },
});

export const {setGymInEdit, setCurrentGym, addEquipmentToGym, removeEquipmentFromGym} =
  gymsSlice.actions;
export default gymsSlice.reducer;
