import React, { Component, useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ListPelanggan from './ListPelanggan';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {Link } from "react-router-dom";
import { url } from '../../../Constanta';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { InputText } from 'primereact/inputtext';
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
      size: 10,
      page: 1,
      field:'',
      value:'',
      totalData:0,
      searchQuery: '',

      confirmationVisible: false, // state to show/hide the confirmation dialog
      confirmationId: null // state to store the id of the customer to delete
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
              totalData: Plg.data.total_data,
            })
          );

          this.setState(
            (prevState) => ({
              size: Plg.data.total_page,
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

    this.listPelangganDb(field, value, page, size);

  }

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
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

  onDelete = (id) => {
    this.setState({
      confirmationVisible: true,
      confirmationId: id
    });
  }

  onConfirmDelete = () => {
    const { confirmationId } = this.state;

    fetch(`${url}/api/masterpelanggan/delete?idPelanggan=${confirmationId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // remove the deleted customer from the list
        const updatedList = this.state.listPelanggan.filter(item => item.idPelanggan !== confirmationId);
        this.setState({
          listPelanggan: updatedList
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
    // const columns = [
    //   {
    //     name: "ID",
    //     selector: "idPelanggan",
    //     sortable: true,
    //     width: "80px"
    //   },
    //   {
    //     name: "Nama",
    //     selector: "nama",
    //     sortable: true,
    //   },
    //   {
    //     name: "No Telp",
    //     selector: "noTelp",
    //     sortable: true,
    //   },
    //   {
    //     name: "Alamat",
    //     selector: "alamat",
    //     sortable: true,
    //   },
    //   {
    //     name: "Action",
    //     button: true,
    //     cell: (row) => {
    //         return (
    //             <>
    //                 <CButton size="sm"  color="warning" shape="rounded-pill" onClick={() => this.props.updateList(row)}>Edit</CButton>
    //                 <CButton size="sm" className="ml-md-3" color="danger" shape="rounded-pill"  onClick={(e) => this.props.deletePegawai(row)}>Delete</CButton>
    //             </>

    //         );
    //     },
    //   },
    // ];
      const { confirmationVisible } = this.state;
      const filteredPelanggan = this.state.listPelanggan.filter(plg =>
        plg.idPelanggan.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
        plg.nama.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
        plg.noTelp.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
        plg.alamat.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      );

      return (
        <>
        <Card>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="search">Search</label>
            <InputText id="search" value={this.state.searchQuery} onChange={this.handleSearch} />
          </div>
        </div>
          <Link to='/tlpadm/mst_plg/InputPelanggan'>
          <Button className='mb-2' label="Tambah Pelanggan" icon="pi pi-plus" size="sm" style={{display: 'flex', justifyContent: 'flex-end'}} />
          </Link>
            <DataTable stripedRows header="Data Pelanggan" value={this.state.listPelanggan} tableStyle={{ minWidth: '50rem' }}
            paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
            filterDisplay="row"
            globalFilterFields={['idPelanggan', 'nama', 'noTelp', 'alamat']}
            emptyMessage="No customers found.">
              <Column field="idPelanggan" header="ID" sortable style={{ minWidth: '2rem' }}></Column>
              <Column field="nama" header="Nama" sortable ></Column>
              <Column field="noTelp" header="No Telepon" sortable ></Column>
              <Column field="alamat" header="Alamat" sortable ></Column>
              <Column header="Actions" body={(data, state) =>
                <div>
                  <Link to='/tlpadm/mst_plg/InputPelanggan'>

                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-text"
                            // onClick={(e) => {
                            //     console.log("row idx: " + data.idPelanggan);
                            // }}
                            />
                  </Link>
                    <Button icon="pi pi-trash" severity="danger" className="p-button-rounded p-button-text"
                            onClick={(e) => {
                                console.log("row idx: " + data.idPelanggan);
                                this.onDelete(data.idPelanggan);
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

export default mstPlg
