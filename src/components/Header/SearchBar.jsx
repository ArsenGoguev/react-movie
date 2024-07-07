import React from 'react'
import { Form, Input } from 'antd'
import './searchBar.css'

export default function SearchBar() {
  return (
    <Form className="search-bar">
      <Input placeholder="Type to search..." />
    </Form>
  )
}
