import { useLoaderData } from "react-router"

const DetailerRecipe = () => {

    const data = JSON.parse(localStorage.getItem('detailrecipe')) || useLoaderData();
    console.log(data);

    if (!data || data.length === 0) {
        return <div className="text-xl text-center font-semibold text-orange-500 mt-20">Unable to <span className="text-red-500 font-bold">load</span> the Recipes Come back Later....</div>
    }

    const Data = data && data.length > 0 ? data[0]: null;

    const getallIngridents = (Data) => {
        if (!Data) {
            return [];
        }

        const Ingridents = [];
        for (let i = 0; i <= 20; i++) {
            const ingridentkey = `strIngredient${i}`;

            const ingrident = Data[ingridentkey];

            if (ingrident && ingrident.trim() !== '') {
                Ingridents.push(ingrident);
            }

        }
        return Ingridents;
    };

    const ingridentlist = data ? getallIngridents(Data) : [];
    console.log(ingridentlist);

    const handlebackpage = ()=>{
        window.history.back();
    }

    const handlefavorite = (data)=>{

        const liked = document.getElementById('filled');

        if(liked.classList.contains('hidden')){
           liked.classList.remove('hidden');
           const likedrecipes = JSON.parse(localStorage.getItem("liked")) || [] ;
           console.log('likedrecipes:',likedrecipes);
           console.log('data:',data);
           const isalreadyliked = likedrecipes.findIndex((item)=>item.idMeal === data.idMeal)
           if(isalreadyliked === -1){
            likedrecipes.push(data);
            localStorage.setItem('liked',JSON.stringify(likedrecipes))
           }

        }else{
            liked.classList.add('hidden');
            const likedrecipes = JSON.parse(localStorage.getItem("liked")) || [] ;
            const indextoremove = likedrecipes.findIndex(item=>item.idMeal === data.idMeal);
            if(indextoremove !== -1){
                likedrecipes.splice(indextoremove,1);
                localStorage.setItem('liked',JSON.stringify(likedrecipes));
            }

        }

    }


    return <div>
        <button onClick={handlebackpage}><img src='/back.png' width={30} className="ml-3 mt-2 transition-transform hover:scale-125"/></button>
        <div>{data.map((data, index) => {
            return <div key={index} className="relative">
                <div className="p-4 flex lg:flex-row gap-2">
                <img src={data.strMealThumb}  className="rounded-2xl w-[50%] sm:w-[45%] lg:w-[35%]" alt="" />
                <div className="lg:w-[65%] w-[50%] sm:w-[50%] space-y-[-4px]">
                <p className="text-base sm:text-lg font-bold text-gray-600 leading-none">Meal: <span className="text-sm sm:text-base text-gray-400 
                italic font-semibold">{data.strMeal}</span></p>
                <p className="text-base sm:text-lg font-bold text-gray-600">Category: <span className="text-sm sm:text-base text-gray-400 italic  font-semibold">{data.strCategory}</span></p>
                <p className="text-base sm:text-lg font-bold text-gray-600">Arear: <span className="text-sm sm:text-base text-gray-400 italic font-semibold">{data.strArea}</span></p>
                <div><h1 className="text-lg font-bold text-gray-500">Ingridents</h1>
                <ul className="list-disc list-inside">
                    {ingridentlist.map((ingrident,index)=>{ 
                    return <li key={index} className="text-xs sm:text-sm text-gray-400 italic font-semibold">{ingrident}</li>  
                })}
                </ul>
                {data.strYoutube !== ''? <p className=" text-gray-400 italic text-xs font-normal mt-1">VedioLink:
                     <a className="text-blue-400 hover:underline" href={data.strYoutube}>{data.strYoutube}</a></p>:''}
                </div>
                <h1 className="text-lg hidden lg:block font-bold text-gray-500">Instruction<p className=" text-gray-400 italic text-xs font-normal">{data.strInstructions}</p></h1>
                </div>
                </div>
                <h1 className="text-lg lg:hidden font-bold text-gray-500 p-4 mt-[-10px]">Instruction<p className=" text-gray-400 italic text-xs font-normal">{data.strInstructions}</p></h1>
                <h1 onClick={()=>handlefavorite(data)} className="absolute top-[-10px] right-8 md:top-4 md:right-8 flex items-center gap-2"><img src='/lovee.png' width={20}/><img id="filled" src='/love.png' className="absolute hidden" width={20}/><span className="text-xs text-red-500 font-semibold">Mark as Favorite</span></h1>
            </div>
        })}</div>
    </div>
}

export default DetailerRecipe