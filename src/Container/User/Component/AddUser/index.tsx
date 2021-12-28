import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {useParams, useHistory, Link} from 'react-router-dom'
import axios from "axios"
interface Props {}

interface UserFrom {
  name: string
  email: string
  mobile_number: string
}

const initialState = {
  name: '',
  email: '',
  mobile_number: '',
}

const AddUser = (props: Props) => {
  const {id} = useParams<any>()
  let history = useHistory()
  const [state, setState] = useState<UserFrom>(initialState)
  const [rolesValue, setRolesValue] = useState<any>([])
  const [rolesList, setRolesList] = useState<any>([])

  useEffect(() => {
    allApiCall()
  }, [])
  const allApiCall = async () => {
  await  getRoles();
    if (id) {
      await  getuser();
    }
  }
  const getuser = () => {
    axios
      .post('/getuser', {id})
      .then(function (response) {
        if (response?.status === 200) {
          setState({
            ...response.data.data,
          })
          setRolesValue(response?.data?.data?.roles.map((a: any) => ({value: a.id, label: a.role})))
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error, 'error')
      })
  }

  const getRoles = () => {
    axios
      .get('/getuserroles')
      .then(function (response) {
        if (response?.status === 200) {
          setRolesList(response.data.data.map((a: any) => ({value: a.id, label: a.role})))
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error, 'error')
      })
  }

  const handleChange = ({target: {name, value}}: any) => {
    setState({...state, [name]: value})
  }

  const handleSubmit = () => {
    const payload = {
      id: id ? id : undefined,
      name: state.name,
      email: state.email,
      mobile_number: state.mobile_number,
      password: id ? undefined : '123456',
       is_active: 1,
      roles:rolesValue.map((a:any)=>a.value).toString()
    }

    const url = id ? '/updateuser' : '/adduser'
    axios
      .post(url, payload)
      .then(function (response) {
        // handle success
        history.push('/user')
      })
      .catch(function (error) {
        // handle error
        console.log(error, 'error')
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
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Name</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='text'
                    name='name'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Name'
                    onChange={handleChange}
                    value={state.name}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Email</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='text'
                    name='email'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Email'
                    onChange={handleChange}
                    value={state.email}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Mobile Number</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='text'
                    name='mobile_number'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Mobile Number'
                    onChange={handleChange}
                    value={state.mobile_number}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Roles</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={true}
                    value={rolesValue}
                    onChange={(a) => {
                      setRolesValue(a)
                    }}
                    options={rolesList}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card-footer d-flex justify-content-end py-6 px-9'>
        <Link to="/user" style={{marginRight:"15px"}}>
        <button type='submit' className='btn btn-primary' > Cancel </button> </Link> 
          <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
            {id ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default AddUser
