import React, { useState, useEffect } from 'react'
import { url } from '../../../Constanta';
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CCardFooter,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { async } from 'regenerator-runtime'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const doLogin = async (e) => {
    e.preventDefault();
    const login = `${url}/authority/login`;
    // localhost:3535/authority/login
    // ? `${url}/api/masterpelanggan/update/${idPelanggan}`

    const method = "POST";
    const data = { username, password };
    const response = await fetch(login, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) =>
    {
    // alert('anda berhasil login')
      return  response.json()
    }
    // alert('anda berhasil login')
     // console.log("response",response)


  )
  .then(json => {
    //acountBank,
    console.log("json",json.data.count)
// alert('qweqwe')
if (json.data.count > 0)
{
    json.data.rows.map((row) =>
      {
        localStorage.setItem("nama",row.nama)
        console.log("row ke-",row)
        localStorage.setItem('hakakses', JSON.stringify(row.HAKAKSEs));
        window.location="/"
        // row.HAKAKSEs.map((hakakses)=>{
        //   console.log("hakakses ROLE",hakakses.ROLE)
        //   localStorage.setItem('ROLE', JSON.stringify(hakakses.ROLE));
        // }

        // )
      }
      )

}else{
 alert("Invalid Login BOSS!")

}




    // setAcountBank(json)
  }
  )


    // if (response.ok) {
    //   console.log(response)
    //   console.log('masuk')
    // } else {
    //   console.error("Failed to add or edit customer data");
    // }
  };




  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username"
                      onChange={(e) =>
                        {setUsername(e.target.value)
                          // setDisabled(false)
                        }}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) =>
                          {setPassword(e.target.value)
                            // setDisabled(false)
                          }}
                      />
                    </CInputGroup>
                    <CCardFooter>
            {/* <div>
              <div> */}
                {/* <div> */}
                  {/* <button className="btn btn-info"  onClick={doLogin}>Login</button> */}
                  {/* </div> */}
                  </CCardFooter>
                    <CRow>
                      <CCol xs={6}>

                        <CButton color="primary" className="px-4" onClick={doLogin}>
                          Login
                        </CButton>

                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    {/* <h2>Sign up</h2> */}
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      {/* <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton> */}
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
