import React from 'react'
import { Tabs } from 'antd'

export default function TabMenu() {
  return (
    <Tabs
      style={{ marginBottom: 10 }}
      centered
      items={[
        {
          label: 'Search',
          key: '1',
        },
        {
          label: 'Rates',
          key: '2',
        },
      ]}
    />
  )
}
