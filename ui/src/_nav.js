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
  cilMenu,
  cilSpreadsheet,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'USER ADM',
  },
  {
    component: CNavItem,
    name: 'Role',
    to: '/role',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Role Menu',
    to: '/role_menu',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Menu',
    to: '/menu',
    icon: <CIcon icon={cilMenu} customClassName="nav-icon" />,
  },
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
    component: CNavItem,
    name: 'Transaksi Nasabah',
    to: '/bnk_adm/trksi_nsbh/',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'History Transaksi Nasabah',
    to: '/bnk_adm/trksi_hist_nsbh/',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'TLPADM',
  },
  {
    component: CNavItem,
    name: 'Master Pelanggan',
    to: '/tlpadm/mst_plg/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transaksi Telkom',
    to: '/tlpadm/trksi_tlkm/',
    icon: <CIcon icon={cilSwapHorizontal} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'History Transaksi',
    to: '/tlpadm/hist_trksi/',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'NASABAH',
  },
  {
    component: CNavItem,
    name: 'Cek Saldo ',
    to: '/nsbh/cek',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Setor Tunai',
    to: '/nsbh/setor',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Ambil Tunai',
    to: '/nsbh/ambil/',
    icon: <CIcon icon={cilArrowTop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transfer',
    to: '/nsbh/transfer',
    icon: <CIcon icon={cilSwapHorizontal} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bayar Telepon',
    to: '/nsbh/bayar-telepon/',
    icon: <CIcon icon={cilPhone} customClassName="nav-icon" />,
  },
]

export default _nav
