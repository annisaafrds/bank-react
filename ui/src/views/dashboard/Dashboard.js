import React from 'react'

import { Image } from 'primereact/image';

import dashboard from 'src/assets/images/dashboard.png'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

import './style.css'

const Dashboard = () => {

  return (
    <>
      <body className="hero-body">
        <div className="row">
          <div className="hero-group relative">
            <h1 className="hero">SELAMAT DATANG DI BANK <span>XYZ</span></h1>
            <h6 className="subhero">Kepuasan nasabah adalah prioritas kami</h6>
          </div>
          <div className='hero-image'>
            <div>
              <Image src={dashboard} alt="" className="img-hero absolute bg-center w-max" />
            </div>
          </div>
        </div>
      </body>
    </>
  )
}

export default Dashboard
