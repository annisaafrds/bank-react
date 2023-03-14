import React, { Component, useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ListPelanggan from './ListPelanggan';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
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
    const columns = [
      {
        name: "ID",
        selector: "idPelanggan",
        sortable: true,
        width: "80px"
      },
      {
        name: "Nama",
        selector: "nama",
        sortable: true,
      },
      {
        name: "No Telp",
        selector: "noTelp",
        sortable: true,
      },
      {
        name: "Alamat",
        selector: "alamat",
        sortable: true,
      },
      {
        name: "Action",
        button: true,
        cell: (row) => {
            return (
                <>
                    <CButton size="sm"  color="warning" shape="rounded-pill" onClick={() => this.props.updateList(row)}>Edit</CButton>
                    <CButton size="sm" className="ml-md-3" color="danger" shape="rounded-pill"  onClick={(e) => this.props.deletePegawai(row)}>Delete</CButton>
                </>

            );
        },
      },
    ];

      return (
        // <ListPelanggan listPelanggan={this.state.listPelanggan}
        // // updateList={this.updateList}
        // handlePageChange={this.handlePageChange}
        // handlePerRowsChange={this.handlePerRowsChange}
        // countPerPage={this.state.total_page}
        // totalData={this.state.size}
        // />
        <>
        <Card>
          <Button className='mb-2' label="Tambah Pelanggan" icon="pi pi-plus" size="sm" style={{display: 'flex', justifyContent: 'flex-end'}} />
            <DataTable stripedRows header="Data Pelanggan" value={this.state.listPelanggan} tableStyle={{ minWidth: '50rem' }}
            paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
            filterDisplay="row"
            globalFilterFields={['idPelanggan', 'nama', 'noTelp', 'alamat']}
            emptyMessage="No customers found.">
              <Column field="idPelanggan" header="ID" sortable style={{ minWidth: '2rem' }}></Column>
              <Column field="nama" header="Nama" sortable ></Column>
              <Column field="noTelp" header="No Telepon" sortable ></Column>
              <Column field="alamat" header="alamat" sortable ></Column>
              <Column header="Actions" body={(data, state) =>
                <div>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-text"
                            onClick={(e) => {
                                console.log("row idx: " + data.idPelanggan);
                            }
                        }/>
                    <Button icon="pi pi-trash" severity="danger" className="p-button-rounded p-button-text"
                            onClick={(e) => {
                                console.log("row idx: " + data.idPelanggan);
                            }
                        }/>
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
