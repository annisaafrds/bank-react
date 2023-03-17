import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { url } from '../../../Constanta';
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";

class InputAmbil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      norek: "",
      nama: "",
      noTelp: "",
      alamat: "",
      saldo: "",
      isEdit: false,
      showConfirmation: false,
    };
  }

  async getDataById() {
    const value = window.location.href.slice(62);
    if (value != '') {
      await fetch(`${url}/api/mst-bank/getByNorek?value=${value}`)
        .then((response) => response.json())
        .then((data) => {
          const { norek, nama, noTelp, alamat, saldo } = data.rows[0];
          console.log(data);
          this.setState(
            (prevState) => ({
              norek,
              nama,
              noTelp,
              alamat,
              saldo,
              isEdit: true,
            }),
            () => {
              console.log('a', data);
            }
          );
        })
        .catch((Err) => {
          alert("Tidak meload data1");
        });
    }
  }

  async componentDidMount() {
    const { location } = this.props;
    console.log(location)
    if (location && location.data) {
      const { norek, nama, noTelp, alamat } = location.state.data;

      this.setState({
        norek,
        nama,
        noTelp,
        alamat,
        saldo,
        isEdit: true,
      });
    }
    console.log(this.state.saldo);
    await this.getDataById(window.location.href.slice(62));
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
    const { norek, nama, noTelp, alamat, saldo } = this.state;

    // Check if all required fields are filled in
    // if (!norek || !nama || !noTelp || !alamat || !saldo) {
    //   alert("Please fill in all required fields");
    //   return;
    // }

    const edit =  `${url}/api/mst-bank/update/`

    const method = "PUT";
    const data = { norek, nama, noTelp, alamat, saldo: this.state.saldo };
    const response = await fetch(edit, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      this.setState({
        showConfirmation: true,
      });
      console.log('masuk')
      // window.location.reload();
    } else {
      console.error("Failed to add or edit customer data");
    }
  };

  handleConfirmationOk = () => {
    this.setState({
      showConfirmation: false,
    });
    window.location.href = '/#/nasabah/ambil';
  };

  render() {
    const { norek, nama, noTelp, alamat, saldo, showConfirmation  } = this.state;
    const buttonText = "Simpan";

    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    });

    const saldoRp = formatter.format(saldo);

    return (
      <>
      <Card>
       <div>Saldo saat ini: {saldoRp}</div>
        <form onSubmit={this.handleSubmit}>
          <div className="grid hidden">
            <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="idPelanggan">ID <span style={{ color: 'red' }}>*</span></label>
            <InputText
              id="idPelanggan"
              name="idPelanggan"
              value={norek}
              onChange={this.handleInputChange}
              required
              aria-describedby="idPelanggan-help"
              type="text"
              className="col-11 md:col-10"
              style={{ width: '10%' }}
              disabled />
          </div>
          <br />
          <div className="grid hidden">
            <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="nama">Nama</label>
            <InputText
              id="nama"
              name="nama"
              value={nama}
              onChange={this.handleInputChange}
              required
              type="text"
              className="col-11 md:col-10"
              disabled />
          </div>
          <br />
          <div className="grid hidden">
            <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="noTelp">No Telepon</label>
            <InputText
              id="noTelp"
              name="noTelp"
              value={noTelp}
              onChange={this.handleInputChange}
              required
              type="text"
              className="col-11 md:col-10"
              disabled />
          </div>
          <br />
          <div className="grid hidden">
            <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="alamat">Alamat</label>
            {/* <InputTextarea value={alamat} onChange={this.handleInputChange} rows={5} cols={30} autoResize className="col-11 md:col-10" /> */}
            <InputText
              id="alamat"
              name="alamat"
              value={alamat}
              onChange={this.handleInputChange}
              required
              type="text"
              className="col-11 md:col-10"
              disabled />
          </div>
          <div className="grid">
            <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="alamat">Ambil Saldo</label>
            {/* <InputTextarea value={alamat} onChange={this.handleInputChange} rows={5} cols={30} autoResize className="col-11 md:col-10" /> */}
            <InputText
              id="saldo"
              name="saldo"
              value={saldo}
              onChange={this.handleInputChange}
              required
              type="text"
              className="col-11 md:col-10"
             />
          </div>

          <div className="flex mt-4 justify-content-end">
            <Button className="flex button-save" label={buttonText} type="submit" />
            <Link to='/nsbh/ambil'>
              <Button className="flex button-save ml-3" severity="secondary" label="Kembali" />
            </Link>
          </div>

        </form>
      </Card>
        <Dialog
          header="Konfirmasi"
          visible={showConfirmation}
          onHide={() => this.setState({ showConfirmation: false })}
          footer={
            <div>
              <Button
                label="OK"
                className="p-button-primary"
                onClick={this.handleConfirmationOk}
              />
            </div>
          }
        >
          <p>Data pelanggan berhasil disimpan</p>
        </Dialog>
        </>
    );
  }
}

export default InputAmbil;
