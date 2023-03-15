import './App.css';
import '../../../style.css';
import React, { Component } from 'react';
import DataTable, {
    createTheme,
    defaultThemes,
} from "react-data-table-component";
import { connect } from "react-redux";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CButton,
} from '@coreui/react'

class ListBankMaster extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = [
            {
                name: "NOREK",
                selector: "norek",
                sortable: true,
                // width: "80px"
            },
            {
                name: "NAMA",
                selector: "nama",
                sortable: true,

            },
            {
                name: "ALAMAT",
                selector: "alamat",
            },
            {
                name: "NO TELPON",
                selector: "noTelp",
            },
            {
                name: "SALDO",
                selector: "saldo",
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

                  {/* <button className="btn btn-sm btn-success" onClick={()=>this.props.updateList(row)}>Edit</button>
                  <button className="btn btn-sm btn-warning" onClick={()=>this.props.deleteList(row)}>Delete</button> */}
                  </>
                );
              },
            }


        ];

        return (
            <>
        <div className="container">
          {/* <Link to ='/addPelanggan' >
            <CButton className="mb-3" type="submit" color="primary">Add Pelanggan</CButton>
          </Link> */}
        <CCard>
          <CCardHeader><strong>Data Bank Master</strong></CCardHeader>
          <CCardBody>
            <div className="text-end mb-2">
              <input type="text" onChange={handleFilter} />
            </div>
            <DataTable
                    columns={columns}
                    data={this.props.listBankMaster}
                    theme="solarized"
                    fixedHeader
                    pagination
                    paginationServer
                    paginationTotalRows={this.props.total_data}
                    paginationPerPage={this.props.total_page}
                    onChangePage={(page) => this.props.handlePageChange(page)}
                    onChangeRowsPerPage={(size) => this.props.handlePerRowsChange(size)}
                //firstPage = {this.props.firstPageSage}
                //nextPage = {()=>alert("sasasa1111")}
                //onLastPage = {()=>this.props.lastPage}
              />
          </CCardBody>
        </CCard>
        </div>
                {/* <DataTable
                    columns={columns}
                    data={this.props.listBankMaster}
                    theme="solarized"
                    selectableRows
                    pagination
                    paginationServer
                    paginationTotalRows={this.props.total_data}
                    paginationPerPage={this.props.size}

                    onChangePage={(page) => this.props.handlePageChange(page)}
                    onChangeRowsPerPage={(size) => this.props.handlePerRowsChange(size)}
                /> */}
            </>
        )
    }
}


export default ListBankMaster;
