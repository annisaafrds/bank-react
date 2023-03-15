import React, { Component } from "react";
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

class InputPelanggan  extends Component{
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

      const newPlg = {
          nama: this.state.nama,
          noTelp: this.state.noTelp,
          alamat: this.state.alamat
      }

      this.setState({
        newPelanggan: newPlg,
          listPelanggan: [...this.state.listPelanggan, newPlg]
      });
  }

  render() {
    return (
      <div className='container'>
        <h3>Tambah Pelanggan</h3>
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
          <button type='submit' className='btn btn-primary' onClick={(e) => this.handleSubmit(e)}>Submit</button>
          <Link to='/tlpadm/mst_plg'>
            <Button label="Batal" className="p-button-secondary" />
          </Link>
        </form>
      </div>
    )
  }
}
export default InputPelanggan;

