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

  render() {
      const { confirmationVisible } = this.state;
      return (
        <>
        <Card>
          {/* <Link to='/tlpadm/hist_trksi/inputHistoryTelkom'>
          <Button className='mb-2' label="Tambah History Telkom" icon="pi pi-plus" size="sm" style={{display: 'flex', justifyContent: 'flex-end'}} />
          </Link> */}
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
