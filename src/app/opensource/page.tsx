import { openSourceItems } from '@/data/opensource'
import OpenSourceListClient from '@/components/OpenSourceListClient'

export const metadata = {
  title: 'Open Source | Pulkit Saraf',
  description: 'Open source projects and contributions by Pulkit Saraf',
}

export default function OpenSourcePage() {
  return <OpenSourceListClient items={openSourceItems} />
}
