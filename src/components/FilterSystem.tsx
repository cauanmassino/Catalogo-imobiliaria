import { useMemo, useState } from 'react';
import { ChevronDown, SlidersHorizontal, RotateCcw, Search, KeyRound } from 'lucide-react';
import type { Property } from '../lib/sanity';

interface FilterSystemProps {
  properties: Property[];
  onFilterChange?: (filtered: Property[]) => void;
}

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'newest';

export default function FilterSystem({ properties, onFilterChange }: FilterSystemProps) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'all' | 'venda' | 'aluguel'>('all');
  const [bedrooms, setBedrooms] = useState<'all' | '1' | '2' | '3' | '4+'>('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState<SortOption>('relevance');
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...properties];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((p) =>
        [p.title, p.city, p.neighborhood, p.type]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(q)
      );
    }

    if (type !== 'all') result = result.filter((p) => p.type === type);

    if (bedrooms !== 'all') {
      result = result.filter((p) => {
        if (bedrooms === '4+') return (p.bedrooms ?? 0) >= 4;
        return String(p.bedrooms ?? '') === bedrooms;
      });
    }

    if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.reverse();
        break;
      default:
        break;
    }

    return result;
  }, [properties, query, type, bedrooms, minPrice, maxPrice, sort]);

  if (onFilterChange) {
    onFilterChange(filtered);
  }

  const clearFilters = () => {
    setQuery('');
    setType('all');
    setBedrooms('all');
    setMinPrice('');
    setMaxPrice('');
    setSort('relevance');
    setOpen(false);
  };

  const hasActiveFilters =
    query || type !== 'all' || bedrooms !== 'all' || minPrice || maxPrice || sort !== 'relevance';

  return (
    <section className="rounded-[1.75rem] border border-mist bg-paper shadow-[0_14px_36px_rgba(22,21,19,0.06)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate mb-1">Filtrar</p>
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink">Encontre com mais precisão</h2>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-mist bg-white px-4 py-2 text-sm font-medium text-ink">
          <SlidersHorizontal size={16} />
          {open ? 'Fechar' : 'Abrir'}
        </span>
      </button>

      <div className={`grid overflow-hidden transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="min-h-0">
          <div className="border-t border-mist px-4 sm:px-6 py-4 sm:py-6">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-slate">Busca</span>
                <div className="flex items-center gap-2 rounded-[1.1rem] border border-mist bg-white px-4 py-3">
                  <Search size={16} className="text-slate shrink-0" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cidade, bairro ou tipo"
                    className="w-full bg-transparent outline-none text-sm text-ink placeholder:text-slate/70"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-slate">Tipo</span>
                <div className="grid grid-cols-2 rounded-[1.1rem] border border-mist bg-white p-1">
                  {[
                    { key: 'all', label: 'Tudo' },
                    { key: 'venda', label: 'Venda' },
                    { key: 'aluguel', label: 'Aluguel' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setType(item.key as typeof type)}
                      className={`rounded-[0.9rem] px-3 py-2 text-sm font-medium transition-colors ${
                        type === item.key ? 'bg-ink text-white shadow-sm' : 'text-slate hover:text-ink'
                      } ${item.key === 'all' ? 'col-span-2' : ''}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-slate">Quartos</span>
                <div className="flex items-center rounded-[1.1rem] border border-mist bg-white px-4 py-3">
                  <KeyRound size={16} className="text-slate mr-2 shrink-0" />
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value as typeof bedrooms)}
                    className="w-full bg-transparent outline-none text-sm text-ink"
                  >
                    <option value="all">Todos</option>
                    <option value="1">1 quarto</option>
                    <option value="2">2 quartos</option>
                    <option value="3">3 quartos</option>
                    <option value="4+">4+ quartos</option>
                  </select>
                </div>
              </label>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_0.7fr]">
              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-slate">Preço mínimo</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Ex.: 800000"
                  className="w-full rounded-[1.1rem] border border-mist bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-slate/70"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-slate">Preço máximo</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Ex.: 3500000"
                  className="w-full rounded-[1.1rem] border border-mist bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-slate/70"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-slate">Ordenar</span>
                <div className="flex items-center rounded-[1.1rem] border border-mist bg-white px-4 py-3">
                  <ChevronDown size={16} className="text-slate mr-2 shrink-0" />
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="w-full bg-transparent outline-none text-sm text-ink"
                  >
                    <option value="relevance">Relevância</option>
                    <option value="newest">Mais recentes</option>
                    <option value="price-asc">Menor preço</option>
                    <option value="price-desc">Maior preço</option>
                  </select>
                </div>
              </label>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-slate">
                {filtered.length} resultado{filtered.length === 1 ? '' : 's'} encontrado{filtered.length === 1 ? '' : 's'}
              </p>

              <div className="flex items-center gap-3">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 rounded-full border border-mist bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface"
                  >
                    <RotateCcw size={14} />
                    Limpar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}