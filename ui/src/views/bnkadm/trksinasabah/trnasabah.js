// import '../App.css';
import React, { Component } from 'react';
// import InputEmployee from './InputEmployee';
// import ListEmployee from './ListEmployee';
import { url } from '../../../Constanta';
// import SearchEmployee from './SearchEmployee';
import { connect } from "react-redux";
import ListTrnasabah from './ListTrnasabah';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import InputNasabah from './InputNasabah';


class trnasabah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trnasabah:
      {
        idTransaksiNasabah: '',
        norek: '',
        norekDituju: '',
        nama: '',
        noTelp: '',
        uang: '',
        status: '',
        statusKet: '',
        tanggal: '',
      },
      listTrnasabah: [],
      size: 10,
      page: 1,
      field: '',
      value: '',
      totalData: 0,
      // listDept: [],
      // listJobs: [],
      // ket: 'Tambah'
    };
    // this.ubahFieldNasabah = this.ubahFieldNasabah.bind(this);
    // this.addListNasabah = this.addListNasabah.bind(this);
    // this.updateList = this.updateList.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePerRowsChange = this.handlePerRowsChange.bind(this);
    // this.handleInputSearch = this.handleInputSearch.bind(this);
    // this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    // this.deletePegawai = this.deletePegawai.bind(this);
  }
  listPegawaiDb(field, value, page, size) {
    var fetchUrl =
      field === null || value === null
        ? `page=${page}&size=${size}`
        : `field=${field}&value=${value}&page=${page}&size=${size}`;
    // alert(`${url}/api/emp/getEmp?${fetchUrl}`);
    //alert(`${url}/api/employees/getEmployee?${fetchUrl}`);
    fetch(`${url}/api/trnasabah?${fetchUrl}`)
      .then((response) => response.json())
      .then((Emp) => {
        // this.props.dispatchListPegawai(Emp.data)
        // this.props.dispatchTotalData(Emp.total_data)

        console.log('a', Emp.data);
        this.setState(
          (prevState) => ({
            listTrnasabah: Emp.data.data,
          }),
          () => {
            this.setState(
              (prevState) => ({
                totalData: Emp.data.total_data,
              })
            );

            this.setState(
              (prevState) => ({
                size: size,
              })/*,
              () => {
                this.setState((prevState) => ({
                  NumberOfPages: this.state.totalData / size,
                }));
                console.log("totalData", this.state.totalData);
              }*/
            );



          }
        );
      })
      .catch((Err) => {
        alert("Tidak meload data1");
      });
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search)
    let size = queryParams.get("size")
    let field = queryParams.get("field")
    let value = queryParams.get("value")
    let page = queryParams.get("page")

    if (size == null) size = 10;

    if (page === null) {
      page = 1
    }

    if (value == null) value = "";

    if (field == null) field = "";

    this.listPegawaiDb(field, value, page, size);
    // this.listDeptOption();
    // this.listJobOption();
  }

  ubahFieldNasabah(e) {
    this.setState((prevState) => ({
      trnasabah: {
        ...prevState.trnasabah, [e.target.name]: e.target.value,
      }
    }), () => {
    });
  }

  updateList(paramPegawai) {
    this.props.dispatchPegawai(paramPegawai)
    console.log('b', paramPegawai);
    this.setState({
      pegawai: paramPegawai,
      ket: 'Edit',
    })

  }

  addListNasabah(s) {
    s.preventDefault();
    // s.preventDefault();
    let {
      EMPLOYEE_ID,
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      PHONE_NUMBER,
      HIRE_DATE,
      JOB_ID,
      SALARY,
      COMMISSION_PCT,
      MANAGER_ID,
      DEPARTMENT_ID,
    } = this.state.trnasabah;

    let ket = this.state.ket;

    // const { onSimpan } = this.props
    let urlSubmit = `${url}/api/employees/insertEmployee`;
    var parmethod = "post"
    if (ket != "Tambah") {
      parmethod = "put"
      urlSubmit = url + '/api/employees/updateEmployee';
    }
    fetch(`${urlSubmit}`, {
      method: parmethod,
      body: JSON.stringify({
        EMPLOYEE_ID: EMPLOYEE_ID,
        FIRST_NAME: FIRST_NAME,
        LAST_NAME: LAST_NAME,
        EMAIL: EMAIL,
        PHONE_NUMBER: PHONE_NUMBER,
        HIRE_DATE: HIRE_DATE,
        JOB_ID: JOB_ID,
        SALARY: SALARY,
        COMMISSION_PCT: COMMISSION_PCT,
        MANAGER_ID: MANAGER_ID,
        DEPARTMENT_ID: DEPARTMENT_ID,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => {
        response.json()
        if (ket != "Tambah") {
          alert("Data berhasil di update");
        } else {
          alert("Data berhasil di Tambah");
        }
        // onSimpan(true)

        this.setState(prevState => ({
          pegawai: {
            EMPLOYEE_ID: '',
            FIRST_NAME: '',
            LAST_NAME: '',
            EMAIL: '',
            PHONE_NUMBER: '',
            HIRE_DATE: '',
            JOB_ID: '',
            SALARY: '',
            COMMISSION_PCT: '',
            MANAGER_ID: '',
            DEPARTMENT_ID: '',
          },
          ket: 'Tambah'
        }))
        this.listPegawaiDb(this.state.field, this.state.value, this.state.page, this.state.size);



      })
      .then(json => {
        // onSimpan(true)
      })

  }

  handlePageChange(page) {
    //    this.props.dispatchPage(page)
    this.setState(prevState => ({

      page: page
    }))
    //alert(this.props.dataField)
    this.listPegawaiDb(
      this.state.field,
      this.state.value,
      page,
      this.state.size
    );
    //1,this.props.dateSize
    //fetchData(page, perPage);
  }

  handlePerRowsChange(size) {
    //    this.props.dispatchPage(page)
    this.setState(prevState => ({

      size: size
    }))
    // alert(this.props.dataField)
    this.listPegawaiDb(
      this.state.field,
      this.state.value,
      this.state.page,
      size,
    );
    //1,this.props.dateSize
    //fetchData(page, perPage);
  }

  // handleInputSearch(e) {
  //   let value = e.target.value;
  //   let name = e.target.name;
  //   this.setState((prevState) => ({
  //     [name]: value
  //   }))
  // }

  // handleSubmitSearch(e) {
  //   e.preventDefault();
  //   this.listPegawaiDb(this.state.field, this.state.value, this.state.page, this.state.size)

  // }

  // listDeptOption() {
  //   fetch(`${url}/api/departments/getDepartmentOption`)
  //     .then((response) => response.json())
  //     .then((Dept) => {
  //       this.props.dispatchListDeptObtion(Dept.data)
  //       this.setState(
  //         (prevState) => ({
  //           listDept: Dept.data,
  //         }),
  //         () => {
  //           console.log('a', this.state.listDept);
  //         }
  //       );
  //     })
  //     .catch((Err) => {
  //       alert("Tidak meload data1");
  //     });

  // }

  // listJobOption() {
  //   fetch(`${url}/api/jobs/getJobOption`)
  //     .then((response) => response.json())
  //     .then((Jobs) => {
  //       this.props.dispatchListJobsOption(Jobs.data)
  //       this.setState(
  //         (prevState) => ({
  //           listJobs: Jobs.data,
  //         }),
  //         () => {
  //           console.log('a', this.listJobs)
  //         }
  //       );
  //     })
  //     .catch((Err) => {
  //       alert("Tidak meload data1");
  //     });

  // }

  // deletePegawai(id) {

  // }

  render() {

    return (
      <div className="App">
        <label><strong>Data Transaksi Nasabah</strong></label><br />
        <div>
          <Link to='/bnkadm/trksinasabah/InputNasabah'>
            <Button className='mb-2' label="Tambah Nasabah" icon="pi pi-plus" size="sm" style={{ display: 'flex', justifyContent: 'flex-end' }} />
          </Link>
          {/* <InputNasabah
            trnasabah={this.state.trnasabah}
            ubahFieldNasabah={this.ubahFieldNasabah}
            addListNasabah={this.addListNasabah}>
          </InputNasabah> */}

          {/* <Link to='/bnkadm/trksinasabah/InputNasabah'
            trnasabah={this.state.trnasabah}
            ubahFieldNasabah={this.ubahFieldNasabah}
            addListNasabah={this.addListNasabah}>
            <Button className='mb-2' label="Tambah Pelanggan" icon="pi pi-plus" size="sm" style={{ display: 'flex', justifyContent: 'flex-end' }} />
          </Link> */}
          <br />
          {/* <SearchEmployee
            handleInputSearch={this.handleInputSearch}
            handleSubmitSearch={this.handleSubmitSearch}
            field={this.state.field}
            value={this.state.value}
          >
          </SearchEmployee> */}
        </div>
        <div>
          <ListTrnasabah
            listTrnasabah={this.state.listTrnasabah}
            // updateList={this.updateList}
            handlePageChange={this.handlePageChange}
            handlePerRowsChange={this.handlePerRowsChange}
            countPerPage={this.state.size}
            // deletePegawai={this.deletePegawai}
            totalData={this.state.totalData}
          />
          <br /><br />
        </div>
        <div class="col-2">
          <h6>**Keterangan</h6>
          <ul>
            <li>1 : Setor</li>
            <li>2 : Tarik</li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <li>3 : Transfer</li>
            <li>4 : Bayar Telepon</li>
          </ul>
        </div>
      </div>
    );
  }


}
// const mapStateToProps = (state) => {
//   return {
//     dataListPegawai: state.listPegawai,
//     dataListPegawaiDb: state.listPegawaiDb,
//     //dataOptionEmp: state.optionEmp,
//     dataPegawai: state.pegawai,
//     //dataEmpExcel : state.empExcel,
//     dataKet: state.ket,
//     dataField: state.field,
//     dataValue: state.value,
//     dataPage: state.page,
//     dataSize: state.size,
//     dataNumberOfPage: state.NumberOfPages,
//     dataTotalData: state.total_data,
//     dataFirstPage: state.firstPage,
//     dataListJobs: state.listJobs,
//     //        dataDEPTNOS: state.DEPTNOS
//   };
// };

// const mapDispactToProps = (dispatch) => {
//   return {
//     dispatchListPegawai: (listTrnasabah) =>
//       dispatch({ type: "UBAH_LIST_PEGAWAI", newValue: listTrnasabah }),
//     /*dispatchListPegawaiDb: (listPegawaiDb) =>
//       dispatch({ type: "UBAH_LIST_PEGAWAI_DB", newValue: listPegawaiDb }),*/
//     dispatchPegawai: (pegawai) => dispatch({ type: "UBAH_PEGAWAI", newValue: pegawai }),
//     dispatchKet: (ket) => dispatch({ type: "UBAH_KET", newValue: ket }),
//     dispatchPage: (page) => dispatch({ type: "UBAH_PAGE", newValue: page }),
//     dispatchSize: (size) => dispatch({ type: "UBAH_SIZE", newValue: size }),
//     dispatchNumberOfPage: (NumberOfPages) =>
//       dispatch({ type: "UBAH_NUMBER_OF_PAGE", newValue: NumberOfPages }),
//     dispatchTotalData: (totalData) => dispatch({ type: "UBAH_TOTAL_DATA", newValue: totalData }),
//     dispatchListJobsOption: (listJobs) => dispatch({ type: "UBAH_LIST_JOB_OPTION", newValue: listJobs }),
//     dispatchListDeptObtion: (listDept) => dispatch({ type: "UBAH_LIST_DEPT_OPTION", newValue: listDept })
//   };
// };


export default trnasabah;

