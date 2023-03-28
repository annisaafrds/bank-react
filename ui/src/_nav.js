import React from 'react'
import CIcon from '@coreui/icons-react'
/*import {
  cilLockLocked,
  cilAccountLogout,
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
*/
import *   as icon from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
function GetSortOrder(prop) {    
  return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return 1;    
      } else if (a[prop] < b[prop]) {    
          return -1;    
      }    
      return 0;    
  }    
}
/*
const funcIcon=(strIcon)=>
{
  //console.log(cilAccountLogout)
//if(strIcon==="cilAccountLogout") return cilAccountLogout;else return;


switch(strIcon) {
  case "cilAccountLogout":
    return cilAccountLogout;
  case "cilLockLocked":
    return cilLockLocked;
  case "cilUser":
      return cilUser;
  case "cilListRich":
      return cilListRich;
  case "cilBank":
      return cilBank;
  case "cilCalendar":
      return cilCalendar;
  case "cilPeople":
      return cilPeople;
  case "cilSwapHorizontal":
      return cilSwapHorizontal;
  case "cilHistory":
      return cilHistory;  
  case "cilMoney":
      return cilMoney;  
  case "cilWallet":
      return cilWallet;  
 case "cilArrowTop":
      return cilArrowTop;  
case "cilPhone":
      return cilPhone;  
case "cilMenu":
      return cilMenu;  
case "cilSpreadsheet":
      return cilSpreadsheet;  
  
  default:
    return ;
}




}
*/
let hakaksess=[];
let role=[];
let a1=123;
let icon1=icon
//alert(eval("icon1.cilAccountLogout"))
//cilAccountLogout1=eval("cilAccountLogout")
if(localStorage['hakakses'])
{
  var _nav = [
    {
      component: CNavItem,
      name: 'Logout',
      to: '/logout',
      icon: <><CIcon icon={icon1.cilAccountLogout} customClassName="nav-icon" /></>,
    }
  ]
  
  hakaksess=JSON.parse(localStorage['hakakses']);
  hakaksess.sort(GetSortOrder("role_id"));
  
  hakaksess.map((hakakses,index)=>{
    _nav.push(
      {
        component: CNavTitle,
        name: hakakses.ROLE.NAMA,
      });

      hakakses.ROLE.ROLES_MENUs.map((ROLE_MENU,indexRm)=>{
/**/ 
      if(ROLE_MENU.MENU.nama==='historyBank')
      {

        _nav.push(

          {
            component: CNavGroup,
            name: ROLE_MENU.MENU.program_name,
            to: ROLE_MENU.MENU.program_name,
            icon: <CIcon icon={eval("icon1."+ROLE_MENU.MENU.icon)} customClassName="nav-icon" />,
            items: [
              {
                component: CNavItem,
                name: 'Setor',
                to: '/trksi_hist_nsbh/setor',
              },
              {
                component: CNavItem,
                name: 'Ambil',
                to: '/trksi_hist_nsbh/ambil',
              },
              {
                component: CNavItem,
                name: 'Transfer',
                to: '/trksi_hist_nsbh/transfer',
              },
              {
                component: CNavItem,
                name: 'Bayar Telepon',
                to: '/trksi_hist_nsbh/bayartlp',
              },
            ]
          }

          );
      }else
      {
        _nav.push(
          
          {
            component: CNavItem,
            name: ROLE_MENU.MENU.program_name,
            to: ROLE_MENU.MENU.url,
            icon: <CIcon icon={eval("icon1."+ROLE_MENU.MENU.icon)} customClassName="nav-icon" />,
          });

      }
            

      })  
    
  
  
  })
  



}


/*
,
  ,
  {
    component: CNavItem,
    name: 'Role',
    to: '/role',
    icon: <CIcon icon={funcIcon("cilUser")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Role Menu',
    to: '/role_menu',
    icon: <CIcon icon={funcIcon("cilSpreadsheet")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Menu',
    to: '/menu',
    icon: <CIcon icon={funcIcon("cilMenu")} customClassName="nav-icon" />,
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
    icon: <CIcon icon={funcIcon("cilPeople")} customClassName="nav-icon" />,
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
    icon: <CIcon icon={funcIcon("cilCalendar")} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'History Transaksi',
    to: '/trksi_hist_nsbh',
    icon: <CIcon icon={funcIcon("cilHistory")} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Setor',
        to: '/trksi_hist_nsbh/setor',
      },
      {
        component: CNavItem,
        name: 'Ambil',
        to: '/trksi_hist_nsbh/ambil',
      },
      {
        component: CNavItem,
        name: 'Transfer',
        to: '/trksi_hist_nsbh/transfer',
      },
      {
        component: CNavItem,
        name: 'Bayar Telepon',
        to: '/trksi_hist_nsbh/bayartlp',
      },
    ]
  },
  {
    component: CNavTitle,
    name: 'TLPADM',
  },
  {
    component: CNavItem,
    name: 'Master Pelanggan',
    to: '/tlpadm/mst_plg/',
    icon: <CIcon icon={funcIcon("cilUser")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transaksi Telkom',
    to: '/tlpadm/trksi_tlkm/',
    icon: <CIcon icon={funcIcon("cilSwapHorizontal")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'History Transaksi',
    to: '/tlpadm/hist_trksi/',
    icon: <CIcon icon={funcIcon("cilHistory")} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'NASABAH',
  },
  {
    component: CNavItem,
    name: 'Cek Saldo ',
    to: '/nsbh/cek',
    icon: <CIcon icon={funcIcon("cilWallet")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Setor Tunai',
    to: '/nsbh/setor',
    icon: <CIcon icon={funcIcon("cilMoney")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Ambil Tunai',
    to: '/nasabah/ambil',
    icon: <CIcon icon={funcIcon("cilArrowTop")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transfer',
    to: '/nsbh/transfer',
    icon: <CIcon icon={funcIcon("cilSwapHorizontal")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bayar Telepon',
    to: '/nsbh/bayar-telepon/',
    icon: <CIcon icon={funcIcon("cilPhone")} customClassName="nav-icon" />,
  },
*/

/*
const _nav = [
  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout',
    icon: <><CIcon icon={funcIcon("cilAccountLogout")} customClassName="nav-icon" /></>,
  },
  {
    component: CNavTitle,
    name: 'USER ADM',
  },
  {
    component: CNavItem,
    name: 'Role',
    to: '/role',
    icon: <CIcon icon={funcIcon("cilUser")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Role Menu',
    to: '/role_menu',
    icon: <CIcon icon={funcIcon("cilSpreadsheet")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Menu',
    to: '/menu',
    icon: <CIcon icon={funcIcon("cilMenu")} customClassName="nav-icon" />,
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
    icon: <CIcon icon={funcIcon("cilPeople")} customClassName="nav-icon" />,
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
    icon: <CIcon icon={funcIcon("cilCalendar")} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'History Transaksi',
    to: '/trksi_hist_nsbh',
    icon: <CIcon icon={funcIcon("cilHistory")} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Setor',
        to: '/trksi_hist_nsbh/setor',
      },
      {
        component: CNavItem,
        name: 'Ambil',
        to: '/trksi_hist_nsbh/ambil',
      },
      {
        component: CNavItem,
        name: 'Transfer',
        to: '/trksi_hist_nsbh/transfer',
      },
      {
        component: CNavItem,
        name: 'Bayar Telepon',
        to: '/trksi_hist_nsbh/bayartlp',
      },
    ]
  },
  {
    component: CNavTitle,
    name: 'TLPADM',
  },
  {
    component: CNavItem,
    name: 'Master Pelanggan',
    to: '/tlpadm/mst_plg/',
    icon: <CIcon icon={funcIcon("cilUser")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transaksi Telkom',
    to: '/tlpadm/trksi_tlkm/',
    icon: <CIcon icon={funcIcon("cilSwapHorizontal")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'History Transaksi',
    to: '/tlpadm/hist_trksi/',
    icon: <CIcon icon={funcIcon("cilHistory")} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'NASABAH',
  },
  {
    component: CNavItem,
    name: 'Cek Saldo ',
    to: '/nsbh/cek',
    icon: <CIcon icon={funcIcon("cilWallet")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Setor Tunai',
    to: '/nsbh/setor',
    icon: <CIcon icon={funcIcon("cilMoney")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Ambil Tunai',
    to: '/nasabah/ambil',
    icon: <CIcon icon={funcIcon("cilArrowTop")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transfer',
    to: '/nsbh/transfer',
    icon: <CIcon icon={funcIcon("cilSwapHorizontal")} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bayar Telepon',
    to: '/nsbh/bayar-telepon/',
    icon: <CIcon icon={funcIcon("cilPhone")} customClassName="nav-icon" />,
  },
]
*/
export default _nav
