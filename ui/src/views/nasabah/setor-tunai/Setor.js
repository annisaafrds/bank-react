import React, { Component } from 'react'
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
import ListSetor from './ListSetor';

class Setor extends Component {
  constructor(props) {
      super(props);
      this.state={
        norek:'',
        listData: []
      };
      this.ubahNorek = this.ubahNorek.bind(this);
      this.clearNorek = this.clearNorek.bind(this);
      this.setorTunai = this.setorTunai.bind(this);
      this.listSetorDb = this.listSetorDb.bind(this);
  }

  listSetorDb(value) {
    if(value != '') {
      console.log("vallll2:",value);
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

  setorTunai() {
    console.log("vallll",this.state.norek);
    this.listSetorDb(this.state.norek);
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
    // console.log("eventUbah2:",this.state.norek);
  }

  render() {
    return (
      <CRow>
        <CCol xs={12}>
          <CCard mb={4}>
            <CCardHeader>
              <strong>Setor Tunai</strong>
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
                    <button className="btn btn-info" type="button" onClick={this.setorTunai}>Submit</button>
                    &nbsp;
                    <button className="btn btn-secondary" type="button" onClick={this.clearNorek}>Batal</button>&nbsp;
                  </div>
                </div>
              </div>
            </CCardFooter>
          </CCard>
          <ListSetor
              listData={this.state.listData}
          />
        </CCol>
      </CRow>
    )
  }
}
export default Setor;
