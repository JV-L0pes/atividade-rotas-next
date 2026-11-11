import { disciplinas } from "@/data/disciplinas";

export default function Disciplinas() {
  return (
    <>
      <div className="titulo-linha">
        <h1>Disciplinas</h1>
        <span className="contador verde">{disciplinas.length} disciplina(s)</span>
      </div>

      <div className="card-grid">
        {disciplinas.map((disciplina) => (
          <article key={disciplina.id} className="card disciplina">
            <span className="identificador">ID {disciplina.id}</span>
            <h2>{disciplina.name}</h2>
          </article>
        ))}
      </div>
    </>
  );
}
