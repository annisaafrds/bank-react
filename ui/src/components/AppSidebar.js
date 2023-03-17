import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CImage, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import CImage from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'

import logo from './../assets/brand/logo.png'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  // const logo = '../assets/brand/logo.png'

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex d-lg-flex" to="/">
        <CImage className="sidebar-brand-full" src={logo} width={50} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {localStorage.getItem("nama")?<AppSidebarNav items={navigation} />:''}
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-md-flex d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
    /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
