import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-fc flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Erro 404</p>
      <h1 className="mt-4 text-[34px] sm:text-[44px]">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-[17px]">
        O endereço acessado não existe ou foi movido. Volte para a página inicial.
      </p>
      <Link to="/" className="btn-primary mt-9">
        Voltar ao início
      </Link>
    </section>
  )
}
