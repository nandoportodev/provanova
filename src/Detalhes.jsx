import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Detalhes() {
    const [jogadores, setJogadores] = useState([]);
    const { id } = useParams(); // Extrai o parâmetro id_time da URL

    useEffect(() => {
        const fetchJogadores = async () => {
            try {
                const response = await axios.get(`https://api.cartola.globo.com/atletas/mercado/${id}`);
                const data = response.data;
                console.log('Dados dos jogadores:', data); // Adicionado para depuração
                setJogadores(data.atletas); // Atualizando o estado com os dados dos jogadores
            } catch (error) {
                console.error('Erro ao buscar jogadores:', error);
            }
        };

        fetchJogadores();
    }, [id]); // Adicionando id como dependência para reexecutar o efeito quando ele mudar

    console.log('Estado dos jogadores:', jogadores); // Adicionado para depuração

    return (
        <div>
            <h1>Detalhes dos Jogadores</h1>
            <ul>
                {jogadores.map(jogador => (
                    <li key={jogador.atleta_id}>
                        <img 
                            src={jogador.foto} 
                            alt={jogador.apelido} 
                            style={{ width: "220px", height: "220px", objectFit: "cover" }} 
                        />
                        <p>Nome: {jogador.apelido}</p>
                        <p>Clube: {jogador.clube_id }</p>
                        <p>Apelido: {jogador.apelido }</p>
                        <p>Apelido abreviado: {jogador.apelido_abreviado }</p>
                        <p>Posição: {jogador.posicao_id}</p>
                        <p>Clube: {jogador.clube_id }</p>
                        <p>Preço: {jogador.preco_num}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Detalhes;
