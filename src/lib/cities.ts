// Reaproveita a mesma lista de cidades usada no formulário do Sanity Studio,
// assim o site e o painel de administração nunca ficam dessincronizados.
export { CITY_OPTIONS } from '../../schemas/property'

import { CITY_OPTIONS } from '../../schemas/property'

export function citySlugToLabel(slug: string) {
  const found = CITY_OPTIONS.find((c) => c.value === slug)
  if (found) return found.title

  // Fallback caso a cidade não esteja (ainda) na lista fixa
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
