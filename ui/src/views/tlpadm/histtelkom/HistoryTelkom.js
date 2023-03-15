import React, { Component, useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {Link } from "react-router-dom";
import { url } from '../../../Constanta';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component

class HistoryTelkom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listHistoryTelkom: [],
      size: 10,
      page: 1,
      field:'',
      value:'',
      totalData:0,

      confirmationVisible: false, // state to show/hide the confirmation dialog
      confirmationId: null // state to store the id of the customer to delete
    };


    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePerRowsChange = this.handlePerRowsChange.bind(this);
  }

  listHistoryTelkomDb(field, value, page, size) {
    var fetchUrl =
    field === null || value === null
      ? `page=${page}&size=${size}`
      : `field=${field}&value=${value}&page=${page}&size=${size}`;
  // alert(`${url}/api/emp/getEmp?${fetchUrl}`);
  //alert(`${url}/api/employees/getEmployee?${fetchUrl}`);
  fetch(`http://localhost:3535/api/history-telkom?${fetchUrl}`)
    .then((response) => response.json())
    .then((tr) => {



       this.setState(
         (prevState) => ({
           listHistoryTelkom: tr.data.data,
         }),
         () => {
          this.setState(
            (prevState) => ({
              totalData: tr.data.total_data,
            })
          );

          this.setState(
            (prevState) => ({
              size: tr.data.total_page,
            })
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

    if (size == null) size=10;
    //if(page===null)page=1;

    if (page === null) {
      page = 1
    }

    if(value==null)value="";

    if(field==null)field="";

    this.listHistoryTelkomDb(field, value, page, size);

  }

  handlePageChange(page) {
    //    this.props.dispatchPage(page)
    this.setState(prevState => ({

      page: page
    }))
    //alert(this.props.dataField)
    this.listHistoryTelkomDb(
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
    this.listHistoryTelkomDb(
      this.state.field,
      this.state.value,
      this.state.page,
      size,
    );
    //1,this.props.dateSize
    //fetchData(page, perPage);
  }

  onDelete = (id) => {
    this.setState({
      confirmationVisible: true,
      confirmationId: id
    });
  }

  onConfirmDelete = () => {
    const { confirmationId } = this.state;

    fetch(`${url}/api/history-telkom/delete?idHistory=${confirmationId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // remove the deleted customer from the list
        const updatedList = this.state.listHistoryTelkom.filter(item => item.idHistory !== confirmationId);
        this.setState({
          listHistoryTelkom: updatedList
        });
        console.log('sukses')
      } else {
        alert("Failed to delete the customer");
      }
    })
    .catch(error => {
      console.error("Error deleting the customer: ", error);
      alert("Failed to delete the customer");
    });
    this.setState({
      confirmationVisible: false,
      confirmationId: null
    });
}

onCancelDelete = () => {
  this.setState({
    confirmationVisible: false,
    confirmationId: null
  });
}

  render() {
      const { confirmationVisible } = this.state;
      return (
        <>
        <Card>
            <DataTable stripedRows header="Data History Telkom" value={this.state.listHistoryTelkom} tableStyle={{ minWidth: '50rem' }}
            paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
            filterDisplay="row"
            globalFilterFields={['nama', 'bulanTagihan', 'tahunTagihan', 'uang']}
            emptyMessage="No customers found.">
              {/* <Column field="idPelanggan" header="Pelanggan" sortable style={{ minWidth: '2rem' }}></Column> */}
              <Column field="MASTERPELANGGAN.nama" header="Nama" sortable ></Column>
              <Column field="bulanTagihan" header="Bulan Tagihan" sortable ></Column>
              <Column field="tahunTagihan" header="Tahun Tagihan" sortable ></Column>
              <Column field="uang" header="Uang" sortable ></Column>
            </DataTable>
        </Card>
        </>
      );
  }

}

export default HistoryTelkom
