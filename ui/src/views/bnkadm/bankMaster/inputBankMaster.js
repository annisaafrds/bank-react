import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { url } from '../../../Constanta';
import { useLocation } from 'react-router-dom';
import '../../../style.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {Link } from "react-router-dom";
import { ConfirmDialog } from 'primereact/confirmdialog';
// import { useNavigate } from "react-router-dom";

class InputBankMaster  extends Component{
    constructor(props) {
      super(props);
      this.state = {
        norek: '',
          nama: '',
          noTelp: '',
          alamat: '',
          saldo: '',
          // isEdit: false,

      }
    }

    componentDidMount() {
      const { location } = this.props;
      const params=new URLSearchParams(window.location.search)
      alert(useLocation())
      if (location && location.data) {
        const { norek, nama,alamat, noTelp, saldo } = location.state.data;
        this.setState({
          norek, nama,alamat, noTelp, saldo,
          // isEdit: true,
        });
      }
      // this.listPelangganOption();
    }


    // listPelangganOption() {
    //   fetch(`http://localhost:3535/api/mst-bank`)
    //     .then((response) => response.json())
    //     .then((pel) => {
    //       this.setState(
    //         (prevState) => ({
    //           listBankMaster: pel.data.data,
    //         }),
    //         () => {
    //           console.log('a', this.state.listBankMaster);
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
      this.setState((prevState) => ({
        [name]: value,
      }));
    };

    handleSubmit = async (event) => {
      event.preventDefault();
      const { norek, nama, noTelp, alamat, saldo } = this.state;
      // alert(this.state.nama)
      // if (!norek || !nama || !noTelp || !alamat || !saldo) {
      //   alert("Please fill in all required fields");
      //   return;
      // }
console.log("this.state.nama",this.state.nama)
console.log("this.state.norek",this.state.norek)
console.log("this.state.alamat",this.state.alamat)
// const edit = isEdit
// ? `${url}/api/mst-bank/update/${norek}`
// : `${url}/api/mst-bank/insert`;

// const method = isEdit ? "PUT" : "POST";
      // const norek = this.state.norek.norek;
      const save = `${url}/api/mst-bank/insert`;
      // ? `${url}/api/masterpelanggan/update/${idPelanggan}`

      const method = "POST";
      const data = { norek, nama, noTelp, alamat, saldo };
      const response = await fetch(save, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // const navigate = useNavigate();
        // navigate("/bnk_adm/mst_bnk/");
        // this.props.history.push("/mst-bank/update");
        console.log('masuk')
      } else {
        console.error("Failed to add or edit customer data");
      }
    };



  render() {

    const buttonText = "Tambah";

    return (

      <div className='container'>

        <h3>Add Data Bank Master</h3>
        <Card>
        <form onSubmit={this.handleSubmit}>

          <div className="grid">
              <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="noTelp">No Rekening</label>
              <InputText
                // className="col-12 md:col-10 w-1"
                id="norek"
                name="norek"
                value={this.state.norek}
                onChange={this.handleInputChange}
                required
                type="text"
                className="col-9 md:col-7"
                // style={{ width: '30%'}}
              /><span style={{ color: 'red' }}>  * wajib diisi</span>
            </div>
            <br/>

              <div className="grid">
              <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="noTelp">Nama Nasabah</label>
              <InputText
                // className="col-12 md:col-10 w-1"
                id="nama"
                name="nama"
                value={this.state.nama}
                onChange={this.handleInputChange}
                required
                type="text"
                className="col-9 md:col-7"
                // style={{ width: '50%'}}
              /><span style={{ color: 'red' }}>  * wajib diisi</span>

            </div>
            <br/>


          <div className="grid">
              <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="noTelp">Alamat Nasabah</label>
              <InputText
                // className="col-12 md:col-10 w-1"
                id="alamat"
                name="alamat"
                value={this.state.alamat}
                onChange={this.handleInputChange}
                required
                type="text"
                className="col-9 md:col-7"
                // style={{ width: '30%'}}
              /><span style={{ color: 'red' }}>  * wajib diisi</span>

            </div>
            <br/>


          <div className="grid">
              <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="noTelp">No Telepon</label>
              <InputText
                // className="col-12 md:col-10 w-1"
                id="noTelp"
                name="noTelp"
                value={this.state.noTelp}
                onChange={this.handleInputChange}
                required
                type="text"
                className="col-9 md:col-7"
                // style={{ width: '30%'}}
              /><span style={{ color: 'red' }}>  * wajib diisi</span>

            </div>
            <br/>


          <div className="grid">
              <label className="col-1 mb-2 md:col-2 md:mb-0" htmlFor="saldo">Saldo Nasabah</label>
              <InputText
                // className="col-12 md:col-10 w-1"
                id="saldo"
                name="saldo"
                value={this.state.saldo}
                onChange={this.handleInputChange}
                required
                type="text"
                className="col-9 md:col-7"
                // style={{ width: '30%'}}
              />
            </div>
            <br/>


          <div className="flex mt-8 ">

            {/* <Button label={buttonText} type="submit" /> */}
             <Link to='/bnk_adm/mst_bnk/'>
            <Button className="button-save" type='submit' label="Save" severity="primary" onClick={(e) => this.handleSubmit(e)} />

             {/* <Button className="flex button-save" label={buttonText} type="submit" /> */}
              {/* <Button className="flex button-save ml-3" label="Batal" severity="secondary" /> */}
            </Link>
            {/* <Button  type="submit" /> */}
          </div>
        </form>
        </Card>
      </div>
    )
  }
}
export default InputBankMaster;
