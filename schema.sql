-- Esquema do banco D1. A API também cria estas tabelas sob demanda,
-- mas rodar este arquivo garante tudo pronto antes do primeiro acesso.

CREATE TABLE IF NOT EXISTS content (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leads (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  nome       TEXT,
  email      TEXT,
  whatsapp   TEXT,
  instagram  TEXT,
  origem     TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS media (
  key        TEXT PRIMARY KEY,
  nome       TEXT,
  tipo       TEXT,
  tamanho    INTEGER,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);
