import axios from "axios";

const baseURL = 'https://www.themealdb.com/api/json/v1/1'

const instance =  axios.create({
    baseURL,
    headers:{
        'Content-Type':'applicaton/json',
        'Accept':'application/json'

    },
    timeout:5000
});

export default instance;









