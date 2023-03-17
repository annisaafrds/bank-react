import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const MstPlg = React.lazy(() => import('./views/tlpadm/mst_plg/mst_plg'))
const InputPelanggan = React.lazy(() => import('./views/tlpadm/mst_plg/InputPelanggan'))
const EditPelanggan = React.lazy(() => import('./views/tlpadm/mst_plg/InputPelanggan'))
const inputBankMaster = React.lazy(() => import('./views/bnkadm/bankMaster/inputBankMaster'))
const InputTransaksiTelkom = React.lazy(() => import('./views/tlpadm/trtelkom/InputTransaksiTelkom'))
const EditTransaksiTelkom = React.lazy(() => import('./views/tlpadm/trtelkom/InputTransaksiTelkom'))
const Setor = React.lazy(() => import('./views/nasabah/setor-tunai/Setor'))
const Cek = React.lazy(() => import('./views/nasabah/cek-saldo/cek-saldo'))
const bankMaster = React.lazy(() => import('./views/bnkadm/bankMaster/bankMaster.js'))
const Trnasabah = React.lazy(() => import('./views/bnkadm/trksinasabah/trnasabah.js'))
const Transfer = React.lazy(() => import('./views/nasabah/transfer/transfer'))
const TransaksiTelkom = React.lazy(() => import('./views/tlpadm/trtelkom/TransaksiTelkom'))
const HistoryTelkom = React.lazy(() => import('./views/tlpadm/histtelkom/HistoryTelkom'))
const Ambil = React.lazy(() => import('./views/nasabah/ambil/ambil'))
const InputAmbil = React.lazy(() => import('./views/nasabah/ambil/InputAmbil.js'))
const HistoryAmbil = React.lazy(() => import('./views/bnkadm/history-transaksi/ambil/ambil.js'))
const BayarTelepon = React.lazy(() => import('./views/nasabah/bayar-telepon/bayar-telepon'))
const HistorySetor = React.lazy(() => import('./views/bnkadm/history-transaksi/history-setor/historySetor.js'))
const HistoryTransfer = React.lazy(() => import('./views/bnkadm/history-transaksi/transfer/transfer.js'))
const HistoryTelp = React.lazy(() => import('./views/bnkadm/history-transaksi/bayar-telepon/telp.js'))
const InputNasabah = React.lazy(() => import('./views/bnkadm/trksinasabah/InputNasabah.js'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/nsbh/setor', name: 'Setor Tunai', element: Setor },
  { path: '/nsbh/cek', name: 'Cek Saldo', element: Cek },
  { path: '/nsbh/ambil', name: 'Ambil Tunai', element: Ambil },
  { path: '/nsbh/bayar-telepon', name: 'Bayar Telepon', element: BayarTelepon },
  { path: '/tlpadm/mst_plg', name: 'Master Pelanggan', element: MstPlg },
  { path: '/tlpadm/mst_plg/InputPelanggan', name: 'Tambah Pelanggan', element: InputPelanggan },
  { path: '/tlpadm/mst_plg/InputPelanggan/:id', name: 'Edit Pelanggan', element: EditPelanggan },
  { path: '/bnk_adm/mst_bnk/', name: 'Master Bank', element: bankMaster },
  { path: '/bnk_adm/trksi_nsbh', name: 'Transaksi Nasabah', element: Trnasabah },
  { path: '/nsbh/transfer', name: 'Transfer', element: Transfer },
  { path: '/tlpadm/trksi_tlkm', name: 'Transaksi Telkom', element: TransaksiTelkom },
  { path: '/tlpadm/trksi_tlkm/inputTransaksiTelkom', name: 'Tambah Transaksi Telkom', element: InputTransaksiTelkom },
  { path: '/tlpadm/trksi_tlkm/inputTransaksiTelkom/:id', name: 'Edit Transaksi Telkom', element: EditTransaksiTelkom },
  { path: '/tlpadm/hist_trksi', name: 'History Telkom', element: HistoryTelkom },
  { path: '/nasabah/ambil', name: 'Ambil Tunai', element: Ambil },
  { path: '/nasabah/ambil/InputAmbil/:id', name: 'Input Saldo', element: InputAmbil },
  { path: '/trksi_hist_nsbh/ambil', name: 'Ambil', element: HistoryAmbil },
  { path: '/trksi_hist_nsbh/setor', name: 'Setor', element: HistorySetor },
  { path: '/trksi_hist_nsbh/transfer', name: 'Transfer', element: HistoryTransfer },
  { path: '/trksi_hist_nsbh/bayartlp', name: 'Bayar Telepon', element: HistoryTelp },
  // '/trksi_hist_nsbh/bayartlp'
  // { path: '/bnkadm/bankMaster', name: 'Master Bank', element: MstPlg },
  { path: '/bnkadm/bankMaster/inputBankMaster', name: 'Add Data Bank Master', element: inputBankMaster },
  { path: '/bnkadm/trksinasabah/InputNasabah', name: 'Tambah Nasabah', element: InputNasabah },

]

export default routes
