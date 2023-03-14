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
        },
        {
          name: "Nama",
          selector: "nama",
        },
        {
          name: "Np Telp",
          selector: "noTelp",
        },
        {
          name: "Alamat",
          selector: "alamat",
        },
      ];


    //    this.ubahProps()
        return(
        <>
        <div className="container">
          <Link to ='/addPelanggan' >
            <CButton className="mb-3" type="submit" color="primary">Add Pelanggan</CButton>
          </Link>
        <CCard>
          <CCardHeader><strong>Master Pelanggan</strong></CCardHeader>
          <CCardBody>
            <DataTable
                    columns={columns}
                    data={this.props.listPelanggan}
                    theme="solarized"
                    // customStyles={tableCustomStyle}
                    // customStyles={customStyles}
                    selectableRows
                    pagination
                    paginationServer
                    paginationTotalRows={this.props.total_data}
                    paginationPerPage={this.props.size}

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

