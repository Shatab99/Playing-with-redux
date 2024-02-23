import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import auth from '../../../utils/firebase.config';


/**
 * first of all make a slice as before 
 * then createAsyncThunk and export it 
 * in that thunk call the create user from firebase 
 * then return it as an object
 * then connect it to the slice as extraReducer 
 * take a parameter like builder and chain it through addCase 
 * there are three cases pending , fulfiled and rejected 
 * 
 * thunk will have parameters in an object like {email, password , name , ......}
 * 
 */

const initialState = {
  name: '',
  email: '',
  isLoading: true,
  isError: false,
  error: ''
};

export const createUser = createAsyncThunk('userSlice/createUser', async ({ email, password, name }) => {
  const data = await createUserWithEmailAndPassword(auth, email, password)
  console.log(data)

  await updateProfile(auth.currentUser, {
    displayName: name,
  })


  return {
    email: data.user.email,
    name: data.user.displayName
  };
})

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload
    },
    setUser: (state, { payload }) => {
      state.name = payload.name,
        state.email = payload.email
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.name = '';
      state.email = '';
      state.isLoading = true;
      state.isError = false;
    })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.email = payload.email;
        state.isLoading = false;
        state.isError = false;
        state.error = '';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.name = '';
        state.email = '';
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })


  }
});

export const { toggleLoading, setUser } = userSlice.actions

export default userSlice.reducer;
