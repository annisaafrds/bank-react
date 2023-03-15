import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { url } from '../../../Constanta';
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
  }

  componentDidMount() {
    const { location } = this.props;
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
    const { idPelanggan, nama, noTelp, alamat, isEdit } = this.state;
    const edit = isEdit
      ? `${url}/api/masterpelanggan/update/${idPelanggan}`
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
      // this.props.history.push("/tlpadm/mst_plg");
      console.log('masuk')
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
          <div className="flex">
            <div className="field grid">
              <label className="col-12 mb-2 md:col-2 md:mb-0" style={{marginRight: '2%'}} htmlFor="idPelanggan">ID <span style={{ color: 'red' }}>*</span></label>
              <InputText
                id="idPelanggan"
                name="idPelanggan"
                value={idPelanggan}
                onChange={this.handleInputChange}
                required
                aria-describedby="idPelanggan-help"
                type="text"
                className="col-12 md:col-10"
              />
              {/* <small id="idPelanggan-help">
                ID Required.
              </small> */}
            </div>
            <br/>
            <div className="p-field">
              <label htmlFor="nama">Nama</label>
              <InputText
                id="nama"
                name="nama"
                value={nama}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br/>
            <div className="p-field">
              <label htmlFor="noTelp">No Telepon</label>
              <InputText
                id="noTelp"
                name="noTelp"
                value={noTelp}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br/>
            <div className="p-field">
              <label htmlFor="alamat">Alamat</label>
              <InputText
                id="alamat"
                name="alamat"
                value={alamat}
                onChange={this.handleInputChange}
                required
              />
            </div>
          </div>

          <Button label={buttonText} type="submit" />
        </form>
      </Card>
    );
  }
}

export default InputPelanggan;
