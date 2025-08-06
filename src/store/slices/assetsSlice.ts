import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { assetAPI } from '../../services/api';

interface Asset {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  serialNumber: string;
  model: string;
  manufacturer: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  warrantyExpiry: string;
  status: string;
  condition: string;
  location: string;
  assignedTo?: any;
  department?: string;
  tags?: string[];
  images?: string[];
  documents?: any[];
  maintenanceHistory?: any[];
  customFields?: any;
  createdBy: any;
  updatedBy?: any;
  createdAt: string;
  updatedAt: string;
}

interface AssetsState {
  assets: Asset[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

const initialState: AssetsState = {
  assets: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  },
};

export const getAssets = createAsyncThunk(
  'assets/getAssets',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await assetAPI.getAssets(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const createAsset = createAsyncThunk(
  'assets/createAsset',
  async (assetData: any, { rejectWithValue }) => {
    try {
      const response = await assetAPI.createAsset(assetData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const updateAsset = createAsyncThunk(
  'assets/updateAsset',
  async ({ id, assetData }: { id: string; assetData: any }, { rejectWithValue }) => {
    try {
      const response = await assetAPI.updateAsset(id, assetData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteAsset = createAsyncThunk(
  'assets/deleteAsset',
  async (id: string, { rejectWithValue }) => {
    try {
      await assetAPI.deleteAsset(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssets.fulfilled, (state, action: PayloadAction<{ data: { assets: Asset[]; pagination: any } }>) => {
        state.loading = false;
        state.assets = action.payload.data.assets;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(getAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createAsset.fulfilled, (state, action: PayloadAction<Asset>) => {
        state.assets.unshift(action.payload);
      })
      .addCase(updateAsset.fulfilled, (state, action: PayloadAction<Asset>) => {
        const index = state.assets.findIndex(asset => asset.id === action.payload.id);
        if (index !== -1) {
          state.assets[index] = action.payload;
        }
      })
      .addCase(deleteAsset.fulfilled, (state, action: PayloadAction<string>) => {
        state.assets = state.assets.filter(asset => asset.id !== action.payload);
      });
  },
});

export default assetsSlice.reducer;
