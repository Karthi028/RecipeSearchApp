import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router";
import { setcategory } from "../../redux/features/searchSlice";

const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {category} = useSelector((state)=>state.search.formData);
    const response = useLoaderData();
    const recipes = response.categories || [];    
    if(recipes.length === 0){
        return <div className="text-xl text-center font-semibold text-orange-500 mt-20">Unable to <span className="text-red-500 font-bold">load</span> the Recipes Come back Later....</div>
    }

    const modifieddata = recipes.map((recip) => {
        if (recip.idCategory == 3 || recip.idCategory == 8) {
            return { ...recip, value: "large" }
        }
        return recip;
    })

    const handlecategory = (recipe)=>{
        console.log(recipe);
        const category = recipe.strCategory;
        dispatch(setcategory(category));
        navigate('/categories/1')
        
    }


    return <div className="">
        <h1 className="text-xl bg-lime-300 text-white font-bold italic p-1 shadow mb-1 rounded-2xl text-center mr-[15%] ml-[15%] sm:mr-[30%] sm:ml-[30%]  lg:mr-[40%] lg:ml-[40%]">Meal Categories</h1>
        <div className="grid justify-between lg:grid-cols-4 lg:grid-rows-4 sm:grid-cols-3 sm:grid-rows-5 grid-cols-2 grid-roes-7 gap-x-2 gap-y-3 p-2">
            {modifieddata.map((recipe, index) => {

                return <div onClick={()=>handlecategory(recipe)} key={index} className={`shadow-[1px_1px_25px_rgba(0,0,0,0.1)] rounded-xl flex flex-col items-center hover:shadow-cyan-100 p-1 transition-transform hover:scale-90 ${recipe.value === "large" ? "lg:col-span-2 lg:flex lg:flex-row" : ""}`}>
                    <img src={recipe.strCategoryThumb} width={250} alt="" />
                    <div className={`w-[60%] ${recipe.value === "large"? "flex flex-col items-center":''}`}>
                        <p className={`text-gray-400 font-bold text-sm text-center p-1 shadow rounded-full mt-1 mb-1 ${recipe.value === "large"? "w-[80%]":""}`}>{recipe.strCategory}</p>
                        {recipe.value === "large" && (
                            <p className="text-[8px] hidden lg:block ml-1 mr-1 text-gray-400">{recipe.strCategoryDescription}</p>
                        )
                        }
                    </div>
                </div>

            })}
        </div>

    </div>
}

export default Categories;