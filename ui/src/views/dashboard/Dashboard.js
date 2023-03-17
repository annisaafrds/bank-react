import React from 'react'

import { Image } from 'primereact/image';

import dashboard from 'src/assets/images/dashboard.png'
// import { Map } from 'immutable';

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import cekLogin from '../cekLogin/cekLogin';
import './style.css'

const Dashboard = () => {
  let logincek=new cekLogin()
  logincek.loginCek();
  //loginCek();
  var hakaksess=JSON.parse(localStorage.getItem('hakakses'))

  return (
    <body>
      <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
            <span className="block text-6xl font-bold mb-1">Welcome to <span className="text-6xl text-primary font-bold mb-3">Bank Ogya</span></span>
            <p className="mt-0 mb-4 text-700 line-height-3">Hai <b>{localStorage.getItem("nama")}</b> <br/> ROLE anda: Admin All Role<br/><b>

            {hakaksess.map((hakakses, i) => (
            <>
            -<label>{hakakses.ROLE.NAMA}</label>
            <br/>
            </>

            ))
            }

              </b></p>
          </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden">
          <img src={dashboard} alt="hero-1" className="md:ml-auto block md:h-screen" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
        </div>
      </div>
    </body>

  )
}

export default Dashboard
