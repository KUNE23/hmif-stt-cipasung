import { programs } from '~/data/programs'

export function usePrograms() {
  const getAll = () => programs
  const getBySlug = (slug) => programs.find((program) => program.slug === slug)
  const getByDivision = (divisionSlug) => programs.filter((program) => program.divisionSlug === divisionSlug)

  return { getAll, getBySlug, getByDivision }
}
