import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from 'primereact/dropdown';
import { url } from '../../../Constanta';
class InputTransaksiTelkom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTransaksi: "",
      idPelanggan: "",
      bulanTagihan: "",
      tahunTagihan: "",
      uang: "",
      status: "",
      isEdit: false,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    if (location && location.data) {
      const { idTransaksi, idPelanggan, bulanTagihan, tahunTagihan, uang, status } = location.state.data;
      this.setState({
        idTransaksi,
        idPelanggan,
        bulanTagihan,
        tahunTagihan,
        uang,
        status,
        isEdit: true,
      });
    }
    this.listPelangganOption();
  }

  listPelangganOption() {
    fetch(`http://localhost:3535/api/masterpelanggan/getOptionsMasterPelanggan`)
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
    const { idTransaksi, bulanTagihan, tahunTagihan, uang, status, isEdit } = this.state;
    const idPelanggan = this.state.idPelanggan.idPelanggan;
    const edit = isEdit
      ? `${url}/api/transaksi-telkom/update/${idTransaksi}`
      : `${url}/api/transaksi-telkom/save`;

    const method = isEdit ? "PUT" : "POST";
    const data = { idTransaksi, idPelanggan, bulanTagihan, tahunTagihan, uang, status };
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
    const { idTransaksi, idPelanggan, bulanTagihan, tahunTagihan, uang, status, isEdit } = this.state;
    const buttonText = isEdit ? "Simpan" : "Tambah";

    return (
      <Card>
        <form onSubmit={this.handleSubmit}>
            <div className="field grid">
              <label className="col-12 mb-2 md:col-2 md:mb-0" htmlFor="idTransaksi">ID <span style={{ color: 'red' }}>*</span></label>
              <InputText
                className="col-12 md:col-10 w-1"
                id="idTransaksi"
                name="idTransaksi"
                value={idTransaksi}
                onChange={this.handleInputChange}
                required
                style={{ width: '30%'}}
              />
            </div>
            <br/>
            <div className="field grid">
              <label className="col-12 mb-2 md:col-2 md:mb-0" htmlFor="idPelanggan">Pelanggan <span style={{ color: 'red' }}>*</span></label>
              <Dropdown
                className="col-12 md:col-10 w-1"
                name="idPelanggan"
                value={idPelanggan}
                onChange={this.handleInputChange}
                options={this.state.listPelanggan}
                optionLabel="nama"
                placeholder="Select Pelanggan"
                style={{ width: '30%'}}
              />
            </div>
            <br/>
            <div className="p-field">
              <label className="col-12 mb-2 md:col-2 md:mb-0" htmlFor="bulanTagihan">Bulan Tagihan</label>
              <InputText
                className="col-12 md:col-10 w-1"
                id="bulanTagihan"
                name="bulanTagihan"
                value={bulanTagihan}
                onChange={this.handleInputChange}
                required
                style={{ width: '30%'}}
              />
            </div>
            <br/>
            <div className="p-field">
              <label className="col-12 mb-2 md:col-2 md:mb-0" htmlFor="tahunTagihan">Tahun Tagihan</label>
              <InputText
                className="col-12 md:col-10 w-1"
                id="tahunTagihan"
                name="tahunTagihan"
                value={tahunTagihan}
                onChange={this.handleInputChange}
                required
                style={{ width: '30%'}}
              />
            </div>
            <br/>
            <div className="p-field">
              <label className="col-12 mb-2 md:col-2 md:mb-0" htmlFor="uang">Uang</label>
              <InputText
                className="col-12 md:col-10 w-1"
                id="uang"
                name="uang"
                value={uang}
                onChange={this.handleInputChange}
                required
                style={{ width: '30%'}}
              />
            </div>
            <br/>
            <div className="p-field">
              <label className="col-12 mb-2 md:col-2 md:mb-0" htmlFor="status">Status</label>
              <InputText
                className="col-12 md:col-10 w-1"
                id="status"
                name="status"
                value={status}
                onChange={this.handleInputChange}
                required
                style={{ width: '30%'}}
              />
            </div>
            <br/>

          <Button label={buttonText} type="submit" />
        </form>
      </Card>
    );
  }
}

export default InputTransaksiTelkom;
