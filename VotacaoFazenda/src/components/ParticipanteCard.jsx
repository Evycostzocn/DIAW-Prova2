function ParticipanteCard({ participante, onVotar }) {
  const { nome, foto, naRoca } = participante;

  return (
    <article className={naRoca ? 'card card-roca' : 'card'}>
      {naRoca && <span className="card-selo">Na roça</span>}
      <img src={foto} alt={nome} className="card-foto" />

      <div className="card-body">
        <h3>{nome}</h3>

        {onVotar && (
          <button type="button" className="botao botao-principal" onClick={() => onVotar(participante)}>
            Votar para eliminar
          </button>
        )}
      </div>
    </article>
  );
}

export default ParticipanteCard;