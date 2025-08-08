import store from "../../../redux/app/store";
import instance from "../../instance/instance"

const categoryLoader = async ()=>{
    try {
       const state = store.getState()
       const {category} = state.search.formData;
       console.log(category);
    const response = await instance(`/filter.php?c=${category}`)
    if (!Array.isArray(response.data.meals)) {
            return [];
        }
        localStorage.setItem('categories',response.data.meals ? JSON.stringify(response.data.meals):[])
        return response.data
    } catch (error) {
        return [];
    }

}

export default categoryLoader;