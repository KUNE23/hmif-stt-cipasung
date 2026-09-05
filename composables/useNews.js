import { newsItems } from '~/data/news'

export function useNews() {
  const getAll = () => newsItems
  const getBySlug = (slug) => newsItems.find((item) => item.slug === slug)
  const getLatest = (limit = 3) => [...newsItems]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)

  return { getAll, getBySlug, getLatest }
}
