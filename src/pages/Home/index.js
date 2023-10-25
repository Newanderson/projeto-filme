import { useEffect , useState} from "react";
import api from "../../Service/Api";
import{ Link} from 'react-router-dom'
import './home.css';


// URL DA API : /movie/now_playing?api_key=6c5914c2ec9cb10405cd22ea3e4f89a1&language=pt-BR

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
  
  
    useEffect(()=>{
  
      async function loadFilmes(){
        const response = await api.get("/movie/now_playing",{
            params:{
           api_key:"6c5914c2ec9cb10405cd22ea3e4f89a1",
           language:"pt-BR",
           page:1,
          }
        })
  
        //console.log(response.data.results.slice(0, 10));
        setFilmes(response.data.results.slice(0, 12))
        setLoading(false);
  
      }
  
      loadFilmes();
  
    }, []);
  
  
  
    if(loading){
      return(
        <div className="loading">
          <h2>Carregando filmes...</h2>
        </div>
      )
    }

       return( 
        
       <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme)=>{
                    return(
                       
                        <article key={filme.id}>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                            alt={filme.tithe}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            <strong>{filme.title}</strong>
                        </article>
                        

                    )

                })}

            

        </div>
        </div>

    )
}

export default Home;