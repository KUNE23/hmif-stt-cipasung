import { divisions } from '~/data/divisions'

export function useDivisions() {
  const getAll = () => divisions.filter((division) => division.landingFeatured !== false)
  const getAllProfiles = () => divisions
  const getStructureDivisions = () => divisions
  const getBySlug = (slug) => divisions.find((division) => division.slug === slug)

  return { getAll, getAllProfiles, getStructureDivisions, getBySlug }
}
