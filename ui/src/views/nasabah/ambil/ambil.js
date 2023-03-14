import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CCardFooter,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const Ambil = () => {

  cancelButton = () => {
    document.getElementById("input-rek").reset();
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard mb={4}>
          <CCardHeader>
            <strong>Ambil Tunai</strong>
          </CCardHeader>
          <CCardBody>
            <CCol sm={3}>
              <form id="input-rek">
              <p className="text-medium-emphasis small w-full">
                Masukkan Nomor Rekening:
              </p>
              <CFormInput
                  className="col-sm-2"
                  type="text"
                  placeholder="Nomor Rekening"
                  aria-label="default input example"
              />
              </form>
            </CCol>
          </CCardBody>
          <CCardFooter>
            <div>
              <div>
                <div>
                  <button class="btn btn-info" type="button">Submit</button>
                  &nbsp;
                  <button class="btn btn-secondary" type="button">Batal</button>&nbsp;
                </div>
              </div>
            </div>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Ambil
