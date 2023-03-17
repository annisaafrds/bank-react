import React, { Component } from 'react'
import cekLogin from "../../cekLogin/cekLogin"
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CFormInput,
    CRow,
} from '@coreui/react'
import { url } from '../../../Constanta';
import ListTransfer from './ListTransfer';

class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            norek: '',
            listData: [],
        };
        this.ubahNorek = this.ubahNorek.bind(this);
        this.clearNorek = this.clearNorek.bind(this);
        this.transfer = this.transfer.bind(this);
        this.listDb = this.listDb.bind(this);
    }

    listDb(value) {
        if (value != '') {
            console.log("vallll2:", value);
            // const value = this.state.norek;
            fetch(`${url}/api/mst-bank/getByNorek?value=${value}`)
                .then((response) => response.json())
                .then((data) => {

                    console.log('a', data.rows);
                    this.setState(
                        (prevState) => ({
                            listData: data.rows,
                        }),
                        () => {

                            console.log('a', data.rows);
                            // console.log('a', this.state.listTransaksiTelkom);

                        }
                    );
                })
                .catch((Err) => {
                    alert("Tidak meload data1");
                });
        }
    }

    // componentDidMount() {
    //   console.log("vallll:",123);

    //   this.listSetorDb(123);
    // }

    transfer() {
        console.log("vallll", 123);
        this.listDb(this.state.norek);
    }

    ubahNorek(e) {
        console.log("eventUbah:", e.target.value);
        this.setState(prevState => ({
            norek: e.target.value
        }))
        // console.log("eventUbah2:",this.state.norek);
    }

    clearNorek(e) {
        this.setState(prevState => ({
            norek: ''
        }))
        // console.log("eventUbah2:",this.state.norek);
    }

    render() {
      let logincek=new cekLogin()
      logincek.loginCek();
        return (
            <CRow>
                <CCol xs={12}>
                    <CCard mb={4}>
                        <CCardHeader>
                            <strong>Transfer</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CCol sm={2}>
                                <p className="text-medium-emphasis small">
                                    Masukkan Nomor Rekening:
                                </p>
                                <CFormInput
                                    value={this.state.norek}
                                    className="value col-sm-2"
                                    type="text"
                                    placeholder="Nomor Rekening"
                                    aria-label="default input example"
                                    onChange={this.ubahNorek}
                                />
                            </CCol>
                        </CCardBody>
                        <CCardFooter>
                            <div>
                                <div>
                                    <div>
                                        <button className="btn btn-info" type="button" onClick={this.transfer}>Submit</button>
                                        &nbsp;
                                        <button className="btn btn-secondary" type="button" onClick={this.clearNorek}>Batal</button>&nbsp;
                                    </div>
                                </div>
                            </div>
                        </CCardFooter>
                    </CCard>
                    <ListTransfer
                        listData={this.state.listData}
                    // updateList={this.updateList}
                    // handlePageChange={this.handlePageChange}
                    // handlePerRowsChange={this.handlePerRowsChange}
                    // countPerPage={this.state.size}
                    // // deletePegawai={this.deletePegawai}
                    // totalData={this.state.totalData}
                    />
                </CCol>
            </CRow>
        )
    }
}
export default Transfer;
