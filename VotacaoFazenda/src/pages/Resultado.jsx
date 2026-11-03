import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  calcularResultado,
  calcularTotalVotos,
  obterVotos,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());
  const totalVotos = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  const handleZerar = () => {
    const confirmar = window.confirm('Deseja zerar a votação?');
    if (!confirmar) return;

    zerarVotos();
    setVotos({});
  };

  return (
    <main className="resultado">
      <div className="resultado-topo">
        <h1>Resultado</h1>
        {totalVotos > 0 && (
          <button type="button" className="botao botao-principal" onClick={handleZerar}>
            Zerar votação
          </button>
        )}
      </div>

      {totalVotos === 0 ? (
        <div className="resultado-vazio">
          Ainda não há votos registrados.{' '}
          <Link to="/votacao">Votar agora</Link>
        </div>
      ) : (
        <div className="placar">
          {resultado.map((participante, index) => {
            const percentual = Number(participante.percentual || 0);
            const textoPercentual = percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 });

            return (
              <div key={participante.id} className={index === 0 ? 'placar-item placar-lider' : 'placar-item'}>
                <div className="placar-topo">
                  <div className="placar-nome">
                    <span>{participante.nome}</span>
                    {index === 0 && <span className="placar-selo">Sairia hoje</span>}
                  </div>
                  <span>{textoPercentual}%</span>
                </div>

                <div className="barra">
                  <span className="barra-preenchida" 
                        style={{ width: `${percentual}%` }} />
                </div>

                <div className="placar-detalhe">
                  <span>{participante.votos} votos</span>
                  <span>{textoPercentual}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Resultado;
