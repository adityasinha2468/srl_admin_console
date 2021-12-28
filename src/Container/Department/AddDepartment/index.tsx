import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {useParams, useHistory, Link} from 'react-router-dom'
import axios from "axios"
interface dropDown {
  value:string|number 
  label:string
}

interface DepartmentFrom {
  department_name: string | number
  city: string
  center_type_ids:  dropDown []
  contact_persons: dropDown []
  is_active:any
}

const initialState = {
  department_name: '',
  city: '',
  center_type_ids: [],
  contact_persons: [],
  is_active:''
}

const AddDepartment = () => {
  const {id} = useParams<any>()
  let history = useHistory()
  const [state, setState] = useState<DepartmentFrom>(initialState)
  const [contactPersonsData, setContactPersons] = useState<any>([])
  const [centerTypeIdsData, setCenterTypeIds] = useState<any>([])

  useEffect(() => {
    allApiCall()
  }, [])

  const allApiCall = async () => {
    let contactPersonsData: any = [],
      centerTypeIdsList: any = []
    const respContactPersons = await getContactPersons()
    const respCenterTypeIds = await getCenterTypeIds()
    if (respContactPersons.data.title === 'success') {
      contactPersonsData = respContactPersons.data.data
    }
    if (respCenterTypeIds.data.title === 'success') {
      centerTypeIdsList = respCenterTypeIds.data.data
    }

    await getDepartment({contactPersonsData, centerTypeIdsList})
  }
  const getDepartment = ({
    contactPersonsData,
    centerTypeIdsList,
  }: {
    contactPersonsData: any
    centerTypeIdsList: any
  }) => {
    if (id) {
      axios
        .post('/department/get', {id})
        .then(function (response) {
          // handle success
          if (response?.status === 200) {
            let obj = {...response.data.data}
            obj.contact_persons = contactPersonsData
              .filter((a: any) =>
                response.data.data.contact_persons.split(',').find((b: any) => b == a.id)
              )
              .map((a: any) => ({value: a.id, label: a.name}))
            obj.center_type_ids = centerTypeIdsList
              .filter((a: any) =>
                response.data.data.center_type_ids.split(',').find((b: any) => b == a.id)
              )
              .map((a: any) => ({value: a.id, label: a.center_type}))
            setState(obj)
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error, 'error')
        })
    }
    setContactPersons(contactPersonsData.map((a: any) => ({value: a.id, label: a.name})))
    setCenterTypeIds(centerTypeIdsList.map((a: any) => ({value: a.id, label: a.center_type})))
  }
  const getContactPersons = async () => {
    // Make a request for a user with a given ID
    return axios.post('/listusers')
  }

  const getCenterTypeIds = async () => {
    // Make a request for a user with a given ID
    return axios.post('/centertype/listcentertypes')
  }

  const handleChange = ({target: {name, value}}: any) => {
    setState({...state, [name]: value})
  }

  const handleSubmit = () => {
    const payload = {
      "id": id?id:undefined,
    "department_name":state.department_name,
    "city":state.city,
    "center_type_ids":(state.center_type_ids.map((a:any)=>a.value)).toString(),
    "contact_persons":(state.contact_persons.map((a:any)=>a.value)).toString(),
    "is_active":id?state.is_active:undefined
    }
    const url = id ? '/department/update' : '/department/add'
    axios
      .post(url, payload)
      .then(function (response) {
        // handle success
        history.push('/department')
      })
      .catch(function (error) {
        // handle error
        console.log(error, 'error')
      })
      .then(function () {
        // always executed
      })
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Department Name</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='text'
                    name='department_name'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Department Name'
                    onChange={handleChange}
                    value={state.department_name}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>City</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='text'
                    name='city'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='City'
                    onChange={handleChange}
                    value={state.city}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Center Types</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={true}
                    value={state.center_type_ids}
                    onChange={(a) => {
                      handleChange({target: {name: 'center_type_ids', value: a}})
                    }}
                    options={centerTypeIdsData}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Contact Persons</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={true}
                    value={state.contact_persons}
                    onChange={(a) => {
                      handleChange({target: {name: 'contact_persons', value: a}})
                    }}
                    options={contactPersonsData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card-footer d-flex justify-content-end py-6 px-9'>
        <Link to="/department" style={{marginRight:"15px"}}>
        <button type='submit' className='btn btn-primary' onClick={handleSubmit}> Cancel </button> </Link> 
          <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
            {id ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default AddDepartment
