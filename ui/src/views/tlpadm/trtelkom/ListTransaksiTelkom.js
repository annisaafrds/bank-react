import React, { Component } from 'react';
import DataTable, {
    createTheme,
    defaultThemes,
} from "react-data-table-component";
import {
  CButton,
} from '@coreui/react'
import { connect } from "react-redux";
import {Link } from "react-router-dom";

class ListTransaksiTelkom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = [
            {
                name: "Pelanggan",
                selector: "idPelanggan",
                width: "120px",
            },
            {
                name: "Bulan Tagihan",
                selector: "bulanTagihan",
                width: "150px",
            },
            {
                name: "Tahun Tagihan",
                selector: "tahunTagihan",
            },
            {
                name: "Uang",
                selector: "uang",
            },
            {
                name: "Status",
                cell: (row) => row.status == "1"? <button className="btn btn-sm btn-success">Setor</button> : <button className="btn btn-sm btn-warning">Tarik</button>,
            },
            {
                name: "Action",
                button: true,
                width: "200px",
                cell: (row) => {
                    return (
                        <>
                            <button className="btn btn-sm btn-secondary" onClick={() => this.props.updateList(row)}>Edit</button>&nbsp;
                            <button className="btn btn-sm btn-danger" onClick={(e) => this.props.deletePegawai(row)}>Delete</button>
                        </>

                    );
                },
            },
        ];

        return (
            <>
                {/* <p>{this.props.listTransaksiTelkom[0]}</p> */}
                <Link to ='/addTransaksiTelkom' >
                  <CButton className="mb-3" type="submit" color="primary">(+) Transaksi Telkom</CButton>
                </Link>
                <DataTable
                    columns={columns}
                    data={this.props.listTransaksiTelkom}
                    theme="solarized"
                    // customStyles={tableCustomStyle}
                    // customStyles={customStyles}
                    selectableRows
                    pagination
                    paginationServer
                    paginationTotalRows={this.props.totalData}
                    paginationPerPage={this.props.size}

                    onChangePage={(page) => this.props.handlePageChange(page)}
                    onChangeRowsPerPage={(size) => this.props.handlePerRowsChange(size)}
                //firstPage = {this.props.firstPageSage}
                //nextPage = {()=>alert("sasasa1111")}
                //onLastPage = {()=>this.props.lastPage}
                />
            </>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         dataListPegawai: state.listTransaksiTelkom,
//         dataListPegawaiDb: state.listPegawaiDb,
//         //dataOptionEmp: state.optionEmp,
//         dataPegawai: state.pegawai,
//         //dataEmpExcel : state.empExcel,
//         dataKet: state.ket,
//         dataField: state.field,
//         dataValue: state.value,
//         dataPage: state.page,
//         dataSize: state.size,
//         dataNumberOfPage: state.NumberOfPages,
//         dataTotalData: state.total_data,
//         dataFirstPage: state.firstPage,
//         //        dataDEPTNOS: state.DEPTNOS
//     };
// };

// const mapDispactToProps = (dispatch) => {
//     return {
//         dispatchListPegawai: (listPegawai) =>
//             dispatch({ type: "UBAH_LIST_PEGAWAI", newValue: listPegawai }),
//         /*dispatchListPegawaiDb: (listPegawaiDb) =>
//           dispatch({ type: "UBAH_LIST_PEGAWAI_DB", newValue: listPegawaiDb }),*/
//         dispatchPegawai: (pegawai) => dispatch({ type: "UBAH_PEGAWAI", newValue: pegawai }),
//         dispatchKet: (ket) => dispatch({ type: "UBAH_KET", newValue: ket }),
//         dispatchPage: (page) => dispatch({ type: "UBAH_PAGE", newValue: page }),
//         dispatchSize: (size) => dispatch({ type: "UBAH_SIZE", newValue: size }),
//         dispatchNumberOfPage: (NumberOfPages) =>
//             dispatch({ type: "UBAH_NUMBER_OF_PAGE", newValue: NumberOfPages }),
//         dispatchTotalData: (totalData) => dispatch({ type: "UBAH_TOTAL_DATA", newValue: totalData })
//     };
// };



export default ListTransaksiTelkom;
