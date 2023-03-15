import React, { Component } from "react";
import './style.css';
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

class InputTransaksiTelkom  extends Component{
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
        <h3>Tambah Transaksi Telkom</h3>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='pelanggan'>Pelanggan</label>
            <input type='text' className='form-control' id='nama' value={this.state.nama} onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='bulanTagihan'>Bulan Tagihan</label>
            <input type='text' className='form-control' id='bulanTagihan' value={this.state.bulanTagihan} onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='tahunTagihan'>Tahun Tagihan</label>
            <input type='text' className='form-control' id='tahunTagihan' value={this.state.tahunTagihan} onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='uang'>Uang</label>
            <input type='text' className='form-control' id='uang' value={this.state.uang} onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <input type='text' className='form-control' id='status' value={this.state.status} onChange={this.handleInputChange} />
          </div>
          <div className="mt-3">
            <Button className="button-save" type='submit' label="Save" severity="primary" onClick={(e) => this.handleSubmit(e)} />
            <Link to='/tlpadm/trksi_tlkm'>
              <Button label="Batal" severity="secondary" />
            </Link>
          </div>

        </form>
      </div>
    )
  }
}
export default InputTransaksiTelkom;

