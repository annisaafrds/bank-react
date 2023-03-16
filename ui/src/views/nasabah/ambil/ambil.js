import React, { Component } from 'react'
import { url } from '../../../Constanta';
import ListAmbil from './ListAmbil';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { InputText } from 'primereact/inputtext';
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

class Ambil extends Component {

  constructor(props) {
    super(props);
    this.state={
      norek:'',
      nama:'',
      saldo:'',
      listData: [],
      loading: true
    };
    this.ubahNorek = this.ubahNorek.bind(this);
    this.clearNorek = this.clearNorek.bind(this);
    this.ambilTunai = this.ambilTunai.bind(this);
    this.listAmbil = this.listAmbil.bind(this);

    this.formatCurrency = this.formatCurrency.bind(this);
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
              loading: false
            }),
            () => {
            console.log('a', data.rows);
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
    // listAmbil = [];
  }

  formatCurrency(rowData) {
    return `Rp.${rowData.saldo.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}`;
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

          <DataTable stripedRows header="Data Pelanggan" value={this.state.listData} tableStyle={{ minWidth: '50rem' }}
              paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
              filterDisplay="row"
              loading={this.state.loading}
              emptyMessage="No customers found.">
              <Column field="norek" header="No Rekening" sortable></Column>
              <Column field="nama" header="Nama" sortable></Column>
              <Column field="saldo" header="Saldo" dataType="numeric" sortable body={this.formatCurrency}></Column>
              {/* <Column field="nama" header="Nama" sortable ></Column>
              <Column field="noTelp" header="No Telepon" sortable ></Column>
              <Column field="alamat" header="Alamat" sortable ></Column> */}
              {/* <Column header="Actions" body={(data, state) =>
                <div>
                  <Link to='/tlpadm/mst_plg/InputPelanggan'>

                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-text"
                    // onClick={(e) => {
                    //     console.log("row idx: " + data.idPelanggan);
                    // }}
                    />
                  </Link>
                  <Button icon="pi pi-trash" severity="danger" className="p-button-rounded p-button-text"
                    onClick={(e) => {
                      console.log("row idx: " + data.idPelanggan);
                      this.onDelete(data.idPelanggan);
                    }
                    } />
                  <ConfirmDialog header="Confirmation" visible={confirmationVisible} onHide={this.onCancelDelete} message="Are you sure you want to delete this data?" icon="pi pi-exclamation-triangle" accept={this.onConfirmDelete} reject={this.onCancelDelete} />

                </div>
              }>
              </Column> */}
            </DataTable>
        </CCol>
      </CRow>
    )
  }
}

export default Ambil
