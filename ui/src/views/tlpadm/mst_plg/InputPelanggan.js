import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { url } from '../../../Constanta';
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter, useHistory } from "react-router-dom";

import "./style.css"
class InputPelanggan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idPelanggan: "",
      nama: "",
      noTelp: "",
      alamat: "",
      isEdit: false,
    };
    if(window.location.href.slice(63) != '') {
      this.getDataById(window.location.href.slice(63));
    }
  }

  async getDataById(id) {
    var fetchUrl = `value=${id}`;

    try {
      const response = await fetch(`http://localhost:3535/api/masterpelanggan/getById?${fetchUrl}`);
      const data = await response.json();
      const { idPelanggan, nama, noTelp, alamat } = data.rows[0];
      this.setState({
        idPelanggan,
        nama,
        noTelp,
        alamat,
        isEdit: true,
      });
    } catch (error) {
      console.log(error);
      // handle error here
    }
  }

  async componentDidMount(id) {
    // const { idPelanggan } = this.props;
    // console.log(this.props.pelanggan);
    // console.log(idPelanggan);
    const { location } = this.props;
    console.log(location)
    if (location && location.data) {
      const { idPelanggan, nama, noTelp, alamat } = location.state.data;

      this.setState({
        idPelanggan,
        nama,
        noTelp,
        alamat,
        isEdit: true,
      });
    }
    // let id = location.data;
    // this.getDataById(id);
    console.log(this.state.idPelanggan);
  }

  // listPelangganOption() {
  //   fetch(`http://localhost:3535/api/masterpelanggan/getOptionsMasterPelanggan`)
  //     .then((response) => response.json())
  //     .then((pel) => {
  //       this.setState(
  //         (prevState) => ({
  //           listPelanggan: pel.data.data,
  //         }),
  //         () => {
  //         }
  //       );
  //     })
  //     .catch((Err) => {
  //       alert("Tidak meload data1");
  //     });

  // }

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
    const { idPelanggan, nama, noTelp, alamat, isEdit } = this.state;

    // Check if all required fields are filled in
    if (!idPelanggan || !nama || !noTelp || !alamat) {
      alert("Please fill in all required fields");
      return;
    }

    const edit = isEdit
      ? `${url}/api/masterpelanggan/update`
      : `${url}/api/masterpelanggan/save`;

    const method = isEdit ? "PUT" : "POST";
    const data = { idPelanggan, nama, noTelp, alamat };
    const response = await fetch(edit, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      window.location.href = '/#/tlpadm/mst_plg';
      console.log('masuk')
      // window.location.reload();
    } else {
      console.error("Failed to add or edit customer data");
    }
  };

  render() {
    const { idPelanggan, nama, noTelp, alamat, isEdit } = this.state;
    const buttonText = isEdit ? "Simpan" : "Tambah";

    return (
      <Card>
        <form onSubmit={this.handleSubmit}>
            <div className="grid">
              <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="idPelanggan">ID <span style={{ color: 'red' }}>*</span></label>
              <InputText
                id="idPelanggan"
                name="idPelanggan"
                value={idPelanggan}
                onChange={this.handleInputChange}
                required
                aria-describedby="idPelanggan-help"
                type="text"
                className="col-11 md:col-10"
                style={{ width: '10%'}}
              />
            </div>
            <br/>
            <div className="grid">
              <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="nama">Nama</label>
              <InputText
                id="nama"
                name="nama"
                value={nama}
                onChange={this.handleInputChange}
                required
                type="text"
                className="col-11 md:col-10"
                // style={{ width: '10%'}}
              />
            </div>
            <br/>
            <div className="grid">
              <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="noTelp">No Telepon</label>
              <InputText
                id="noTelp"
                name="noTelp"
                value={noTelp}
                onChange={this.handleInputChange}
                required
                type="text"
                className="col-11 md:col-10"
              />
            </div>
            <br/>
            <div className="grid">
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
              />

            </div>

          <div className="flex mt-4 justify-content-end">
            <Button className="flex button-save" label={buttonText} type="submit" />
            <Link to='/tlpadm/mst_plg/'>
              <Button className="flex button-save ml-3" severity="secondary" label="Kembali" />
            </Link>
          </div>

        </form>
      </Card>
    );
  }
}

export default InputPelanggan;
