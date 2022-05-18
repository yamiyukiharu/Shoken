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
  TGym,
  TAllEquipment,
  TEquipmentCategories,
} from '../../utils/firebase/firestore.utils';

interface TGymState {
  gyms: Array<TGym>;
  savedGyms: Array<TGym>;
  currentGym: TGym;
  gymInEdit: TGym;
  allEquipment: TAllEquipment;
  createNewGymLoading: boolean;
  getGymsLoading: boolean;
  getAllEquipmentLoading: boolean;
}

export type TEditGymEquipment = {
  category: TEquipmentCategories;
  equipmentName: string;
};

const emptyGym = {
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

export const gymInitialState: TGymState = {
  gyms: [],
  savedGyms: [],
  currentGym: emptyGym,
  gymInEdit: emptyGym,
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
    addGym(state:TGymState, action:PayloadAction<TGym>) {
      state.savedGyms.push(action.payload)
    },
    setCurrentGym(state:TGymState, action:PayloadAction<TGym>) {
      state.currentGym = action.payload
    },
    setGymInEdit(state: TGymState, action: PayloadAction<TGym>) {
      state.gymInEdit = {...state.gymInEdit, ...action.payload};
    },
    addEquipmentToGym(
      state: TGymState,
      action: PayloadAction<TEditGymEquipment>,
    ) {
      state.gymInEdit.equipment[action.payload.category].push({
        name: action.payload.equipmentName,
      });
    },
    removeEquipmentFromGym(
      state: TGymState,
      action: PayloadAction<TEditGymEquipment>,
    ) {
      state.gymInEdit.equipment[action.payload.category] =
        state.gymInEdit.equipment[action.payload.category].filter(
          equipment => equipment.name !== action.payload.equipmentName,
        );
    },
  },
  extraReducers: {
    //createNewGym
    [createNewGym.pending]: (state: TGymState) => {
      state.createNewGymLoading = true;
    },
    [createNewGym.fulfilled]: (
      state: TGymState,
      action: PayloadAction<TGym>,
    ) => {
      state.createNewGymLoading = false;
      state.gyms.push(action.payload);
    },
    [createNewGym.rejected]: (
      state: TGymState,
      action: PayloadAction<string>,
    ) => {
      state.createNewGymLoading = false;
      console.log(action.payload);
    },
    //getGyms
    [getGyms.pending]: (state: TGymState) => {
      state.getGymsLoading = true;
    },
    [getGyms.fulfilled]: (
      state: TGymState,
      action: PayloadAction<Array<TGym>>,
    ) => {
      state.getGymsLoading = false;
      state.gyms = action.payload;
    },
    [getGyms.rejected]: (state: TGymState, action: PayloadAction<string>) => {
      state.getGymsLoading = false;
      console.log(action.payload);
    },
    //getAllEquipment
    [getAllEquipment.pending]: (state: TGymState) => {
      state.getAllEquipmentLoading = true;
    },
    [getAllEquipment.fulfilled]: (
      state: TGymState,
      action: PayloadAction<TAllEquipment>,
    ) => {
      state.getAllEquipmentLoading = false;
      state.allEquipment = action.payload;
    },
    [getAllEquipment.rejected]: (
      state: TGymState,
      action: PayloadAction<string>,
    ) => {
      state.getAllEquipmentLoading = false;
      console.log(action.payload);
    },
  },
});

export const {setGymInEdit, setCurrentGym, addEquipmentToGym, removeEquipmentFromGym, addGym} =
  gymsSlice.actions;
export default gymsSlice.reducer;
