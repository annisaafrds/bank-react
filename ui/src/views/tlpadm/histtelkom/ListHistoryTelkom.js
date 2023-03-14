import React, { Component } from 'react';
import DataTable, {
    createTheme,
    defaultThemes,
} from "react-data-table-component";
import { connect } from "react-redux";
import moment from 'moment';

class ListHistoryTelkom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = [
          {
            name: "Pelanggan",
            selector: "idPelanggan",
          },
          {
              name: "Tanggal Bayar",
              selector: (row) => moment(row.tanggalBayar).format('DD/MM/YYYY'),
          },
          {
              name: "Bulan Tagihan",
              selector: "bulanTagihan",
          },
          {
              name: "Tahun Tagihan",
              selector: "tahunTagihan",
          },
          {
              name: "Uang",
              selector: "uang",
          },
            // {
            //     name: "Department",
            //     // cell: (row) => row.departments.DEPARTMENT_NAME,
            //     cell: (row) => row.departments === null ? '' : row.departments.DEPARTMENT_NAME,
            // },
            // {
            //     name: "Job",
            //     cell: (row) => row.jobs.JOB_TITLE,
            // },
            // {
            //     name: "Action",
            //     button: true,
            //     cell: (row) => {
            //         return (
            //             <>
            //                 <button onClick={() => this.props.updateList(row)}>Edit</button>
            //                 <button onClick={(e) => this.props.deletePegawai(row)}>Delete</button>
            //             </>

            //         );
            //     },
            // },
        ];

        return (
            <>
                {/* <p>{this.props.listHistoryTelkom[0]}</p> */}
                <DataTable
                    columns={columns}
                    data={this.props.listHistoryTelkom}
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
            </>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         dataListPegawai: state.listHistoryTelkom,
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



export default ListHistoryTelkom;
