import { members } from '~/data/members'

export function useMembers() {
  const isDivisionHead = (member) => member.role === 'Ketua Divisi' || member.role === 'Kepala Divisi'
  const getAll = () => members
  const getBySlug = (slug) => members.find((member) => member.slug === slug)
  const getByDivision = (divisionSlug) => members.filter((member) => member.divisionSlug === divisionSlug)
  const getDivisionHead = (divisionSlug) => members.find(
    (member) => member.divisionSlug === divisionSlug && isDivisionHead(member),
  )
  const getDivisionStaff = (divisionSlug) => members.filter(
    (member) => member.divisionSlug === divisionSlug && !isDivisionHead(member),
  )
  const getCoreMembers = () => members.filter((member) => member.group === 'bpi')

  return { getAll, getBySlug, getByDivision, getDivisionHead, getDivisionStaff, getCoreMembers }
}
