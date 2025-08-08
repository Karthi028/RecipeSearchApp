import instance from "../../instance/instance"
import store from "../../../redux/app/store";

const RecipeSearchLoader = async () => {

    try {
        const state = store.getState();
        const { recipe, radio, option } = state.search.formData;
        console.log({ recipe, radio, option });

        if (recipe !== '' && option === '') {

            if (recipe.length === 1) {
                const response = await instance.get(`/search.php?f=${recipe}`)
                const Data = response.data;
                localStorage.setItem('recipes',JSON.stringify(Data.meals));
                return Data.meals;
            }

            const response = await instance.get(`/search.php?s=${recipe}`)
            const Data = response.data;
            localStorage.setItem('recipes',JSON.stringify(Data.meals));
            return Data.meals;

        } else if (recipe !== '' && option !== '') {

            if (radio === 'Ingredients') {

                const response = await instance.get(`/search.php?s=${recipe}&i=${option}`)
                const recipedata = response.data.meals;
                console.log(recipedata);

                const filterrecipes = recipedata.filter((meal)=>{
                    for(let i=1;i<=20;i++){
                        const ingridentkey =`strIngredient${i}`;
                        const ingridentValue = meal[ingridentkey]
                        console.log(ingridentValue);

                        if(ingridentValue && option && ingridentValue.toLowerCase() === option.toLowerCase() ){
                            return true;
                        }
                        return false;
                    }                    
                });

                localStorage.setItem('recipes',JSON.stringify(filterrecipes))
                return (filterrecipes.length > 0 ? filterrecipes : []);

            } else if (radio === 'Categories') {

                const response = await instance.get(`/search.php?c=${option}&s=${recipe}`)
                const recipedata = response.data.meals;
                console.log(recipedata);
                const Arry = [];
                const sendingdata = recipedata.map((data) => {
                    if ((data.strCategory) === option) {
                        return Arry.push(data);
                    }
                });
                console.log(Arry);
                localStorage.setItem('recipes',JSON.stringify(Arry))
                return (Arry.length !== 0 ? Arry : []);

            }
        }

    } catch (error) {
        return [];
    }

};

export default RecipeSearchLoader;