import React, { Component } from "react";
// import './style.css';
import '../../../style.css';
import DataTable, {
  createTheme,
  defaultThemes,
} from "react-data-table-component";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CButton,
} from '@coreui/react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {Link } from "react-router-dom";

class InputBankMaster  extends Component{
    constructor(props) {
      super(props);
      this.state = {
          nama: '',
          noTelp: '',
          alamat: ''
      }
    }

    handleInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

  handleSubmit(e) {
      e.preventDefault();

      const newBnk = {
          nama: this.state.nama,
          noTelp: this.state.noTelp,
          alamat: this.state.alamat
      }

      this.setState({
        newBankMaster: newBnk,
          listBankMaster: [...this.state.listBankMaster, newBnk]
      });
  }

  render() {
    return (
      <div className='container'>
        <h3>Add Data Bank Master</h3>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='nama'>Nama</label>
            <input type='text' className='form-control' id='nama' value={this.state.nama} onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='noTelp'>No Telepon</label>
            <input type='text' className='form-control' id='noTelp' value={this.state.noTelp} onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='alamat'>Alamat</label>
            <input type='text' className='form-control' id='alamat' value={this.state.alamat} onChange={this.handleInputChange} />
          </div>

          <div className="mt-3">
            <Button className="button-save" type='submit' label="Save" severity="primary" onClick={(e) => this.handleSubmit(e)} />
            <Link to='/bankadm/bankMaster/'>
              <Button label="Batal" severity="secondary" />
            </Link>
          </div>

        </form>
      </div>
    )
  }
}
export default InputBankMaster;
