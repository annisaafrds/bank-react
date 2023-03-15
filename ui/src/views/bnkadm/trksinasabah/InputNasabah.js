import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { url } from '../../../Constanta';
import { Dropdown } from 'primereact/dropdown';
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
          <div className="flex">
            <div className="field grid">
              <label className="col-12 mb-2 md:col-2 md:mb-0" style={{ marginRight: '2%' }} htmlFor="idTransaksiNasabah">ID <span style={{ color: 'red' }}>*</span></label>
              <InputText
                id="idTransaksiNasabah"
                name="idTransaksiNasabah"
                value={idTransaksiNasabah}
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
            <br />
            <br />
            <div className="field grid">
              <label htmlFor="nama">Norek di Tuju</label>
              <InputText
                id="norekDituju"
                name="norekDituju"
                value={norekDituju}
                onChange={this.handleInputChange}
                required
              // aria-describedby="idPelanggan-help"
              // type="text"
              // className="col-12 md:col-10"
              />
              {/* <small id="idPelanggan-help">
                ID Required.
              </small> */}
            </div>
            <br />
            <div className="p-field">
              <label className="col-12 mb-2 md:col-2 md:mb-0" htmlFor="norek">Nama <span style={{ color: 'red' }}>*</span></label>
              <Dropdown
                className="col-12 md:col-10 w-1"
                name="norek"
                value={norek}
                onChange={this.handleInputChange}
                options={this.state.listPelanggan}
                optionLabel="nama"
                placeholder="Select Nama"
                style={{ width: '30%' }}
              />
            </div>
            <br />
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
            <br />
            <div className="p-field">
              <label htmlFor="uang">Uang</label>
              <InputText
                id="uang"
                name="uang"
                value={uang}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br />
            <div className="p-field">
              <label htmlFor="status">Status</label>
              <InputText
                id="status"
                name="status"
                value={status}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br />
            <div className="p-field">
              <label htmlFor="noTelp">Keterangan</label>
              <InputText
                id="statusKet"
                name="statusKet"
                value={statusKet}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br />
            <div className="p-field">
              <label htmlFor="tanggal">Tanggal</label>
              <input name="tanggal" type="date"
                value={tanggal}
                className="form-control" onChange={this.handleInputChange} />
            </div>
          </div>

          <Button label={buttonText} type="submit" />
        </form>
      </Card>
    );
  }
}

export default InputNasabah;
