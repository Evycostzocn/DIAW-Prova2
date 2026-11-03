import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService';

function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [quantidadeVotos, setQuantidadeVotos] = useState(0);
  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  const handleVotar = (participante) => {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setQuantidadeVotos((atual) => atual + 1);
  };

  return (
    <main className="votacao">
      <section className="grade-roca">
        {naRoca.map((participante) => (
          <ParticipanteCard 
            key={participante.id} 
            participante={participante} 
            onVotar={handleVotar} 
            />
        ))}
      </section>

      {ultimoVoto && (
        <div className="mensagem-voto">
          Você votou em <strong>{ultimoVoto.nome}</strong>. Já votou {quantidadeVotos}{' '}
          {quantidadeVotos === 1 ? 'vez' : 'vezes'}.{' '}
          <Link to="/resultado">Ver resultado</Link>
        </div>
      )}

      <section className="grade-peoes">
        <h2>Demais peões</h2>
        <div className="lista-peoes">
          {foraDaRoca.map((participante) => (
            <ParticipanteCard key={participante.id} participante={participante} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;