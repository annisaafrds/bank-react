import React, {Component} from "react";
export default class Logout extends Component{
  render(){
    localStorage.removeItem("nama");
    localStorage.removeItem("hakakses");
    window.location.href="./";
    return(
      <></>
    )
  }
}
