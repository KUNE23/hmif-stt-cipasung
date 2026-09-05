import { galleryItems } from '~/data/gallery'

export function useGallery() {
  const getAll = () => galleryItems
  const getById = (id) => galleryItems.find((item) => item.id === id)

  return { getAll, getById }
}
