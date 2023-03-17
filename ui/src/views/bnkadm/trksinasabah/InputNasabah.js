import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { url } from '../../../Constanta';
import { Dropdown } from 'primereact/dropdown';
import { Link } from "react-router-dom";
import cekLogin from "../../cekLogin/cekLogin"
class InputNasabah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTransaksiNasabah: '',
      norek: '',
      norekDituju: '',
      noTelp: '',
      uang: '',
      status: '',
      statusKet: '',
      tanggal: '',
    };
  }

  componentDidMount() {
    let logincek=new cekLogin()
logincek.loginCek();
    const { location } = this.props;
    if (location && location.data) {
      const { idTransaksiNasabah, norek, norekDituju, noTelp, uang, status, statusKet, tanggal } = location.state.data;
      this.setState({
        idTransaksiNasabah, norek, norekDituju, noTelp, uang, status, statusKet, tanggal
      });
    }
    this.listPelangganOption();
  }


  listPelangganOption() {
    fetch(`http://localhost:3535/api/mst-bank`)
      .then((response) => response.json())
      .then((pel) => {
        this.setState(
          (prevState) => ({
            listPelanggan: pel.data.data,
          }),
          () => {
            console.log('a', this.state.listPelanggan);
          }
        );
      })
      .catch((Err) => {
        alert("Tidak meload data1");
      });

  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { idTransaksiNasabah, norekDituju, noTelp, uang, status, statusKet, tanggal } = this.state;
    const norek = this.state.norek.norek;
    const save = `${url}/api/trnasabah/inserttrnasabah`;

    const method = "POST";
    const data = { idTransaksiNasabah, norek, norekDituju, noTelp, uang, status, statusKet, tanggal };
    const response = await fetch(save, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // this.props.history.push("/tlpadm/mst_plg");
      alert("Data berhasil di Tambah");
      window.location.href = '/#/bnk_adm/trksi_nsbh/';
      console.log('masuk')
    } else {
      console.error("Failed to add or edit customer data");
    }
  };

  render() {
    const { idTransaksiNasabah, norek, norekDituju, noTelp, uang, status, statusKet, tanggal } = this.state;
    const buttonText = "Tambah";

    return (
      <Card>
        <form onSubmit={this.handleSubmit}>
          <div className="grid">
            <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="idTransaksiNasabah">ID <span style={{ color: 'red' }}>*</span></label>
            <InputText
              className="col-11 md:col-10"
              id="idTransaksiNasabah"
              name="idTransaksiNasabah"
              value={idTransaksiNasabah}
              onChange={this.handleInputChange}
              required
              style={{ width: '10%' }}
              type="text"
            />
          </div>
          <br />
          <br />
          <div className="grid">
            <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="norekDituju">No Rek Dituju</label>
            <InputText
              className="col-11 md:col-10"
              id="norekDituju"
              name="norekDituju"
              value={norekDituju}
              onChange={this.handleInputChange}
              required
            // style={{ width: '30%'}}
            />
          </div>
          <br />
          <div className="grid">
            <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="norek">Nama</label>
            <Dropdown
              className="col-11 md:col-10"
              name="norek"
              value={norek}
              onChange={this.handleInputChange}
              options={this.state.listPelanggan}
              optionLabel="nama"
              placeholder="Select Nama"
            />
          </div>
          <br />
          {/* <div className="grid">
            <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="noTelp">No Tlp</label>
            <InputText
              className="col-11 md:col-10"
              id="noTelp"
              name="noTelp"
              value={noTelp}
              onChange={this.handleInputChange}
              required
            // style={{ width: '30%'}}
            />
          </div>
          <br /> */}
          <div className="grid">
            <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="uang">Uang</label>
            <InputText
              className="col-11 md:col-10"
              id="uang"
              name="uang"
              value={uang}
              onChange={this.handleInputChange}
              required
            // style={{ width: '30%'}}
            />
          </div>
          <br />
          <div className="grid">
            <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="status">Status</label>
            <InputText
              className="col-11 md:col-10"
              id="status"
              name="status"
              value={status}
              onChange={this.handleInputChange}
              required
            // style={{ width: '30%'}}
            />
          </div>
          <br />
          <div className="grid">
            <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="statusKet">Keterangan</label>
            <InputText
              className="col-11 md:col-10"
              id="statusKet"
              name="statusKet"
              value={statusKet}
              onChange={this.handleInputChange}
              required
            // style={{ width: '30%'}}
            />
          </div>
          <br />
          <div className="grid">
            <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="tanggal">Tanggal</label>
            <InputText
              className="col-11 md:col-10"
              id="tanggal"
              name="tanggal"
              value={tanggal}
              onChange={this.handleInputChange}
              required
            // style={{ width: '30%'}}
            />
          </div>


          <div className="flex mt-4 justify-content-end">
            <Button className="flex button-save" label={buttonText} type="submit" />
            <Link to='/bnk_adm/trksi_nsbh/'>
              <Button className="flex button-save" severity="secondary" label="Kembali" />
            </Link>
          </div>
        </form>
      </Card>
    );
  }
}

export default InputNasabah;
