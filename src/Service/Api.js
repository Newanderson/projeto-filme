import axios from "axios";




//BASE DA URL : https://api.themoviedb.org/3/

// URL DA API : /movie/now_playing?api_key=6c5914c2ec9cb10405cd22ea3e4f89a1&language=pt-BR

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'

});

export default api;
