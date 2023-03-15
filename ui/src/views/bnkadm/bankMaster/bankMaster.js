// import '../App.css';
import '../../../style.css';
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
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import ListPelanggan from './ListPelanggan';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
// import {Link } from "react-router-dom";
// import { url } from '../../../Constanta';
import { ConfirmDialog } from 'primereact/confirmdialog';

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
    // this.updateList=this.updateList.bind(this);
    // this.deleteList=this.deleteList.bind(this);
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
  // deleteList(){

  // }

  // updateList(){

  // }

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

  onDelete = (id) => {
    this.setState({
      confirmationVisible: true,
      confirmationId: id
    });
  }

  onConfirmDelete = () => {
    const { confirmationId } = this.state;

    fetch(`${url}/api/masterpelanggan/delete?norek=${confirmationId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // remove the deleted customer from the list
        const updatedList = this.state.listBankMaster.filter(item => item.norek !== confirmationId);
        this.setState({
          listBankMaster: updatedList
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
      // <div className="App">

      //     <Link to ='/addDataMaster' >
      //       <CButton className="mb-3" type="submit" color="primary">[+] Add Data Bank Master</CButton>
      //     </Link><br />
      //     {/* <label><strong>Data Bank Master</strong></label> */}
      //   <div>
      //     <br />
      //   </div>
      //   {/* <br /> */}

      //   <div>
      //     {/* <ListBankMaster
      //       listBankMaster={this.state.listBankMaster}
      //       handlePageChange={this.handlePageChange}
      //       handlePerRowsChange={this.handlePerRowsChange}
      //       countPerPage={this.state.size}
      //       total_data={this.state.totalData}
      //     /> */}
      //     <br /><br />
      //   </div>
      // </div>

      <Card>
          <Link to='/bnkadm/bankMaster/inputBankMaster'>
          <Button className='mb-2' label="Add Data Bank Master" icon="pi pi-plus" size="sm" style={{display: 'flex', justifyContent: 'flex-end'}} />
          </Link>
            <DataTable stripedRows header="Data Bank Master" value={this.state.listBankMaster} tableStyle={{ minWidth: '50rem' }}
            paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
            filterDisplay="row"
            globalFilterFields={['norek', 'nama',  'alamat','noTelp','saldo']}
            emptyMessage="No customers found.">
              <Column field="norek" header="norek" sortable style={{ minWidth: '2rem' }}></Column>
              <Column field="nama" header="Nama" sortable ></Column>
              <Column field="alamat" header="Alamat" sortable ></Column>
              <Column field="noTelp" header="No Telepon" sortable ></Column>
              <Column field="saldo" header="saldo" sortable ></Column>

              <Column header="Actions" body={(data, state) =>
                <div>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-text"
                            onClick={(e) => {
                                console.log("row idx: " + data.norek);
                            }
                        }/>
                    <Button icon="pi pi-trash" severity="danger" className="p-button-rounded p-button-text"
                            onClick={(e) => {
                                console.log("row idx: " + data.norek);
                                this.onDelete(data.norek);
                            }
                        }/>
                    <ConfirmDialog header="Confirmation" visible={confirmationVisible} onHide={this.onCancelDelete} message="Are you sure you want to delete this data?" icon="pi pi-exclamation-triangle" accept={this.onConfirmDelete} reject={this.onCancelDelete} />

                </div>
            }>
            </Column>
            </DataTable>
        </Card>
    );
  }


}


export default bankMaster;

