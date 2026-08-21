import { useEffect, useState } from 'react'
import api from '../lib/api.js'

const formatarData = (iso) => {
  try {
    return new Date(iso).toLocaleString('pt-BR')
  } catch {
    return iso
  }
}

export default function Leads() {
  const [itens, setItens] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    api
      .listarLeads()
      .then((r) => setItens(r.itens || []))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false))
  }, [])

  function baixarCsv() {
    const colunas = ['created_at', 'nome', 'email', 'whatsapp', 'instagram', 'origem']
    const linhas = [
      colunas.join(';'),
      ...itens.map((i) => colunas.map((c) => `"${String(i[c] ?? '').replace(/"/g, '""')}"`).join(';')),
    ]
    const blob = new Blob(['﻿' + linhas.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cadastros-fluxo-certo.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-[20px] text-slate-900">Cadastros</h2>
            <p className="mt-1 text-[13px] text-slate-500">
              Formulário de aplicação da página Mentoria.
            </p>
          </div>
          {itens.length ? (
            <button
              type="button"
              onClick={baixarCsv}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-[14px] font-medium text-slate-700 transition hover:border-brand hover:text-brand"
            >
              Baixar CSV
            </button>
          ) : null}
        </div>

        {erro ? <p className="mt-4 text-[13px] text-red-600">{erro}</p> : null}

        {carregando ? (
          <p className="mt-8 text-[14px] text-slate-500">Carregando...</p>
        ) : itens.length === 0 ? (
          <p className="mt-8 rounded-xl border border-dashed border-slate-200 px-6 py-12 text-center text-[14px] text-slate-400">
            Nenhum cadastro recebido ainda.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-[14px]">
              <thead className="border-b border-slate-200 text-[12px] uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="py-3 pr-4">Data</th>
                  <th className="py-3 pr-4">Nome</th>
                  <th className="py-3 pr-4">E-mail</th>
                  <th className="py-3 pr-4">WhatsApp</th>
                  <th className="py-3 pr-4">Instagram</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {itens.map((lead) => (
                  <tr key={lead.id}>
                    <td className="py-3 pr-4 text-slate-500">{formatarData(lead.created_at)}</td>
                    <td className="py-3 pr-4 font-medium text-slate-800">{lead.nome}</td>
                    <td className="py-3 pr-4">
                      <a href={`mailto:${lead.email}`} className="text-brand hover:underline">
                        {lead.email}
                      </a>
                    </td>
                    <td className="py-3 pr-4">{lead.whatsapp}</td>
                    <td className="py-3 pr-4">{lead.instagram}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
