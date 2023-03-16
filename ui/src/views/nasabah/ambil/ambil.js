import React, { Component } from 'react'
import { url } from '../../../Constanta';
import ListAmbil from './ListAmbil';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

class Ambil extends Component {

  constructor(props) {
    super(props);
    this.state={
      norek:'',
      nama:'',
      saldo:'',
      listData: [],
      loading: true,
      showInputSaldo: false // new state property
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
    // show input saldo
    this.setState({ showInputSaldo: true });
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
      norek: '',
      listData: [],
      showInputSaldo: false // hide input saldo when clear norek
    }))
    // listAmbil = [];
  }

  formatCurrency(rowData) {
    return `Rp.${rowData.saldo.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}`;
  }


  render() {

    return (
      <>
        <Card title="Ambil Tunai" className='mb-3'>
          <div className="">
            <div class="col-12 md:col-6">
              <label htmlFor="idPelanggan">Nomor Rekening <span style={{ color: 'red' }}>*</span></label>
            </div>
            <div class="col-12 md:col-6">
              <InputNumber
                id="idPelanggan"
                name="idPelanggan"
                value={this.state.norek}
                onChange={this.ubahNorek}
                required
                aria-describedby="idPelanggan-help"
                style={{ width: '40%'}}
                placeholder="Masukan Nomor Rekening"
              />
            </div>
          </div>

          {/* Muncul ketika no rek diinput dan ada datanya */}
          { this.state.showInputSaldo && (
            <div className="">
              <div class="col-12 md:col-6">
                <label htmlFor="saldo">Saldo</label>
              </div>
              <div class="col-12 md:col-6">
                <InputText
                  id="saldo"
                  name="saldo"
                  value={this.state.saldo}
                  onChange={this.ubahNorek}
                  required
                  type="text"
                  style={{ width: '40%'}}
                  placeholder="Isi jumlah uang"
                />
              </div>
            </div>
          )}

          <div className="flex mt-4">
            <Button className="flex button-save" label="Ambil" type="submit" onClick={this.ambilTunai} />
            <Button className="flex button-save ml-3" severity="secondary" label="Batal" onClick={this.clearNorek} />
          </div>
        </Card>

        <DataTable stripedRows header="Data Pelanggan" value={this.state.listData} tableStyle={{ minWidth: '50rem' }}
            paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
            filterDisplay="row"
            loading={this.state.loading}
            emptyMessage="No customers found.">
            <Column field="norek" header="No Rekening"></Column>
            <Column field="nama" header="Nama"></Column>
            <Column field="saldo" header="Saldo" dataType="numeric" body={this.formatCurrency}></Column>
        </DataTable>
      </>
    );
  }
}

export default Ambil
