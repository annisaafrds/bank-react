import './App.css';
import '../../../style.css';
import React, { Component } from 'react';
import DataTable, {
    createTheme,
    defaultThemes,
} from "react-data-table-component";
import { connect } from "react-redux";


class ListBankMaster extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = [
            {
                name: "NOREK",
                selector: "norek",
            },
            {
                name: "NAMA",
                selector: "nama",
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
            },
            {
              name: "Action",
              button: true,
              cell: (row) => {
                return (
                  <>
                  <button onClick={()=>this.props.updateList(row)}>Edit</button>
                  <button onClick={()=>this.props.deleteList(row)}>Delete</button>
                  </>
                );
              },
            }


        ];

        return (
            <>
           == {this.props.total_data}
                <DataTable
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
                />
            </>
        )
    }
}


export default ListBankMaster;
