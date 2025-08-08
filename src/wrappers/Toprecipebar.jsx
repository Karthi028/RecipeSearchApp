import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router"
import { clearForm, clearRadio, setoptions, setradio, setrecipes } from "../../redux/features/searchSlice";

function Toprecipebar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipe, radio, option } = useSelector((state) => state.search.formData);

  const searchradio = (event) => {
    if (radio === event.target.value) {
      dispatch(clearRadio());
      const inputtab = document.getElementById('input');
      dispatch(setoptions(''));
      inputtab.disabled = true;

    } else {
      dispatch(setradio(event.target.value));
      const inputtab = document.getElementById('input');
      inputtab.disabled = false;
    }

  };

  const handlechange = () => {

  }

  const handleoption = (event) => {
    const value = event.target.value
    console.log(option);
    if(value.length > 0){
      const capitalised = value.split(' ').map(word=>{
        if(word.length === 0){
          return '';
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
      dispatch(setoptions(capitalised));
    }else{
      dispatch(setoptions(''));
    }
    
  }

  const handlerecipe = (event) => {
    const value = event.target.value;
    if(value.length > 0){
      const capitalised = value.charAt(0).toUpperCase() + value.slice(1);
      dispatch(setrecipes(capitalised));
    }else{
      dispatch(setrecipes(''));
    }
    
  }

  const handleform = (event) => {
    event.preventDefault()
    navigate('/recipeSearch/1');


  };


  return <div className="p-2 pl-10 pr-10 relative">
    <div className="p-2 mb-5 flex justify-between items-start relative">
      <form className="flex md:flex-row sm:justify-start flex-col gap-2 sm:gap-4 md:items-center" onSubmit={(event) => handleform(event)}>
        <div className="flex items-center gap-2"> 
        <input type="text" placeholder="Search recipe..." onChange={(event) => handlerecipe(event)} value={recipe} className="text-sm
         shadow-[1px_5px_15px_rgba(0,0,0,0.1)] p-3 rounded-2xl border border-lime-300 text-neutral-600 font-semibold " />
        <button type="submit"><img src="../search.png" width={40} className="p-1 shadow rounded-full transition-transform hover:scale-125
         hover:border hover:border-lime-300" /></button>
         </div>
        <div className="border border-lime-300 flex items-center gap-2 rounded-2xl shadow-[1px_5px_15px_rgba(0,0,0,0.1)]">
          <div className="ml-1">
            <div className="text-xs flex items-center">
              <input type="radio" name="searchtype" value="Ingredients" checked={radio === "Ingredients"} onClick={searchradio}
                onChange={handlechange} />
              <label className="pl-1">Ingredients</label>
            </div>
            <div className="text-xs flex items-center">
              <input type="radio" name="searchtype" value="Categories" checked={radio === "Categories"} onClick={searchradio}
                onChange={handlechange} />
              <label className="pl-1">Categories</label>
            </div>
          </div>
          <input id="input" type="text" placeholder=" Categories or Ingredients" disabled value={option} onChange={(event) => handleoption(event)} className="text-sm 
         p-3 text-neutral-600 font-semibold rounded-2xl" />
        </div>

      </form>
      <button onClick={()=>{
        dispatch(clearForm());
        localStorage.removeItem('recipes');
        navigate('/');
        }} className="absolute right-1 top-0 w-[9%] sm:relative p-1 ml-2 sm:w-[9%] md:w-[5%]"><img src="/home.png"  className="w-9 transition-transform hover:scale-115"/></button>
        <button className="absolute right-20 top-31 sm:right-22 sm:top-5 hover:scale-110" onClick={()=>navigate('/favorites')}><img src="/love.png"  className="size-5 sm:size-7" alt="" /></button>
    </div>
    <Outlet />
  </div>
}

export default Toprecipebar