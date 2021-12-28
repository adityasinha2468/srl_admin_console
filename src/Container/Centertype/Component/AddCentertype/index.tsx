import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {useParams, useHistory, Link} from 'react-router-dom'
import axios from 'axios'

interface Props {}

interface UserFrom {
  center_type: string,
  center_type_id:String,
  is_active:Number,
}

const initialState = {
  center_type:"",
  center_type_id:"",
  is_active:1
}

const AddUser = (props: Props) => {
  const {id} = useParams<any>()
  let history = useHistory()
  const [state, setState] = useState<UserFrom>(initialState)
const {center_type,center_type_id, is_active} = state;

  useEffect(() => {
    allApiCall()
  }, [])
  const allApiCall = async () => {
    if(id) {
      getCenterType()
    }
  }

  const getCenterType = async() => {
    try {
      const result = await axios.post('centertype/getcentertype', {id});
     console.log("result",result);
     let responseData = result.data.data
     setState({
       ...state,
       center_type:responseData.center_type,
       center_type_id:responseData.id,
       is_active:responseData.is_active
     })
     
    } catch (error) {
       console.log(error);
       
    }
  }

 

  const handleChange = ({target: {name, value}}: any) => {
    setState({...state, [name]: value})
  }

  const handleSubmit = () => {
    const payload = {
      center_type:center_type,
       id: id ? center_type_id:undefined,
       is_active: is_active,
    }
   

    const url = id ? '/centertype/updatecentertype' : '/centertype/addcentertype'
    axios
      .post(url, payload)
      .then(function (response) {
        // handle success
        history.push('/centertype')
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
          <h3 className='fw-bolder m-0'>Add center type</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Center type name</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='text'
                    name='center_type'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Center type name'
                    onChange={handleChange}
                    value={center_type}
                  />
                </div>
              </div>
            </div>
          </div>
        
        </div>
        <div className='card-footer d-flex justify-content-end py-6 px-9'>
        <Link to="/centertype" style={{marginRight:"15px"}}>
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
