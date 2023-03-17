import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from 'primereact/dropdown';
import { url } from '../../../Constanta';
import { Link } from "react-router-dom";
import cekLogin from "../../cekLogin/cekLogin"
import "./style.css"

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
    // console.log('Props:', window.location.href);
    // console.log('Props:', window.location.href.slice(63));

    if(window.location.href.slice(63) != '') {
      this.getDataById(window.location.href.slice(63));
    }
  }

  getDataById(id) {
    var fetchUrl = `value=${id}`;
    fetch(`http://localhost:3535/api/transaksi-telkom/getById?${fetchUrl}`)
      .then((response) => response.json())
      .then((tr) => {
        const { idTransaksi, idPelanggan, bulanTagihan, tahunTagihan, uang, status } = tr.rows[0];
        console.log(tr);
        console.log(tr.rows[0]);
        this.setState(
          (prevState) => ({
            idTransaksi,
            idPelanggan,
            bulanTagihan,
            tahunTagihan,
            uang,
            status,
            isEdit: true,
          }),
        )})
      .catch((Err) => {
        // alert("Tidak meload data1");
    });
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
      ? `${url}/api/transaksi-telkom/update`
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
      window.location.href = '/#/tlpadm/trksi_tlkm';
      // this.props.history.push("/tlpadm/mst_plg");
      console.log('masuk')
    } else {
      console.error("Failed to add or edit customer data");
    }
  };

  render() {
    let logincek=new cekLogin()
logincek.loginCek();
    const { idTransaksi, idPelanggan, bulanTagihan, tahunTagihan, uang, status, isEdit } = this.state;
    const buttonText = isEdit ? "Simpan" : "Tambah";

    return (
      <Card>
        <form onSubmit={this.handleSubmit}>
            <div className="grid">
              <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="idTransaksi">ID <span style={{ color: 'red' }}>*</span></label>
              <InputText
                className="col-11 md:col-10"
                id="idTransaksi"
                name="idTransaksi"
                value={idTransaksi}
                onChange={this.handleInputChange}
                required
                style={{ width: '10%'}}
                type="text"
              />
            </div>
            <br/>
            <div className="grid">
              <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="idPelanggan">Pelanggan</label>
              <Dropdown
                className="col-11 md:col-10"
                name="idPelanggan"
                value={idPelanggan}
                onChange={this.handleInputChange}
                options={this.state.listPelanggan}
                optionLabel="nama"
                placeholder="Select Pelanggan"
              />
            </div>
            <br/>
            <div className="grid">
              <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="bulanTagihan">Bulan Tagihan</label>
              <InputText
                className="col-11 md:col-10"
                id="bulanTagihan"
                name="bulanTagihan"
                value={bulanTagihan}
                onChange={this.handleInputChange}
                required
                // style={{ width: '30%'}}
              />
            </div>
            <br/>
            <div className="grid">
              <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="tahunTagihan">Tahun Tagihan</label>
              <InputText
                className="col-11 md:col-10"
                id="tahunTagihan"
                name="tahunTagihan"
                value={tahunTagihan}
                onChange={this.handleInputChange}
                required
                // style={{ width: '30%'}}
              />
            </div>
            <br/>
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
            <br/>
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
            <br/>

            <div className="flex mt-4 justify-content-end">
              <Button className="flex button-save" label={buttonText} type="submit" />
              <Link to='/tlpadm/trksi_tlkm/'>
                <Button className="flex button-save" severity="secondary" label="Kembali" />
              </Link>
            </div>
        </form>
      </Card>
    );
  }
}

export default InputTransaksiTelkom;
