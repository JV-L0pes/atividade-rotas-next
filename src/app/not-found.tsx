import Link from "next/link";

export default function NotFound() {
  return (
    <div className="nao-encontrado">
      <p className="codigo">404</p>
      <h1>Endereço não encontrado</h1>
      <p>O endereço acessado não existe nesta aplicação.</p>
      <Link href="/" className="botao">
        Voltar ao início
      </Link>
    </div>
  );
}
