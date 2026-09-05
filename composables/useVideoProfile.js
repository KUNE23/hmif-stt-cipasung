import { videoProfileData } from '~/data/videoProfile'

export const useVideoProfile = () => {
  const getVideoProfile = () => videoProfileData

  return { getVideoProfile }
}
