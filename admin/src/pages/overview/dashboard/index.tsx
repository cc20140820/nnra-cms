import React from 'react'
import i18next from '@/i18n'
import { Card } from 'antd'
import { BasicPageWrapper } from '@/components'

const App: React.FC = () => {
  const year = '2024'
  const month = '11'
  const day = '12'

  const str = i18next.t('prefix.18ba27b5' /* 今天是{{year}}年{{month}}月{{day}}日 */, { year, month, day })

  return (
    <BasicPageWrapper title={'title'} desc='ssds'>
      <Card>{str}</Card>
      <Card>{i18next.t('prefix.3bf8b7db' /* 仪表盘 */)}</Card>
      <Card>{i18next.t('prefix.5c2aa628' /* 菜单 */)}</Card>
    </BasicPageWrapper>
  )
}
export default App
