import { useState } from 'react'
import logo from './assets/book-logo.png'

type Page = 'home' | 'livros' | 'clientes' | 'vendas' | 'reservas'

const navItems: Array<{ page: Page; label: string }> = [
  { page: 'home', label: 'Home' },
  { page: 'livros', label: 'Livros' },
  { page: 'vendas', label: 'Vendas' },
  { page: 'reservas', label: 'Reservas' },
]

function App() {
  const [page, setPage] = useState<Page>('home')
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = (nextPage: Page) => {
    setPage(nextPage)
    setMenuOpen(false)
  }

  return (
    <div className={page === 'home' ? 'bg-white text-gray-900' : 'min-h-screen bg-gray-100 text-gray-900'}>
      <Header activePage={page} menuOpen={menuOpen} onMenuOpen={setMenuOpen} onNavigate={navigate} />
      {page === 'home' && <HomePage onNavigate={navigate} />}
      {page === 'livros' && <BooksPage onNavigate={navigate} />}
      {page === 'clientes' && <ClientsPage onNavigate={navigate} />}
      {page === 'vendas' && <SalesPage onNavigate={navigate} />}
      {page === 'reservas' && <ReservationsPage onNavigate={navigate} />}
    </div>
  )
}

function Header({
  activePage,
  menuOpen,
  onMenuOpen,
  onNavigate,
}: {
  activePage: Page
  menuOpen: boolean
  onMenuOpen: (open: boolean) => void
  onNavigate: (page: Page) => void
}) {
  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="-m-1.5 grid grid-cols-2 place-items-center p-1.5 text-black"
          >
            <img src={logo} alt="" className="h-10 w-auto" />
            <span className="font-bold text-xl">Book.net</span>
          </button>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => onMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item) => (
            <button
              key={item.page}
              type="button"
              onClick={() => onNavigate(item.page)}
              className={`text-sm/6 font-semibold ${activePage === item.page ? 'text-teal-700' : 'text-gray-900'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-transparent" onClick={() => onMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="-m-1.5 grid grid-cols-2 place-items-center p-1.5 text-black"
              >
                <img src={logo} alt="" className="h-10 w-auto" />
                <span className="font-bold text-xl">Book.net</span>
              </button>
              <button type="button" onClick={() => onMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span className="sr-only">Close menu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
                  <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navItems.map((item) => (
                    <button
                      key={item.page}
                      type="button"
                      onClick={() => onNavigate(item.page)}
                      className="-mx-3 block w-full rounded-lg px-3 py-2 text-left text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const stats = [
    ['Vendas Hoje', 'R$640,00'],
    ['Faturamento Mensal', 'R$37.280,00'],
    ['Livros Vendidos', '127'],
    ['Livros no Acervo', '822'],
    ['Alugueis Ativos', '28'],
    ['Clientes', '1.675'],
  ]

  const areas: Array<[string, string, string, string, Page]> = [
    ['fa-book-bookmark', 'bg-orange-600', 'Area de Livros', 'Gerenciar Livros', 'livros' as Page],
    ['fa-users', 'bg-purple-600', 'Area dos Clientes', 'Gerenciar Clientes', 'clientes' as Page],
    ['fa-cart-shopping', 'bg-yellow-600', 'Area de Vendas', 'Gerenciar Vendas', 'vendas' as Page],
    ['fa-cash-register', 'bg-teal-600', 'Area de Alugueis', 'Gerenciar Alugueis', 'vendas' as Page],
    ['fa-calendar-check', 'bg-green-600', 'Area de Reservas', 'Gerenciar Reservas', 'reservas' as Page],
  ]

  return (
    <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 pb-10 pt-6 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section className="grid grid-cols-1 gap-3 pt-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label} className="dashboard h-24 w-full rounded-r-lg bg-teal-700 p-3 opacity-80 shadow-sky-600">
            <h2 className="font-semibold text-white">{label}</h2>
            <p className="pt-2 tabular-nums text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 pt-5 sm:grid-cols-2 lg:gap-6">
        {areas.map(([icon, color, title, description, target], index) => (
          <div
            key={title}
            className={`dashboard h-30 w-full rounded-md border border-solid border-gray-300 p-3 shadow-sm ${index === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
          >
            <i className={`fa-solid ${icon} ${color} rounded-md p-2 pr-6 text-center text-white`} />
            <h2 className="mt-2 font-semibold">{title}</h2>
            <div className="grid grid-cols-6">
              <p className="col-span-5 text-sm text-gray-800 opacity-80">{description}</p>
              <button type="button" onClick={() => onNavigate(target)} aria-label={title}>
                <i className="fa-solid fa-arrow-trend-up border-gray-300" />
              </button>
            </div>
          </div>
        ))}
      </section>

      <hr className="mb-2 mt-2 border-gray-300 lg:col-span-2" />
      <section className="lg:col-span-2">
        <h1 className="text-2xl font-bold">Ultimos Lancamentos de livros</h1>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Release icon="fa-code" color="bg-orange-600" title="HTML e CSS Moderno" author="Clara Menezes" price="R$89,90" />
          <Release icon="fa-database" color="bg-purple-600" title="Banco de Dados na Pratica" author="Marcos Vieira" price="R$74,50" />
          <Release icon="fa-network-wired" color="bg-green-600" title="Redes para Iniciantes" author="Felipe Rocha" price="R$68,00" wide />
        </div>
      </section>
    </main>
  )
}

function Release({ icon, color, title, author, price, wide = false }: { icon: string; color: string; title: string; author: string; price: string; wide?: boolean }) {
  return (
    <article className={`rounded-md border border-gray-300 p-4 shadow-sm ${wide ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
      <i className={`fa-solid ${icon} rounded-md ${color} p-2 text-white`} />
      <h2 className="mt-3 font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-gray-800 opacity-80">Autor: {author}</p>
      <p className="mt-2 text-sm font-semibold text-teal-700">{price}</p>
    </article>
  )
}

function PageTitle({ accent, title, onNavigate }: { accent: string; title: string; onNavigate: (page: Page) => void }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className={`text-sm font-semibold ${accent}`}>Book.Net</p>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="inline-flex w-fit items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        <i className="fa-solid fa-arrow-left" />
        Voltar
      </button>
    </div>
  )
}

function MetricCards({ items, columns = 'md:grid-cols-4' }: { items: string[][]; columns?: string }) {
  return (
    <section className={`grid gap-4 ${columns}`}>
      {items.map(([label, value]) => (
        <div key={label} className="rounded-md bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">{label}</p>
          <strong className="mt-2 block text-2xl">{value}</strong>
        </div>
      ))}
    </section>
  )
}

function Field({ label, type = 'text', placeholder, wide = false, select, value }: { label: string; type?: string; placeholder?: string; wide?: boolean; select?: string[]; value?: string }) {
  return (
    <label className={`text-sm font-semibold ${wide ? 'md:col-span-2' : ''}`}>
      {label}
      {select ? (
        <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-normal">
          {select.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          min={type === 'number' ? '1' : undefined}
          max={label === 'Quantidade *' ? '3' : undefined}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-normal"
        />
      )}
    </label>
  )
}

function BooksPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <PageTitle accent="text-teal-700" title="Cadastro e controle de livros" onNavigate={onNavigate} />
      <MetricCards items={[['Livros cadastrados', '4.500'], ['Disponiveis para venda', '1.280'], ['Disponiveis para aluguel', '2.940'], ['Em promocao', '36']]} />

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <form className="rounded-md bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold">Novo livro</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="ISBN *" placeholder="978-85-00000-00-0" />
            <Field label="Nome do livro *" placeholder="Programacao Web" />
            <Field label="Editora *" placeholder="Editora" />
            <Field label="Autor *" placeholder="Autor" />
            <Field label="Ano de publicacao *" type="number" placeholder="2026" />
            <Field label="Assunto *" select={['Desenvolvimento', 'Internet', 'Banco de dados', 'Redes', 'Sistemas operacionais']} />
            <Field label="Finalidade *" select={['Compra e aluguel', 'Somente compra', 'Somente aluguel']} />
            <Field label="Origem *" select={['Nacional', 'Importado']} />
            <Field label="Quantidade *" type="number" placeholder="10" />
            <Field label="Preco de venda" placeholder="R$ 120,00" />
            <Field label="Preco de aluguel" placeholder="R$ 18,00" />
            <Field label="Taxa de renovacao" placeholder="R$ 8,00" />
          </div>
          <button type="button" className="mt-5 rounded-md bg-teal-700 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-800">Salvar livro</button>
        </form>
        <SideLists />
      </section>
      <BooksTable />
    </main>
  )
}

function SideLists() {
  return (
    <section className="space-y-4">
      <InfoList title="Mais vendidos e alugados" items={[['Clean Code', '94 saidas'], ['JavaScript Guia', '81 saidas'], ['Redes TCP/IP', '63 saidas']]} />
      <InfoList title="Baixa movimentacao" items={[['Windows Server 2008', '1 saida'], ['Flash Basico', '0 saidas'], ['Delphi Avancado', '0 saidas']]} />
    </section>
  )
}

function InfoList({ title, items }: { title: string; items: string[][] }) {
  return (
    <div className="rounded-md bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm">
        {items.map(([label, value]) => (
          <li key={label} className="flex justify-between gap-3"><span>{label}</span><strong>{value}</strong></li>
        ))}
      </ul>
    </div>
  )
}

function BooksTable() {
  const rows = [
    ['978-85-7608-267-5', 'Banco de Dados Essencial', 'Banco de dados', 'Compra e aluguel', 'Nacional', '18', 'Disponivel', 'bg-green-100 text-green-700'],
    ['978-14-9215-183-6', 'Arquitetura de Redes', 'Redes', 'Aluguel', 'Importado', '4', 'Reservas abertas', 'bg-yellow-100 text-yellow-700'],
    ['978-85-3522-410-0', 'Linux para Servidores', 'Sistemas operacionais', 'Compra', 'Nacional', '22', 'Promocao', 'bg-orange-100 text-orange-700'],
  ]

  return <DataTable title="Acervo" headers={['ISBN', 'Livro', 'Assunto', 'Finalidade', 'Origem', 'Qtd.', 'Status']} rows={rows} />
}

function ClientsPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <PageTitle accent="text-purple-700" title="Cadastro de clientes" onNavigate={onNavigate} />
      <MetricCards columns="md:grid-cols-3" items={[['Clientes cadastrados', '1.675'], ['Mais compraram', '248'], ['Mais alugaram', '312']]} />
      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <form className="rounded-md bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold">Novo cliente</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Nome completo *" placeholder="Nome do cliente" />
            <Field label="Identidade e/ou CPF *" placeholder="000.000.000-00" />
            <Field label="Data de nascimento *" type="date" />
            <Field label="Telefone principal *" type="tel" placeholder="(98) 99999-9999" />
            <Field label="Endereco completo *" placeholder="Rua, numero, bairro, cidade e UF" wide />
            <Field label="E-mail" type="email" placeholder="cliente@email.com" />
            <Field label="Home-page pessoal" type="url" placeholder="https://site.com" />
            <Field label="Outros telefones" placeholder="Comercial, recado ou WhatsApp" wide />
          </div>
          <button type="button" className="mt-5 rounded-md bg-purple-700 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-800">Salvar cliente</button>
        </form>
        <section className="rounded-md bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Prioridade em promocoes</h2>
          <p className="mt-2 text-sm text-gray-600">Clientes com maior historico de compra e aluguel recebem avisos primeiro.</p>
          <ol className="mt-4 space-y-3 text-sm">
            {['Marina Costa|42 compras', 'Rafael Lima|37 alugueis', 'Ana Torres|31 alugueis'].map((item) => {
              const [name, value] = item.split('|')
              return <li key={name} className="flex justify-between gap-3"><span>{name}</span><strong>{value}</strong></li>
            })}
          </ol>
        </section>
      </section>
      <DataTable
        title="Clientes cadastrados"
        headers={['Nome', 'CPF', 'Telefone', 'E-mail', 'Alugueis ativos', 'Perfil']}
        rows={[
          ['Marina Costa', '123.456.789-10', '(98) 98888-1000', 'marina@email.com', '2 de 3', 'Frequente', 'bg-green-100 text-green-700'],
          ['Rafael Lima', '987.654.321-00', '(98) 97777-2000', 'rafael@email.com', '3 de 3', 'Limite atingido', 'bg-yellow-100 text-yellow-700'],
        ]}
      />
    </main>
  )
}

function SalesPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <PageTitle accent="text-teal-700" title="Alugueis, vendas e renovacoes" onNavigate={onNavigate} />
      <MetricCards items={[['Alugueis ativos', '28'], ['Vendas do mes', '127'], ['Renovacoes', '16'], ['Atrasados', '5']]} />
      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <form className="rounded-md bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold">Registrar operacao</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Tipo *" select={['Aluguel', 'Venda', 'Renovacao de aluguel', 'Devolucao']} />
            <Field label="Cliente *" placeholder="Nome ou CPF" />
            <Field label="Livro *" placeholder="ISBN ou nome do livro" />
            <Field label="Quantidade *" type="number" value="1" />
            <Field label="Data de retirada" type="date" />
            <Field label="Data prevista" type="date" />
            <Field label="Valor" placeholder="R$ 18,00" />
            <Field label="Multa ou taxa" placeholder="R$ 0,00" />
          </div>
          <button type="button" className="mt-5 rounded-md bg-teal-700 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-800">Registrar</button>
        </form>
        <section className="rounded-md bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Regras do aluguel</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            {['Maximo de 3 livros por cliente.', 'Prazo de ate 2 semanas.', 'Renovacao cobra taxa por livro.', 'Atraso gera multa na devolucao ou renovacao.'].map((rule) => (
              <li key={rule} className="flex gap-2"><i className="fa-solid fa-circle-check mt-1 text-teal-700" /><span>{rule}</span></li>
            ))}
          </ul>
        </section>
      </section>
      <DataTable
        title="Livros alugados"
        headers={['Cliente', 'Livro', 'Retirada', 'Devolucao', 'Dias restantes', 'Situacao']}
        rows={[
          ['Marina Costa', 'Clean Code', '15/06/2026', '29/06/2026', '7', 'No prazo', 'bg-green-100 text-green-700'],
          ['Rafael Lima', 'Redes TCP/IP', '01/06/2026', '15/06/2026', '-7', 'Multa pendente', 'bg-red-100 text-red-700'],
        ]}
      />
    </main>
  )
}

function ReservationsPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <PageTitle accent="text-green-700" title="Reservas de livros" onNavigate={onNavigate} />
      <MetricCards columns="md:grid-cols-3" items={[['Reservas abertas', '19'], ['Aguardando retirada', '6'], ['Fila media', '3 clientes']]} />
      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <form className="rounded-md bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold">Nova reserva</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Cliente *" placeholder="Nome ou CPF" />
            <Field label="Livro alugado *" placeholder="ISBN ou nome do livro" />
            <Field label="Data da reserva *" type="date" />
            <Field label="Previsao de disponibilidade" type="date" />
            <Field label="Observacao" placeholder="Avisar por telefone, e-mail ou WhatsApp" wide />
          </div>
          <button type="button" className="mt-5 rounded-md bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800">Criar reserva</button>
        </form>
        <section className="rounded-md bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Fila de prioridade</h2>
          <p className="mt-2 text-sm text-gray-600">Quando o exemplar voltar, o primeiro cliente da fila deve ser notificado.</p>
          <div className="mt-4 space-y-3 text-sm">
            <QueueBook title="Arquitetura de Redes" text="3 reservas na fila" />
            <QueueBook title="JavaScript Guia" text="2 reservas na fila" />
          </div>
        </section>
      </section>
      <DataTable
        title="Reservas em andamento"
        headers={['Posicao', 'Cliente', 'Livro', 'Reserva', 'Previsao', 'Status']}
        rows={[
          ['1', 'Ana Torres', 'Arquitetura de Redes', '20/06/2026', '29/06/2026', 'Aguardando devolucao', 'bg-yellow-100 text-yellow-700'],
          ['2', 'Bruno Silva', 'Arquitetura de Redes', '21/06/2026', '29/06/2026', 'Na fila', 'bg-gray-100 text-gray-700'],
        ]}
      />
    </main>
  )
}

function QueueBook({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-md border border-gray-200 p-3">
      <strong>{title}</strong>
      <p className="mt-1 text-gray-600">{text}</p>
    </div>
  )
}

function DataTable({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return (
    <section className="mt-6 rounded-md bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-3 py-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row) => (
              <tr key={row.slice(0, -2).join('-')}>
                {row.slice(0, -2).map((cell) => (
                  <td key={cell} className="px-3 py-3">{cell}</td>
                ))}
                <td className="px-3 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${row[row.length - 1]}`}>{row[row.length - 2]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default App
