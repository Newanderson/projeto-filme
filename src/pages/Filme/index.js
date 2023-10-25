import { useEffect, useState} from "react";
import {  useParams, useNavigate } from 'react-router-dom';
import api from "../../Service/Api";
import'./filmeinfo.css';
import { toast } from 'react-toastify';






function Filme(){
     
    const { id } = useParams();
    const navigate = useNavigate();
    const [Filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
           await api.get(`/movie/${id}`,{
            params:{
                api_key:"6c5914c2ec9cb10405cd22ea3e4f89a1",
                language:"pt-BR",

            }
           })
           .then((response)=>{
            setFilme(response.data);
            setLoading(false);

           })
            .catch(()=>{
                console.log("Filme não encontrdo ");
                navigate("/",{ replace: true})
                return;

            })
        }

       loadFilme();

       return () => {
        console.log("COMPONETE FOI DESMONTADO");
       }


    },[ navigate, id])

    function salvarFilme(){
       const minhaLista = localStorage.getItem("@filmeflix");

       let filmeSalvos = JSON.parse(minhaLista) || [];

       const hasFilme = filmeSalvos.some((filmeSalvo) => filmeSalvo.id === Filme.id )

       if(hasFilme){
        toast.warn("esse filme ja foi salvo");
        return;
       }
       
       filmeSalvos.push(Filme);
       localStorage.setItem("@filmeflix",JSON.stringify(filmeSalvos));
       toast.success("Filme salvo com sucesso")


    }
    
     
    if(loading){
        return(
            <div className="filme-info">
                Carregando detalhes....
            </div>
        )
    }
    return(
        <div key={Filme.id} className="filme-info">
             
           
             <img src={`https://image.tmdb.org/t/p/original/${Filme.backdrop_path}`} alt={Filme.title}/>
             
             <h1>{Filme.title}</h1>

             <h3>Sinopse</h3>
             <span>{Filme.overview}</span>

             <strong>Avaliação:{Filme.vote_average}/10 </strong>


             <div className="buttons">
                <button onClick={salvarFilme} >Salvar</button>


                <button> <a  target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${Filme.title} trailer`}>
                    Trailer

                </a></button>

             </div>

        </div>
    )
}

export default Filme;