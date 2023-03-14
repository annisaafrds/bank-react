import React, { Component, useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import DataTable from "react-data-table-component";
import ListPelanggan from './ListPelanggan';


class mstPlg extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pelanggan: {
        idPelanggan: '',
        name: '',
        noTelp: '',
        alamat: '',
      },
      listPelanggan: [],
      size:10,
      page:1,
      field:'',
      value:'',
      totalData:0,
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePerRowsChange = this.handlePerRowsChange.bind(this);
  }

  listPelangganDb(field, value, page, size) {
    var fetchUrl =
    field === null || value === null
      ? `page=${page}&size=${size}`
      : `field=${field}&value=${value}&page=${page}&size=${size}`;
  // alert(`${url}/api/emp/getEmp?${fetchUrl}`);
  //alert(`${url}/api/employees/getEmployee?${fetchUrl}`);
  fetch(`http://localhost:3535/api/masterpelanggan/getMasterPelanggan?${fetchUrl}`)
    .then((response) => response.json())
    .then((Plg) => {



       this.setState(
         (prevState) => ({
           listPelanggan: Plg.data.data,
         }),
         () => {
          this.setState(
            (prevState) => ({
              totalData: Plg.total_data,
            })
          );

          this.setState(
            (prevState) => ({
              size: size,
            })/*,
            () => {
              this.setState((prevState) => ({
                NumberOfPages: this.state.totalData / size,
              }));
              console.log("totalData", this.state.totalData);
            }*/
          );
         }
       );
    })
    .catch((Err) => {
      alert("Tidak meload data1");
    });
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search)
    let size = queryParams.get("size")
    let field = queryParams.get("field")
    let value = queryParams.get("value")
    let page = queryParams.get("page")

    if(size==null)size=5;
    //if(page===null)page=1;

    if (page=== null) {
    page=1
    }

    if(value==null)value="";

    if(field==null)field="";

    this.listPelangganDb(field, value, page, size);

  }

  handlePageChange(page) {
    //    this.props.dispatchPage(page)
    this.setState(prevState => ({

      page: page
    }))
    //alert(this.props.dataField)
    this.listPelangganDb(
      this.state.field,
      this.state.value,
      page,
      this.state.size
    );
    //1,this.props.dateSize
    //fetchData(page, perPage);
  }

  handlePerRowsChange(size) {
    //    this.props.dispatchPage(page)
    this.setState(prevState => ({

      size: size
    }))
    // alert(this.props.dataField)
    this.listPelangganDb(
      this.state.field,
      this.state.value,
      this.state.page,
      size,
    );
    //1,this.props.dateSize
    //fetchData(page, perPage);
  }

  render() {
      return (
        <ListPelanggan listPelanggan={this.state.listPelanggan}
        // updateList={this.updateList}
        handlePageChange={this.handlePageChange}
        handlePerRowsChange={this.handlePerRowsChange}
        countPerPage={this.state.size}
        totalData={this.state.totalData}
        />
      );

  }

}

export default mstPlg
