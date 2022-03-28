//fazer funcao que mude "disponivel" para "selecionado" usando ${} 

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {useNavigate} from 'react-router'

import Header from "../Header";
import Footer from '../Footer';

import "./style.css";

export default function Assentos() {
    const params = useParams();
    const [assentos, setAssentos] = useState([]);
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [pedido, setPedido] = ([]);
    let navigate = useNavigate();
    const [infos, setInfos] = useState([]);
    const [dia, setDia] = useState([]);
    const [hora, setHora] = useState([])

    

    useEffect(()=> {
        alert("Infelizmente nao consegui fazer a selecao das cadeiras, mas se preencher o nome e cpf, o aplicativo ira seguir em frente!");
        
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${params.idSessao}/seats`);
        promise.then((resposta)=> {
            const {data} = resposta;
            setAssentos(data.seats);
            setInfos(data.movie)
            setDia(data.day)
            setHora(data.name)
        })
        promise.catch((erro)=> {
            console.log("deu ruim",erro);
        })
    }, []);

    function adicionaCadeira(id){
        setPedido([...pedido, id])
    }

    function finalizarPedido(e) {
        e.preventDefault();
        console.log(pedido)

        const promise = axios.post(`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`, {
            ids: 2428,
            name: nome,
            cpf: cpf
        });
        promise.then((resposta)=> {
            navigate("/sucesso", {state: {infos, dia, hora, nome, cpf, pedido, } })
        });
        promise.catch((erro)=> console.log("deu ruim", erro));
    }

    return(
        <div className="Assentos">
            <Header />
            <main>
                <h2>Selecione o(s) assento(s)</h2>
                <div className="listaAssentos">
                {assentos.map((info,indice)=> {
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
                <form onSubmit={finalizarPedido}>
                    <label htmlFor='nome-comprador'>Nome do comprador:</label>
                    <input onChange={e=> setNome(e.target.value)} value={nome} type="text" name='input-nome' placeholder='Digite seu nome...'/>
                    <label htmlFor='cpf-comprador'>CPF do comprador:</label>
                    <input onChange={e=> setCpf(e.target.value)} value={cpf} type="text" name='input-cpf' placeholder='Digite seu CPF...'/>
                <div className="botao">
                    <button type='submit'>Reservar assento(s)</button>
                </div>
                </form>
            </main>
            <Footer 
                src={infos.posterURL}
                titulo={infos.title}
                dia={dia.weekday}
                hora={hora}
            />
        </div>
    );
}