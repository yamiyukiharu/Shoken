import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  createNewGymDb,
  getGymsDb,
  getEquipmentDb,
  updateGymDb,
} from '../../utils/firebase/firestore.utils';

import {
  TGym,
  TAllEquipment,
  TEquipmentCategories,
  TFbGymEntry,
  TGyms,
} from '../../utils/firebase/types';

interface TGymState {
  gyms: TGyms;
  currentGym: TFbGymEntry;
  gymInEdit: TFbGymEntry;
  allEquipment: TAllEquipment;
  createNewGymLoading: boolean;
  getGymsLoading: boolean;
  getAllEquipmentLoading: boolean;
  gymSearchString: string;
  equipmentSearchString: string;
}

export type TEditGymEquipment = {
  category: TEquipmentCategories;
  equipmentName: string;
};

const emptyEquipment: TAllEquipment = {
  bars: [],
  benches: [],
  cardio: [],
  machines: [],
  racks: [],
  dumbbells: [],
  cableAttachment: [],
  others: [],
}

const emptyGym: TGym = {
  name: '',
  address: '',
  createdBy: '',
  images: [],
  size: 0,
  equipment: {...emptyEquipment},
};

const emptyGymEntry: TFbGymEntry = {
  id: '',
  gym: {...emptyGym},
};

export const gymInitialState: TGymState = {
  gyms: {},
  currentGym: {...emptyGymEntry},
  gymInEdit: {...emptyGymEntry},
  allEquipment: {...emptyEquipment},
  createNewGymLoading: false,
  getGymsLoading: false,
  getAllEquipmentLoading: false,
  gymSearchString: '',
  equipmentSearchString: '',
};

export const createNewGym = createAsyncThunk(
  'gyms/createNewGym',
  async (gymDetails: TGym, {rejectWithValue}) => {
    try {
      return await createNewGymDb(gymDetails);
    } catch (err) {
      return rejectWithValue('Error creating new gym');
    }
  },
);

export const updateGym = createAsyncThunk(
  'gyms/updateGym',
  async (gymDetails: TFbGymEntry, {rejectWithValue}) => {
    try {
      return await updateGymDb(gymDetails);
    } catch (err) {
      return rejectWithValue('Error creating new gym');
    }
  },
);

export const getGyms = createAsyncThunk(
  'gyms/getGyms',
  async (_, {rejectWithValue}) => {
    try {
      return await getGymsDb();
    } catch (err) {
      return rejectWithValue('Error getting gyms');
    }
  },
);

export const getAllEquipment = createAsyncThunk(
  'gyms/getAllEquipment',
  async (_, {rejectWithValue}) => {
    try {
      return await getEquipmentDb();
    } catch (err) {
      return rejectWithValue('Error getting all equipment');
    }
  },
);

const gymsSlice = createSlice({
  name: 'gyms',
  initialState: gymInitialState,
  reducers: {
    setCurrentGym(state: TGymState, action: PayloadAction<TFbGymEntry>) {
      state.currentGym = action.payload;
    },
    setGymInEdit(state: TGymState, action: PayloadAction<TFbGymEntry>) {
      state.gymInEdit = action.payload;
    },
    resetGymInEdit(state: TGymState) {
      state.gymInEdit = {...emptyGymEntry};
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
    setGymSearchString(state: TGymState, action: PayloadAction<string>) {
      state.gymSearchString = action.payload.toLowerCase();
    },
    setEquipmentSearchString(state: TGymState, action: PayloadAction<string>) {
      state.equipmentSearchString = action.payload.toLowerCase();
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
      state.currentGym;
      state.gymInEdit = {...state.gymInEdit, id: action.payload.id};
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
    [getGyms.rejected.toString()]: (
      state: TGymState,
      action: PayloadAction<string>,
    ) => {
      state.getGymsLoading = false;
      console.log(action.payload);
    },
    // updateGym
    [updateGym.fulfilled.toString()]: (
      state: TGymState,
      action: PayloadAction<TFbGymEntry>,
    ) => {
      state.gyms[action.payload.id] = action.payload.gym;
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

export const {
  setGymSearchString,
  setEquipmentSearchString,
  setGymInEdit,
  resetGymInEdit,
  setCurrentGym,
  addEquipmentToGym,
  removeEquipmentFromGym,
} = gymsSlice.actions;
export default gymsSlice.reducer;
