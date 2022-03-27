import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import Header from "../Header";

import "./style.css";

export default function Sessoes() {
    const params = useParams();
    const [sessoes, setSessoes] = useState([]);

    useEffect(()=> {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${params.idFilme}/showtimes`);
        promise.then((resposta)=> {
            const {data} = resposta;
            setSessoes(data.days);
        })
        promise.catch((erro)=> {
            console.log(erro);
        })
    }, []);

    console.log(sessoes);

    return (
        <div className="Sessoes">
            <Header />
            <main>
                <h2>Selecione o horário</h2>
                <div className="listaSessoes">
                {sessoes.map((info)=> {
                    const {showtimes: showTimes, id, weekday, date} = info;
                    return(
                        <article className='sessao' key={id}>
                            <p>{weekday} - {date}</p>
                            <div className="horarios">
                            {showTimes.map((hora)=> {
                                const {id, name} = hora;
                                return(
                                    <button key={id}>
                                        <Link to={`/assentos/${id}`}> <span>{name}</span> </Link>
                                    </button>
                                );
                            })}
                            </div>
                        </article>
                    );
                })}
                </div>
            </main>
        </div>
    );
}