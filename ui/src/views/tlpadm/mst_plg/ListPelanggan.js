import React, { Component } from "react";
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
import {Link } from "react-router-dom";


class ListPelanggan  extends Component{
    constructor(props) {
        super(props);
        //this.handleEdit=this.handleEdit.bind(this)
    }
    render()
    {
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

    //    this.ubahProps()
        return(
        <>
        <div className="container">
          {/* <Link to ='/addPelanggan' >
            <CButton className="mb-3" type="submit" color="primary">Add Pelanggan</CButton>
          </Link> */}
        <CCard>
          <CCardHeader><strong>Data Pelanggan</strong></CCardHeader>
          <CCardBody>
            <div className="text-end mb-2">
              <input type="text" onChange={handleFilter} />
            </div>
            <DataTable
                    columns={columns}
                    data={this.props.listPelanggan}
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

        </>
        )
    }
}
export default ListPelanggan;

