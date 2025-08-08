import store from "../../../redux/app/store"
import instance from "../../instance/instance"

const DetailedRecipe = async () => {

    try {
        const state = store.getState();
        const { recipeID } = state.search.formData;
        const recipe_ID = recipeID || localStorage.getItem('ID');
        const response = await instance.get(`/lookup.php?i=${recipe_ID}`)
        if (!Array.isArray(response.data.meals)) {
            return [];
        }

        localStorage.setItem('detailrecipe', JSON.stringify(response.data.meals));

        return response.data.meals;
    } catch (error) {
        return [];
    }


};

export default DetailedRecipe;