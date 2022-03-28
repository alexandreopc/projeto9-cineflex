import { Link } from 'react-router-dom';
import {useLocation } from 'react-router';
import Header from '../Header';

import "./style.css";

export default function Sucesso() {
    const location = useLocation()

    const { infos:{title}, dia:{date, weekday}, hora, nome, cpf, pedido } = location.state
    
    function formataCPF(cpf){
        cpf = cpf.replace(/[^\d]/g, "");
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return(
        <div className="Sucesso">
            <Header />
            <h2>Pedido feito com sucesso!</h2>
            <div className="filme">
                <h4>Filme e sessão</h4>
                <p>{title}</p>
                <p>{date}  {hora}</p>
            </div>
            <div className="poltrona">
                <h4>Ingressos</h4>
                <p>Nao consegui gravar as cadeiras selecionadas, o progama envia o numero de uma potrona especifica para completar o post e parar nessa tela :(</p>
            </div>
            <div className="comprador">
                <h4>Comprador</h4>
                <p>Nome: {nome}</p>
                <p>CPF: {formataCPF(cpf)}</p>
            </div>
            <div className="fim">
            <button>
                <Link to={`/`}><span>Voltar pra Home</span> </Link>
            </button>
            </div>
            
        </div>
    );
}