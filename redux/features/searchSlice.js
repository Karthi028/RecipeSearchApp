import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData: {
        recipe : '',
        option : '',
        radio : '',
        recipeID :'',
        category: '',
    }
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setrecipes: (state, action) => {
            state.formData.recipe = action.payload;
        },
        setoptions: (state, action) => {
            state.formData.option = action.payload;
        },
        setradio: (state, action) => {
            state.formData.radio = action.payload;
        },
        clearRadio:(state)=>{
            state.formData.radio = '';
        },
        setrecipeID:(state,action)=>{
            state.formData.recipeID = action.payload;
        },
        clearForm: (state) => {
            state.formData.recipe = "";
            state.formData.option = "";
            state.formData.radio = "";

        },
        setcategory:(state,action)=>{
            state.formData.category = action.payload;
        }
    }
});

export const { setrecipes,setradio,setoptions,setrecipeID,clearRadio,clearForm,setcategory} = searchSlice.actions;
export default searchSlice.reducer;
