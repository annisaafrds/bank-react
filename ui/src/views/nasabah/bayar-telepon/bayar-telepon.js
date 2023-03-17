import React, { Component, useState, useEffect } from 'react'
import cekLogin from "../../cekLogin/cekLogin"
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { render } from '@testing-library/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { url } from '../../../Constanta';

class BayarTelepon extends Component {

  constructor(props) {
    super(props);
    this.state= {
      norek:'',
      noTelp:'',
      // listData: [],
    };
    this.ubahNorek = this.ubahNorek.bind(this);
    this.clearNorek = this.clearNorek.bind(this);
    this.bayarTelepon = this.bayarTelepon.bind(this);
    this.listBayarTelepon = this.listBayarTelepon.bind(this);
  }

  listBayarTelepon(value) {
    if(value != '') {
      fetch(`${url}/api/trnasabah/findBayarTelepon?norek=${value}`)
        .then((response) => response.json())
        .then((data) => {

        console.log('a', data.data.data);
          this.setState(
            (prevState) => ({
              listData: data.data.data,
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

  bayarTelepon(e) {
    e.preventDefault();
    this.listBayarTelepon(this.state.norek);
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
    let logincek=new cekLogin()
    logincek.loginCek();
    return (
      <Card title="Bayar Telepon">
        <form>
          <div class="form-group p-field col-md-6">
            <label>Masukkan Nomor Rekening</label>
          </div>
          <InputText value={this.state.norek} keyfilter="int" placeholder="ex: 123xxxxxx" onChange={this.ubahNorek} />

          <div class="row btn-div ">
            <div class="col">
            <Button label="Submit" type="button" onClick={this.bayarTelepon} />
              &nbsp;
            <Button label="Batal" severity="secondary" onClick={this.clearNorek} />
            </div>
          </div>

        </form>


        <DataTable stripedRows header="Data Pelanggan" value={this.state.listData} tableStyle={{ minWidth: '50rem' }}
          paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
          filterDisplay="row"
          globalFilterFields={['norek', 'nomorTlp', 'noTelp', 'alamat']}
          emptyMessage="No data found.">
          <Column field="norek" header="No Rekening" sortable ></Column>
          <Column field="nomorTlp" header="No Telepon" sortable ></Column>
        </DataTable>
      </Card>
    )
  }

}

export default BayarTelepon
