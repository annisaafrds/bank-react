import React from 'react'

import { Image } from 'primereact/image';

import dashboard from 'src/assets/images/dashboard.png'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

import './style.css'

const Dashboard = () => {

  return (
    <body>
      <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
            <span className="block text-6xl font-bold mb-1">Welcome to <span className="text-6xl text-primary font-bold mb-3">Bank Ogya</span></span>
            <p className="mt-0 mb-4 text-700 line-height-3">apa ya, gatau dah.</p>
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
