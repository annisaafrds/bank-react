// import '../App.css';
import React, { Component } from 'react';
// import InputEmployee from './InputEmployee';
// import ListEmployee from './ListEmployee';
import { url } from '../../../Constanta';
// import SearchEmployee from './SearchEmployee';
import { connect } from "react-redux";
import ListBankMaster from './ListBankMaster';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CButton,
} from '@coreui/react'
import {Link } from "react-router-dom";

class bankMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankMaster:
      {
        norek: '',
        nama: '',
        alamat: '',
        noTelp: '',
        saldo: '',
      },
      listBankMaster: [],
      size: 10,
      page: 1,
      field: '',
      value: '',
      totalData: 0,

    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePerRowsChange = this.handlePerRowsChange.bind(this);
    this.updateList=this.updateList.bind(this);
    this.deleteList=this.deleteList.bind(this);
  }
  listPegawaiDb(field, value, page, size) {
    var fetchUrl =
      field === null || value === null
        ? `page=${page}&size=${size}`
        : `field=${field}&value=${value}&page=${page}&size=${size}`;
    fetch(`${url}/api/mst-bank?${fetchUrl}`)
      .then((response) => response.json())
      .then((Emp) => {

        console.log('a', Emp.data);
        this.setState(
          (prevState) => ({
            listBankMaster: Emp.data.data,
          }),
          () => {
            console.log("Emp.data",Emp.data)
            this.setState(
              (prevState) => ({
                totalData: Emp.data.total_data,
              })
            );

            this.setState(
              (prevState) => ({
                size: size,
              })
            );



          }
        );
      })
      .catch((Err) => {
        alert("Tidak meload data1");
      });
  }
  deleteList(){

  }

  updateList(){

  }

  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search)
    let size = queryParams.get("size")
    let field = queryParams.get("field")
    let value = queryParams.get("value")
    let page = queryParams.get("page")

    if (size == null) size = 5;

    if (page === null) {
      page = 1
    }

    if (value == null) value = "";

    if (field == null) field = "";

    this.listPegawaiDb(field, value, page, size);
  }

  handlePageChange(page) {
    this.setState(prevState => ({

      page: page
    }))
    this.listPegawaiDb(
      this.state.field,
      this.state.value,
      page,
      this.state.size
    );
  }

  handlePerRowsChange(size) {
    this.setState(prevState => ({

      size: size
    }))

    this.listPegawaiDb(
      this.state.field,
      this.state.value,
      this.state.page,
      size,
    );

  }


  render() {

    return (
      <div className="App">
        <label><strong>Data Bank Master</strong></label><br />
                  <Link to ='/addPelanggan' >
            <CButton className="mb-3" type="submit" color="primary">Add Data Bank Master</CButton>
          </Link>

        <div>
          <br />
        </div>
        <br />

        <div>
          <ListBankMaster
            listBankMaster={this.state.listBankMaster}
            handlePageChange={this.handlePageChange}
            handlePerRowsChange={this.handlePerRowsChange}
            countPerPage={this.state.size}
            total_data={this.state.totalData}
          />
          <br /><br />
        </div>
      </div>
    );
  }


}


export default bankMaster;

