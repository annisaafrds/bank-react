// import '../App.css';
import React, { Component } from 'react';
// import InputEmployee from './InputEmployee';
// import ListEmployee from './ListEmployee';
import { url } from '../../../../Constanta';
// import SearchEmployee from './SearchEmployee';
import { connect } from "react-redux";
import ListTrx from './listTrx';
import cekLogin from "../../../cekLogin/cekLogin";


class dataTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trx:
            {
                tanggal: '',
                norek: '',
                statusKet: '',
                nama: '',
                uang: '',
            },
            listTrx: [],
            size: 10,
            page: 1,
            field: '',
            value: '',
            totalData: 0,
            // listDept: [],
            // listJobs: [],
            // ket: 'Tambah'
        };
        // this.ubahFieldPegawai = this.ubahFieldPegawai.bind(this);
        // this.addListPegawai = this.addListPegawai.bind(this);
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
        // fetch(`${url}/api/hist-bank/getBy?value=2`)
        fetch(`${url}/api/hist-bank?${fetchUrl}`)
            .then((response) => response.json())
            .then((Emp) => {
                // this.props.dispatchListPegawai(Emp.data)
                // this.props.dispatchTotalData(Emp.total_data)

                console.log('a', Emp.data.data);
                this.setState(
                    (prevState) => ({
                        listTrx: Emp.data.data,
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
            // page = 1
        }

        if (value == null) value = "";

        if (field == null) field = "";

        this.listPegawaiDb(field, value, page, size);
        // this.listDeptOption();
        // this.listJobOption();
    }

    // ubahFieldPegawai(e) {
    //   this.setState((prevState) => ({
    //     pegawai: {
    //       ...prevState.pegawai, [e.target.name]: e.target.value,
    //     }
    //   }), () => {
    //     console.log('pegawai', this.state.pegawai);
    //   });
    // }

    // updateList(paramPegawai) {
    //   this.props.dispatchPegawai(paramPegawai)
    //   console.log('b', paramPegawai);
    //   this.setState({
    //     pegawai: paramPegawai,
    //     ket: 'Edit',
    //   })

    // }

    // addListPegawai(s) {
    //   s.preventDefault();
    //   // s.preventDefault();
    //   let {
    //     EMPLOYEE_ID,
    //     FIRST_NAME,
    //     LAST_NAME,
    //     EMAIL,
    //     PHONE_NUMBER,
    //     HIRE_DATE,
    //     JOB_ID,
    //     SALARY,
    //     COMMISSION_PCT,
    //     MANAGER_ID,
    //     DEPARTMENT_ID,
    //   } = this.state.pegawai;

    //   let ket = this.state.ket;

    //   // const { onSimpan } = this.props
    //   let urlSubmit = `${url}/api/employees/insertEmployee`;
    //   var parmethod = "post"
    //   if (ket != "Tambah") {
    //     parmethod = "put"
    //     urlSubmit = url + '/api/employees/updateEmployee';
    //   }
    //   fetch(`${urlSubmit}`, {
    //     method: parmethod,
    //     body: JSON.stringify({
    //       EMPLOYEE_ID: EMPLOYEE_ID,
    //       FIRST_NAME: FIRST_NAME,
    //       LAST_NAME: LAST_NAME,
    //       EMAIL: EMAIL,
    //       PHONE_NUMBER: PHONE_NUMBER,
    //       HIRE_DATE: HIRE_DATE,
    //       JOB_ID: JOB_ID,
    //       SALARY: SALARY,
    //       COMMISSION_PCT: COMMISSION_PCT,
    //       MANAGER_ID: MANAGER_ID,
    //       DEPARTMENT_ID: DEPARTMENT_ID,
    //     }),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8"
    //     }
    //   })
    //     .then(response => {
    //       response.json()
    //       if (ket != "Tambah") {
    //         alert("Data berhasil di update");
    //       } else {
    //         alert("Data berhasil di Tambah");
    //       }
    //       // onSimpan(true)

    //       this.setState(prevState => ({
    //         pegawai: {
    //           EMPLOYEE_ID: '',
    //           FIRST_NAME: '',
    //           LAST_NAME: '',
    //           EMAIL: '',
    //           PHONE_NUMBER: '',
    //           HIRE_DATE: '',
    //           JOB_ID: '',
    //           SALARY: '',
    //           COMMISSION_PCT: '',
    //           MANAGER_ID: '',
    //           DEPARTMENT_ID: '',
    //         },
    //         ket: 'Tambah'
    //       }))
    //       this.listPegawaiDb(this.state.field, this.state.value, this.state.page, this.state.size);



    //     })
    //     .then(json => {
    //       // onSimpan(true)
    //     })

    // }

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
      let logincek=new cekLogin()
      logincek.loginCek();
        return (
            <div className="App1">
                <label><strong>History Transfer</strong></label><br />
                <div>
                    {/* <InputEmployee pegawai={this.state.pegawai}
            ubahFieldPegawai={this.ubahFieldPegawai}
            addListPegawai={this.addListPegawai}
          // listDept={this.state.listDept}
          // listJobs={this.state.listJobs}
          /> */}
                    <br />
                    {/* <SearchEmployee
            handleInputSearch={this.handleInputSearch}
            handleSubmitSearch={this.handleSubmitSearch}
            field={this.state.field}
            value={this.state.value}
          >
          </SearchEmployee> */}
                </div>
                <br />

                <div>
                    <ListTrx
                        listTrx={this.state.listTrx}
                        // updateList={this.updateList}
                        handlePageChange={this.handlePageChange}
                        handlePerRowsChange={this.handlePerRowsChange}
                        countPerPage={this.state.size}
                        // deletePegawai={this.deletePegawai}
                        totalData={this.state.totalData}
                    />
                    <br /><br />
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


export default dataTransfer;

