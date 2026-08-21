/**
 * Biblioteca de ícones em linha (sem dependência externa), usados nos cards
 * de serviços/diferenciais. Cada item de conteúdo referencia um ícone pelo
 * nome (campo `icone`); adicionar um novo nome aqui o disponibiliza no site.
 */
const paths = {
  dollar: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  funnel: 'M3 4h18l-7 8v6l-4 2v-8L3 4Z',
  chart: 'M4 19V5M4 19h16M8 15l3-4 3 2 4-6',
  frame: 'M3 5h18v14H3V5Zm0 10 5-5 4 4 4-3 4 4',
  piggybank:
    'M4 12a6 6 0 0 1 6-6h4a6 6 0 0 1 5.5 3.5H21l-1 3-2 .5V16l-2 2h-2v-2H9v2H7l-1.5-2A5 5 0 0 1 4 12Zm4-2h.01',
  clipboard:
    'M9 3h6a1 1 0 0 1 1 1v1h1a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1V4a1 1 0 0 1 1-1Zm-1 9h8m-8 4h8m-8-8h4',
  userCheck: 'M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-6 10a6 6 0 0 1 10-4.5M16 14l2 2 4-4',
  globe:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c-2 0-3.5-4-3.5-9S10 3 12 3s3.5 4 3.5 9-1.5 9-3.5 9ZM3.5 9h17M3.5 15h17',
  users:
    'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7-1a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 21a6 6 0 0 1 7-5.9M14 21a5.5 5.5 0 0 1 8-5',
  database:
    'M12 4c4.4 0 8 1.34 8 3s-3.6 3-8 3-8-1.34-8-3 3.6-3 8-3Zm-8 3v5c0 1.66 3.6 3 8 3s8-1.34 8-3V7m-16 5v5c0 1.66 3.6 3 8 3s8-1.34 8-3v-5',
  trendUp: 'M4 17 10 11l4 3 6-7M20 7h-4m4 0v4',
  award:
    'M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-3.5 3.5L7 22l5-2 5 2-1.5-3.5',
  phone:
    'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.35.55 3.4a1 1 0 0 1-.25 1L6.6 10.8Z',
  arrowRight: 'M5 12h14M13 5l7 7-7 7',
  chevronDown: 'm6 9 6 6 6-6',
  check: 'm5 13 4 4L19 7',
}

export default function Icon({ name, className = 'h-6 w-6' }) {
  const d = paths[name] || paths.check
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}
