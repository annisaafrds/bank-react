import React, { Component, useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {Link } from "react-router-dom";
import { url } from '../../../Constanta';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component

class TransaksiTelkom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pelanggan: {
        idPelanggan: '',
        name: '',
        noTelp: '',
        alamat: '',
      },
      listTransaksiTelkom: [],
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

  listTransaksiTelkomDb(field, value, page, size) {
    var fetchUrl =
    field === null || value === null
      ? `page=${page}&size=${size}`
      : `field=${field}&value=${value}&page=${page}&size=${size}`;
  // alert(`${url}/api/emp/getEmp?${fetchUrl}`);
  //alert(`${url}/api/employees/getEmployee?${fetchUrl}`);
  fetch(`http://localhost:3535/api/transaksi-telkom?${fetchUrl}`)
    .then((response) => response.json())
    .then((tr) => {



       this.setState(
         (prevState) => ({
           listTransaksiTelkom: tr.data.data,
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

    this.listTransaksiTelkomDb(field, value, page, size);

  }

  handlePageChange(page) {
    //    this.props.dispatchPage(page)
    this.setState(prevState => ({

      page: page
    }))
    //alert(this.props.dataField)
    this.listTransaksiTelkomDb(
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
    this.listTransaksiTelkomDb(
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

    fetch(`${url}/api/transaksi-telkom/delete?idTransaksi=${confirmationId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // remove the deleted customer from the list
        const updatedList = this.state.listTransaksiTelkom.filter(item => item.idPelanggan !== confirmationId);
        this.setState({
          listTransaksiTelkom: updatedList
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
          <Link to='/tlpadm/trksi_tlkm/inputTransaksiTelkom'>
          <Button className='mb-2' label="Tambah Transaksi Telkom" icon="pi pi-plus" size="sm" style={{display: 'flex', justifyContent: 'flex-end'}} />
          </Link>
            <DataTable stripedRows header="Data Pelanggan" value={this.state.listTransaksiTelkom} tableStyle={{ minWidth: '50rem' }}
            paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
            filterDisplay="row"
            globalFilterFields={['nama', 'bulanTagihan', 'tahunTagihan', 'uang', 'status']}
            emptyMessage="No customers found.">
              {/* <Column field="idPelanggan" header="Pelanggan" sortable style={{ minWidth: '2rem' }}></Column> */}
              <Column field="MASTERPELANGGAN.nama" header="Nama" sortable ></Column>
              <Column field="bulanTagihan" header="Bulan Tagihan" sortable ></Column>
              <Column field="tahunTagihan" header="Tahun Tagihan" sortable ></Column>
              <Column field="uang" header="Uang" sortable ></Column>
              <Column field="status" header="Status" body={(rowData) => {
                const status = rowData.status;
                let color;
                let sts;
                if (status == "1") {
                  color = 'success';
                  sts = 'Setor';
                } else if (status == "2") {
                  color = 'warning';
                  sts = 'Ambil';
                }
                return <Button severity={ color } label={sts} size="sm" text/>;
              }}></Column>
              <Column header="Actions" body={(data, state) =>
                <div>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-text"
                            onClick={(e) => {
                                console.log("row idx: " + data.idTransaksi);
                            }
                        }/>
                    <Button icon="pi pi-trash" severity="danger" className="p-button-rounded p-button-text"
                            onClick={(e) => {
                                console.log("row idx: " + data.idTransaksi);
                                this.onDelete(data.idTransaksi);
                            }
                        }/>
                    <ConfirmDialog header="Confirmation" visible={confirmationVisible} onHide={this.onCancelDelete} message="Are you sure you want to delete this data?" icon="pi pi-exclamation-triangle" accept={this.onConfirmDelete} reject={this.onCancelDelete} />

                </div>
            }>
            </Column>
            </DataTable>
        </Card>
        </>
      );
  }

}

export default TransaksiTelkom
