import React, { Component } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CCardFooter,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { url } from '../../../Constanta';
import ListAmbil from './ListAmbil';

class Ambil extends Component {

  constructor(props) {
    super(props);
    this.state={
      norek:'',
    };
    this.ubahNorek = this.ubahNorek.bind(this);
    this.clearNorek = this.clearNorek.bind(this);
    this.ambilTunai = this.ambilTunai.bind(this);
    this.listAmbil = this.listAmbil.bind(this);
  }

  listAmbil(value) {
    if(value != '') {
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

  ambilTunai(e) {
    e.preventDefault();
    this.listAmbil(this.state.norek);
  }

  ubahNorek(e) {
    console.log("eventUbah:",e.target.value);
    this.setState(prevState => ({
      norek: e.target.value
    }))
    // console.log("eventUbah2:",this.state.norek);
  }

  clearNorek(e) {
    this.setState(prevState => ({
      norek: ''
    }))
  }

  render() {
    return (
      <CRow>
        <CCol xs={12}>
          <CCard mb={4}>
            <CCardHeader>
              <strong>Ambil Tunai</strong>
            </CCardHeader>
            <CCardBody>
              <CCol sm={3}>
                <p className="text-medium-emphasis small w-full">
                  Masukkan Nomor Rekening:
                </p>
                <CFormInput
                    value={this.state.norek}
                    className="col-sm-2"
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
                    <button className="btn btn-info" type="button" onClick={this.ambilTunai}>Ambil</button>
                    &nbsp;
                    <button className="btn btn-secondary" type="button" onClick={this.clearNorek}>Batal</button>&nbsp;
                  </div>
                </div>
              </div>
            </CCardFooter>
          </CCard>

          <ListAmbil
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

export default Ambil
