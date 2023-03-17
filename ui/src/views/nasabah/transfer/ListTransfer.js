import React, { Component } from 'react';
import cekLogin from "../../cekLogin/cekLogin"
import DataTable, {
    createTheme,
    defaultThemes,
} from "react-data-table-component";
import { connect } from "react-redux";

class ListTransfer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      let logincek=new cekLogin()
      logincek.loginCek();
        const columns = [
            {
                name: "No Rekening",
                selector: "norek",
            },
            {
                name: "Nama",
                selector: "nama",
            },
            {
                name: "Saldo",
                selector: "saldo",
            },
        ];

        return (
            <>
                {/* <p>{this.props.listHistoryTelkom[0]}</p> */}
                <DataTable
                    columns={columns}
                    data={this.props.listData}
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

export default ListTransfer;
