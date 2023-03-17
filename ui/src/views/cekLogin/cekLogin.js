import React, { Component } from 'react';
export default class cekLogin extends Component
{
  loginCek() {
    if (!localStorage.getItem("nama"))
    {
    window.location="#/login"
      //history.push('/beranda');

    }

  }

}
