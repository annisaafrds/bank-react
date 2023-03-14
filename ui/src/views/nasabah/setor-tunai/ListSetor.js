import React, { Component } from 'react';
import DataTable, {
    createTheme,
    defaultThemes,
} from "react-data-table-component";
import { connect } from "react-redux";

class ListSetor extends Component {
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
              selector: "tanggalBayar",
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
          }
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

export default ListSetor;
