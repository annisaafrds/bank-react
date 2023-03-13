import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilLockLocked,
  cilUser,
  cilListRich,
  cilBank,
  cilCalendar,
  cilPeople,
  cilSwapHorizontal,
  cilHistory,
  cilMoney,
  cilWallet,
  cilArrowTop,
  cilPhone,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Hak Akses',
    to: '/hak_akses',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sub Menu',
    to: '/sub_menu',
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'BANK ADM',
  },
  {
    component: CNavItem,
    name: 'Master Bank',
    to: '/bnk_adm/mst_bnk/',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'History Bank',
    to: '/bnk_adm/hstry_bnk/',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'TLPADM',
  },
  {
    component: CNavItem,
    name: 'Master Telkom',
    to: '/tlpadm/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Laporan Penunggakan',
    to: '/tlpadm/',
    icon: <CIcon icon={cilSwapHorizontal} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Laporan Pelunasan',
    to: '/tlpadm/',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'NASABAH',
  },
  {
    component: CNavItem,
    name: 'Cek Saldo ',
    to: '/nsbh/',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Setor Tunai',
    to: '/nsbh/',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Tarik Tunai',
    to: '/nsbh/',
    icon: <CIcon icon={cilArrowTop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transfer',
    to: '/nsbh/',
    icon: <CIcon icon={cilSwapHorizontal} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bayar Telepon',
    to: '/nsbh/',
    icon: <CIcon icon={cilPhone} customClassName="nav-icon" />,
  },
]

export default _nav
