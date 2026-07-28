// Lista de regiões usada pelo SITE (Astro). Precisa ser uma cópia própria,
// separada da lista usada no Studio (schemas/property.ts) — importar o
// arquivo do Studio aqui quebra o build, porque ele usa defineField/defineType
// do pacote "sanity", que só funciona dentro do ambiente do Studio, não no
// site. Ao adicionar uma região nova, atualize as DUAS listas:
// 1. Aqui (src/lib/cities.ts) — pro site exibir o nome certo
// 2. schemas/property.ts (CITY_OPTIONS) — pro dropdown do Studio
export const CITY_OPTIONS = [
  { title: 'Asa Sul', value: 'asa-sul' },
  { title: 'Asa Norte', value: 'asa-norte' },
  { title: 'Águas Claras', value: 'aguas-claras' },
  { title: 'Ceilândia', value: 'ceilandia' },
  { title: 'Guará', value: 'guara' },
  { title: 'Taguatinga', value: 'taguatinga' },
  { title: 'Samambaia', value: 'samambaia' },
  { title: 'Lago Sul', value: 'lago-sul' },
  { title: 'Lago Norte', value: 'lago-norte' },
  { title: 'Sudoeste/Octogonal', value: 'sudoeste' },
  { title: 'Noroeste', value: 'noroeste' },
  { title: 'Cruzeiro', value: 'cruzeiro' },
  { title: 'Riacho Fundo', value: 'riacho-fundo' },
  { title: 'Vicente Pires', value: 'vicente-pires' },
  { title: 'Jardim Botânico', value: 'jardim-botanico' },
]

export function citySlugToLabel(slug: string) {
  const found = CITY_OPTIONS.find((c) => c.value === slug)
  if (found) return found.title

  // Fallback caso a região não esteja (ainda) na lista fixa
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}