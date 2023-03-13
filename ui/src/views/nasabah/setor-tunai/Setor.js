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
} from '@coreui/react'
import { DocsExample } from 'src/components'

const setor = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <strong>Setor Tunai</strong>
          </CCardHeader>
          <CCardBody>This is some text within a card body.</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default setor
