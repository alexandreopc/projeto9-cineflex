import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from "../Header";

import "./style.css";

export default function TelaPricipal() {
    const [filmes, setFilmes] = useState([]);

    useEffect(()=> {
    const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
    promise.then((resposta)=> {
        const {data} = resposta;
        setFilmes(data);
    })
    promise.catch((erro)=> {
        console.log(erro);
    })
    }, []);

    return(
        <div className="TelaPricipal">
            <Header />
            <main>
                <h2>Selecione o filme</h2>
                <div className="listaFilmes">
                {filmes.map((filme) => {
                    return(
                        <article className="filme" key={filme.id}>
                            <Link to={`/sessoes/${filme.id}`}>
                                <img src={filme.posterURL} alt={filme.title} />
                            </Link>
                        </article>
                    );
                })}
                </div>
            </main>
        </div>
    );
}