import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router"
import { setrecipeID } from "../../redux/features/searchSlice";

const Favorites = () => {
    const [heart, setheart] = useState();
    const [Page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { recipeID } = useSelector((state) => state.search.formData);
    const navigate = useNavigate();
    const { page } = useParams();

    const data = JSON.parse(localStorage.getItem("liked"));

    const perPage = 10;
    const Totalpages = Math.ceil(data.length / perPage);
    const startIndex = (Page * perPage) - perPage;
    const lastIndex = (Page * perPage);
    const currentpageData = data.slice(startIndex, lastIndex);

    const handlerecipe = (dat) => {

        const id = dat.idMeal;
        localStorage.setItem('ID', id);
        dispatch(setrecipeID(id));
        navigate('/DetailedRecipe');

    }

    if (!data || data.length === 0) {
        
        return <div><button onClick={()=>window.history.back()} className="hover:scale-110 p-4"><img src="/back.png" width={30} alt="" /></button><div className="text-xl text-center font-semibold text-orange-500 mt-20">No <span className="text-red-500 font-bold">Favorite </span>Recipes available....</div></div>
    }

    const settingpageno = () => {
        setPage(page);
    };

    const handlePrevious = () => {

        if (Page !== 1) {
            navigate(`/recipeSearch/${Page - 1}`)
            setPage(Page - 1)
        }
    }

    const handleNext = () => {


        if (Page < Totalpages) {
            navigate(`/recipeSearch/${Page + 1}`)
            setPage(Page + 1)
        }

    }

    const handleremove = (data) => {

        const likedrecipes = JSON.parse(localStorage.getItem("liked")) || [];
        const indextoremove = likedrecipes.findIndex(item => item.idMeal === data.idMeal);
        if (indextoremove !== -1) {
            likedrecipes.splice(indextoremove, 1);
            localStorage.setItem('liked', JSON.stringify(likedrecipes));
            setheart(likedrecipes);
        }
    }


    return <div className="mt-10 p-2">

        <h1 className="text-center text-xl font-extrabold p-1 italic text-lime-600">Favorite Recipes!!</h1>


        <div className="flex gap-1 flex-wrap justify-center ">{currentpageData.map((dat, index) => {
            return <div key={index} className="relative"><div className="flex flex-col gap-1 p-1 relative" onClick={() => handlerecipe(dat)}>
                <img src={dat.strMealThumb} width={200} className="rounded-2xl" />
                <div className="text-xs text-gray-400 font-semibold max-w-48">
                    <p className="">Meal: {dat.strMeal}</p>
                    <p>Area: {dat.strArea}</p>
                    <p>Category: {dat.strCategory}</p>
                </div>
            </div>
                <button id="filled" className="absolute top-0 left-[-5px] transition-transform hover:scale-120" onClick={() => handleremove(dat)}><img src="/love.png" width={20} alt="" /></button>
            </div>
        })}</div>
        <button onClick={()=>window.history.back()} className="absolute top-3 hover:scale-110"><img src="/back.png" width={30} alt="" /></button>
    </div>
}

export default Favorites