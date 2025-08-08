import { createBrowserRouter, RouterProvider } from "react-router"
import './App.css';
import { Provider } from "react-redux";
import store from "../redux/app/store";
import Toprecipebar from "./wrappers/Toprecipebar";
import recipeLoader from "./loaders/unit/recipeLoader";
import Categories from "./components/Categories";
import RecipeSearch from "./pages/RecipeSearch";
import RecipeSearchLoader from "./loaders/combined/RecipeSearchLoader";
import DetailerRecipe from "./pages/DetailerRecipe";
import DetailedRecipe from "./loaders/unit/DetailedRecipe";
import Favorites from "./pages/Favorites";
import CategoriesPage from "./pages/CategoriesPage";
import categoryLoader from "./loaders/unit/categoryloader";

const routes = [
  {
    path:'/',
    element:<Toprecipebar/>,
    hydrateFallbackElement:<div>Loading Data</div>,
    children:[
      {
        path:'/',
        element:<Categories/>,
        loader:recipeLoader,
        hydrateFallbackElement:<div className="text-2xl text-blue-100 font-extrabold">Loading Data....</div>

      },
      {
        path:'/recipeSearch/:page',
        element:<RecipeSearch/>,
        loader:RecipeSearchLoader,
        hydrateFallbackElement:<div className="text-2xl text-blue-100 font-extrabold">Loading Data....</div>

      }

    ]
  },
  {
    path:'/DetailedRecipe',
    element:<DetailerRecipe/>,
    loader:DetailedRecipe,
    hydrateFallbackElement:<div className="text-2xl text-blue-100 font-extrabold">Loading Data....</div>

  },
  {
    path:'/favorites/',
    element:<Favorites/>
  },
  {
    path:'/categories/:page',
    element:<CategoriesPage/>,
    loader:categoryLoader,
    hydrateFallbackElement:<div className="text-2xl text-blue-100 font-extrabold">Loading Data....</div>

  }
];

  const router = createBrowserRouter(routes,{
  future: {
    v7_relativeSplatPath: true,
     v7_fetcherPersist: true,
     v7_normalizeFormMethod: true,
     v7_partialHydration: true,
     v7_skipActionErrorRevalidation: true,
  },
});


const App = () => {
  return <Provider store={store}>
    <RouterProvider
  router = {router}
  future={{
    v7_startTransition: true,
  }}
  />
  </Provider>
}

export default App;