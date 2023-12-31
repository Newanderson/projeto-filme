import { useEffect , useState} from 'react';
import'./favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'


function Favoritos(){


 const [filmes, setFilmes ] = useState([])

 useEffect(()=>{

    const minhalista = localStorage.getItem("@filmeflix");
    
    setFilmes(JSON.parse(minhalista) || [])

 },[])

 function excluirFilme(id){
   let filtroFilme = filmes.filter((item) => {

    return (item.id !== id)

   })
   setFilmes(filtroFilme);
   localStorage.setItem("@filmeflix", JSON.stringify(filtroFilme))
   toast.success("Filme removido com sucesso")
 }




    return(
            <div className="meusfil">
                <h1> Meus Filmes </h1>

                {filmes.length === 0 && <spna> Nenhum filme salvo</spna>}

                <ul>
                 {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>

                                <button onClick={()=> excluirFilme(item.id)}>Excluir</button>
                            </div>

                        </li>
                    )

                 })}   
                </ul>
            </div>


    )
}

export default Favoritos;