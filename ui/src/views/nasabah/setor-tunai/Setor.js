import React from 'react'
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
  return (
    <CRow>
      <CCol xs={12}>
        <CCard mb={4}>
          <CCardHeader>
            <strong>Setor Tunai</strong>
          </CCardHeader>
          <CCardBody>
            <CCol sm={2}>
              <p className="text-medium-emphasis small">
                Masukkan Nomor Rekening:
              </p>
              <CFormInput
                  className="col-sm-2"
                  type="text"
                  placeholder="Nomor Rekening"
                  aria-label="default input example"
              />
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

export default setor
