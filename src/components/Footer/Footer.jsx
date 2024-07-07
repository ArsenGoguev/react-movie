import React from 'react'
import { Pagination } from 'antd'
import './footer.css'

export default function Footer() {
  // async function onChangePage(choosedPage) {
  //   const page = await fetch()
  // }

  return (
    <footer className="footer">
      <Pagination className="footer__pagination" defaultCurrent={1} total={11} align="center" />
    </footer>
  )
}
