import React, { Component } from "react";
import { InputText } from "primereact/inputtext";

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
        norek: '',
          nama: '',
          noTelp: '',
          alamat: '',
          saldo: '',
          // isEdit: false,

      }
    }

    handleInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

  handleSubmit(e) {
      e.preventDefault();

      const newBnk = {
        norek: this.state.norek,
          nama: this.state.nama,
          noTelp: this.state.noTelp,
          alamat: this.state.alamat,
          saldo: this.state.saldo

      }

      this.setState({
        newBankMaster: newBnk,
          listBankMaster: [...this.state.listBankMaster, newBnk]
      });
  }

  render() {
    // const buttonText = isEdit ? "Simpan" : "Tambah";
    return (
      <div className='container'>
        <h3>Add Data Bank Master</h3>
        <form onSubmit={this.handleSubmit}>
        {/* <div className='p-field'>
            <label htmlFor='norek'>No Rekening  :  </label>
            <InputText
                id="norek"
                name="norek"
                value={this.state.norek}
                onChange={this.handleInputChange}
                required
              />
          </div> */}
          <div className="p-field">
              <label className="col-12 mb-2 md:col-2 md:mb-0" htmlFor="noTelp">norek <span style={{ color: 'red' }}>*</span></label>
              <InputText
                className="col-12 md:col-10 w-1"
                id="norek"
                name="norek"
                value={this.state.norek}
                onChange={this.handleInputChange}
                required
                style={{ width: '30%'}}
              />
            </div>
          {/* <div className="p-field">
              <label htmlFor="nama">Nama  :  </label>
              <InputText
                id="nama"
                name="nama"
                value={this.state.nama}
                onChange={this.handleInputChange}
                required
              />
              </div> */}
              <div className="p-field">
              <label className="col-12 mb-2 md:col-2 md:mb-0" htmlFor="noTelp">Nama <span style={{ color: 'red' }}>*</span></label>
              <InputText
                className="col-12 md:col-10 w-1"
                id="Nama"
                name="Nama"
                value={this.state.Nama}
                onChange={this.handleInputChange}
                required
                style={{ width: '30%'}}
              />
            </div>
          {/* <div className='p-field'>
            <label htmlFor='alamat'>Alamat</label>
            <InputText
                id="alamat"
                name="alamat"
                value={this.state.alamat}
                onChange={this.handleInputChange}
                required
              />
          </div> */}
          <div className="p-field">
              <label className="col-12 mb-2 md:col-2 md:mb-0" htmlFor="noTelp">alamat <span style={{ color: 'red' }}>*</span></label>
              <InputText
                className="col-12 md:col-10 w-1"
                id="alamat"
                name="alamat"
                value={this.state.alamat}
                onChange={this.handleInputChange}
                required
                style={{ width: '30%'}}
              />
            </div>
          {/* <div className='p-field'>
            <label htmlFor='noTelp'>No Telepon  :  </label>
            <InputText
                id="noTelp"
                name="noTelp"
                value={this.state.noTelp}
                onChange={this.handleInputChange}
                required
              />
          </div> */}
          <div className="p-field">
              <label className="col-12 mb-2 md:col-2 md:mb-0" htmlFor="noTelp">noTelp <span style={{ color: 'red' }}>*</span></label>
              <InputText
                className="col-12 md:col-10 w-1"
                id="noTelp"
                name="noTelp"
                value={this.state.noTelp}
                onChange={this.handleInputChange}
                required
                style={{ width: '30%'}}
              />
            </div>
          {/* <div className='p-field'>
            <label htmlFor='saldo'>Saldo Rekening  :  </label>
            <InputText
                id="saldo"
                name="saldo"
                value={this.state.saldo}
                onChange={this.handleInputChange}
                required
              />
          </div> */}
          <div className="p-field">
              <label className="col-12 mb-2 md:col-2 md:mb-0" htmlFor="saldo">saldo</label>
              <InputText
                className="col-12 md:col-10 w-1"
                id="saldo"
                name="saldo"
                value={this.state.saldo}
                onChange={this.handleInputChange}
                required
                style={{ width: '30%'}}
              />
            </div>

          <div className="mt-3">
            <Button className="button-save" type='submit' label="Save" severity="primary" onClick={(e) => this.handleSubmit(e)} />
            <Link to='/bankadm/bankMaster/'>
              {/* <Button label="Batal" severity="secondary" /> */}

            </Link>
            {/* <Button  type="submit" /> */}
          </div>

        </form>
      </div>
    )
  }
}
export default InputBankMaster;
