import React, { useState, useEffect } from 'react';
// import '../../../style.css';
import DataTable, {
  createTheme,
  defaultThemes,
} from "react-data-table-component";
// import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
} from '@coreui/react'

const setor = () => {
  const [norek, setNorek] = useState('');
  const [acountBank, setAcountBank] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const columns = [
        {"name": "Alamat Nasabah",
          // selector: "HIRE_DATE",
          cell:(row) => row.alamat
        },
        {"name": "Nama Nasabah",
        // selector: "HIRE_DATE",
        cell:(row) => row.nama
      },
      {"name": "No Telp",
      // selector: "HIRE_DATE",
      cell:(row) => row.noTelp
    },
    {"name": "No Rekening",
    // selector: "HIRE_DATE",
    cell:(row) => row.norek
  },
        {
          'name': "Saldo Tabungan",
          // selector: "HIRE_DATE",
          cell:(row) => row.saldo
        },
        {
          'name': "User ID",
          // selector: "HIRE_DATE",
          cell:(row) => row.userId!==null?row.userId:''
        },
      ]
  const listSaldo = (e) => {
    // alert('listSaldo')
    e.preventDefault();
    // alert(`http://localhost:3535/api/mst-bank/getByNorek?value=`+norek,)
    //const product = { title, price };
  fetch(`http://localhost:3535/api/mst-bank/getByNorek?value=`+norek)
    .then((response) =>
     // console.log("response",response)
      response.json()
  )
  .then(json => {
    //acountBank,
    // alert("json")
    console.log("json",json)
    setAcountBank(json)
  }
      )
}
  return (
    <CRow>
      <CCol xs={12}>
        <CCard mb={4}>
          <CCardHeader>
            <strong>Cek Saldo</strong>
          </CCardHeader>
          <CCardBody>
            <CCol sm={2}>
              <p className="text-medium-emphasis small">
                Masukkan Nomor Rekening:
              </p>
              <CFormInput
                  className="col-sm-5"
                  type="text"
                  placeholder="Nomor Rekening"
                  aria-label="default input example"
                  onChange={(e) =>
                    {setNorek(e.target.value)
                      setDisabled(false)
                    }}
              />
            </CCol>
          </CCardBody>
          <CCardFooter>
            <div>
              <div>
                <div>
                  <button className="btn btn-info" disabled={disabled}  onClick={listSaldo}>Submit</button>
                  &nbsp;
                  <button className="btn btn-secondary" >Batal</button>&nbsp;
<DataTable
columns={columns}
          data={acountBank.rows}
          theme="solarized"
          selectableRows
          />
                </div>
              </div>
            </div>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default setor
