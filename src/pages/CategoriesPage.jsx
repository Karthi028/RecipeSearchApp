import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate, useParams } from "react-router"
import { setPageNo, setrecipeID } from "../../redux/features/searchSlice";

const CategoriesPage = () => {
   
    const dispatch = useDispatch();
    const { recipeID,PageNo } = useSelector((state) => state.search.formData);
    const recivedData = useLoaderData();
    const localData = JSON.parse(localStorage.getItem('categories'));
    const data = localData || recivedData || [];
    console.log(data);
    const navigate = useNavigate();
    const { page } = useParams();

    const perPage = 10;
    const Totalpages = Math.ceil(data.length / perPage);
    const startIndex = (page * perPage) - perPage;
    const lastIndex = (page * perPage);
    const currentpageData = data.slice(startIndex, lastIndex);

    const handlerecipe = (dat) => {

        const id = dat.idMeal;
        localStorage.setItem('ID', id);
        dispatch(setrecipeID(id));
        navigate('/DetailedRecipe');

    }

    if (!data || data.length === 0 || data === undefined) {
        return <div className="text-xl text-center font-semibold text-orange-500 mt-20">Unable to <span className="text-red-500 font-bold">load</span> the Recipes Come back Later....</div>
    }

    const settingpageno = () => {
        // setPage(page);
        dispatch(setPageNo(page));
    };

    const handlePrevious = () => {

        if (page !== 1 && page>1) {
            navigate(`/categories/${+page - 1}`)
             dispatch(setPageNo(+page - 1));
        }
    }

    const handleNext = () => {


        if (page < Totalpages) {
            navigate(`/categories/${+page + 1}`)
            dispatch(setPageNo(+page + 1));
        }

    }

    

    return <div className="mt-10 p-5 relative">
        <h1 className="text-center text-xl font-extrabold p-1 italic text-lime-600">Meals Catalog!!</h1>

        <div className="flex gap-1 flex-wrap justify-center ">{currentpageData.map((dat, index) => {
            return <div key={index} className="flex flex-col gap-1 p-1 relative transition-transform hover:scale-105" onClick={() => handlerecipe(dat)}>
                <img src={dat.strMealThumb} width={200} className="rounded-2xl" />
                <div className="text-xs text-gray-400 font-semibold max-w-48">
                    <p className="">Meal: {dat.strMeal}</p>
                </div>
            </div>
        })}</div>
        <div className="flex justify-center mt-2 gap-1">
            <button className="p-0.5 pl-3 pr-3 rounded-full border  hover:bg-amber-200 hover:text-white font-extrabold" onClick={handlePrevious}>-</button> <button className="p-1 pl-3 pr-3 rounded-full border bg-amber-300 text-white" >{PageNo}</button> <button className="p-0.5 pl-2.5 pr-2.5 rounded-full border  hover:bg-amber-200 hover:text-white font-extrabold" onClick={handleNext}>+</button>
        </div>
        <button className="absolute top-[-25px]" onClick={()=>navigate('/')}><img src="/home.png"  className="w-9 transition-transform hover:scale-115"/></button>
        <button className="absolute top-[-15px] left-20 hover:scale-110" onClick={()=>navigate('/favorites')}><img src="/love.png"  className="size-5 sm:size-7" alt="" /></button>
         
    </div>
}

export default CategoriesPage