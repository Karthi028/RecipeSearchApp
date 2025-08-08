import instance from "../../instance/instance";

const recipeLoader = async ()=>{
    try {
        const response = await instance.get('/categories.php')
        return response.data;
    } catch (error) {
         return [];
    }
}

export default recipeLoader;
