import React from 'react'

const MstPlg = React.lazy(() => import('./views/tlpadm/mst_plg/mst_plg'))
const Setor = React.lazy(() => import('./views/nasabah/setor-tunai/Setor'))
const Cek = React.lazy(() => import('./views/nasabah/cek-saldo/cek-saldo'))
const Trnasabah = React.lazy(() => import('./views/bnkadm/trksinasabah/trnasabah.js'))
const Transfer = React.lazy(() => import('./views/nasabah/transfer/transfer.js'))
const TransaksiTelkom = React.lazy(() => import('./views/tlpadm/trtelkom/TransaksiTelkom'))
const HistoryTelkom = React.lazy(() => import('./views/tlpadm/histtelkom/HistoryTelkom'))
const Ambil = React.lazy(() => import('./views/nasabah/ambil/ambil'))
const HistoryAmbil = React.lazy(() => import('./views/bnkadm/history-transaksi/ambil/ambil.js'))
const HistorySetor = React.lazy(() => import('./views/bnkadm/history-transaksi/history-setor/historySetor.js'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/nsbh/setor', name: 'Setor Tunai', element: Setor },
  { path: '/nsbh/cek', name: 'Cek Saldo', element: Cek },
  { path: '/nsbh/ambil', name: 'Ambil Tunai', element: Ambil },
  { path: '/tlpadm/mst_plg', name: 'Master Pelanggan', element: MstPlg },
  { path: '/bnk_adm/trksi_nsbh', name: 'Transaksi Nasabah', element: Trnasabah },
  { path: '/nsbh/transfer', name: 'Transfer', element: Transfer },
  { path: '/tlpadm/trksi_tlkm', name: 'Transaksi Telkom', element: TransaksiTelkom },
  { path: '/tlpadm/hist_trksi', name: 'History Telkom', element: HistoryTelkom },
  { path: '/trksi_hist_nsbh', name: 'trksi_hist_nsbh', element: Ambil, exact: true },
  { path: '/trksi_hist_nsbh/ambil', name: 'Ambil', element: HistoryAmbil },
  { path: '/trksi_hist_nsbh/setor', name: 'Setor', element: HistorySetor },
]

export default routes
