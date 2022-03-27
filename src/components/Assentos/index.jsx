import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import Header from "../Header";
import Footer from '../Footer';

import "./style.css";

export default function Assentos() {
    const params = useParams();
    const [assentos, setAssentos] = useState([]);

    useEffect(()=> {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${params.idSessao}/seats`);
        promise.then((resposta)=> {
            const {data} = resposta;
            setAssentos(data.seats);
            console.log(data)
        })
        promise.catch((erro)=> {
            console.log(erro);
        })
    }, []);

    return(
        <div className="Assentos">
            <Header />
            <main>
                <h2>Selecione o(s) assento(s)</h2>
                <div className="listaAssentos">
                {assentos.map((info)=> {
                    const {id, name, isAvailable} = info;
                    return isAvailable ? (
                        <article className="assento disponivel" key={id}>
                            <p>{name}</p>
                        </article>
                    ): (
                        <article className="assento indisponivel" key={id}>
                            <p>{name}</p>
                        </article>
                    )
                })}
                </div>
                <div className="legenda">
                    <div className="ex">
                        <div className="assento selecionado"></div>
                        <p>Selecionado</p>
                    </div>
                    <div className="ex">
                        <div className="assento disponivel"></div>
                        <p>Disponível</p>
                    </div>
                    <div className="ex">                       
                        <div className="assento indisponivel"></div>
                        <p>Indisponível</p>       
                    </div>
                </div>
                <form>
                    <label>Nome do comprador:</label>
                    <input type="text" placeholder='Digite seu nome...'/>
                    <label>CPF do comprador:</label>
                    <input type="text" placeholder='Digite seu CPF...'/>
                </form>
                <div className="botao">
                    <button>Reservar assento(s)</button>
                </div>
            </main>
        </div>
    );
}