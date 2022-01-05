import React, {useState, useEffect,} from 'react'
import Select from 'react-select'
import {useParams, useHistory, Link} from 'react-router-dom'
import axios from 'axios'
import { useSelector, RootStateOrAny} from 'react-redux'

interface Props {}

interface UserFrom {
  user_id:any,
  target:any,
  start_date:any,
  end_date:any,
  type:any,
  target_type:any,
  created_by:any
}

const initialState = {
  user_id:"",
  target:"",
  start_date:"",
  end_date:"",
  type:"",
  target_type:"",
  created_by:""

}

const targetTypeOptions = [{label:"Monthly", value:"M"},{label:"Weekly", value:"W"}];
const EditChecklist = (props: Props) => {
  const {id} = useParams<any>()
  let history = useHistory()
  const [state, setState] = useState<UserFrom>(initialState);
  const {user} = useSelector((state: RootStateOrAny) => state.auth)

//center type list
const [auditorList, setAuditorList] = useState<any>([]);
const [auditorValue, setAuditorValue] = useState<any>([]);


const {user_id, target, start_date, end_date, type, target_type, created_by} = state;

  useEffect(() => {
    allApiCall()
  }, [])
  const allApiCall = async () => {
    let userRolesList: any = [];
     const userListDataRes =   await getUserByRoles();
     if (userListDataRes.data.title === 'success') {
      if (userListDataRes.data.data) {
        userListDataRes.data.data.map((a:any)=>{
          userRolesList.push({
             label:a.name,
             value:a.id
           })
        })
        setAuditorList(userRolesList)
      }
     }

    await getCheckList({userRolesList});
  }

  const getCheckList = async({userRolesList}:{userRolesList: any}) => {
    try {
      const result = await axios.post('/gettarget', {id : id * 1});
     let responseData = result.data.data
     console.log("responseData",responseData)
     let userTypeValue = userRolesList.length > 0 && userRolesList.find((el: any) => el.value === responseData.user_id)
     setAuditorValue(userTypeValue);
     setState({
       ...state,
       target:responseData.target,
       start_date:responseData.start_date,
       end_date:responseData.end_date,
       type: targetTypeOptions.filter(a => a.value === responseData.type),
       target_type:responseData.target_type,
       created_by:responseData.created_by
     })
     
    } catch (error) {
       console.log(error);
       
    }
  }

  const getUserByRoles = async() => {
   return  axios
      .post('/listusersbyrole', {role_id:1});
      
  }


 

  const handleChange = ({target: {name, value}}: any) => {
    setState({...state, [name]: value})
  }

  const handleSubmit = () => {
    const payload = {
       id:id?id:undefined,
       user_id:auditorValue.value,
       target:target,
       start_date:start_date,
       end_date:end_date,
       type:type.value,
       target_type:"Audit",
       created_by:user.id,
       updated_by:id?user.id : undefined
    }
   

    const url = '/updatetargets'
    axios
      .post(url, payload)
      .then(function (response) {
        // handle success
        history.push('/audit')
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
          <h3 className='fw-bolder m-0'>Add checklist module</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <div className='card-body border-top p-9'>

        <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Auditor</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={false}
                    value={auditorValue}
                    onChange={(a: any) => {
                      setAuditorValue(a)
                    }}
                    options={auditorList}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Target</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='number'
                    name='target'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Target'
                    onChange={handleChange}
                    value={target}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Type</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={false}
                    value={type}
                    onChange={(a: any) => {
                       setState({...state, type:a})
                    }}
                    options={[{label:"Monthly", value:"M"},{label:"Weekly", value:"W"}]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Start date</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='date'
                    name='start_date'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Yes score'
                    onChange={handleChange }
                    value={start_date}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>End date</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='date'
                    name='end_date'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Yes score'
                    onChange={handleChange}
                    value={end_date}
                  />
                </div>
              </div>
            </div>
          </div>
         
        </div>
        <div className='card-footer d-flex justify-content-end py-6 px-9'>
        <Link to="/audit" style={{marginRight:"15px"}}>
        <button type='submit' className='btn btn-primary' > Cancel </button> </Link> 
          <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
            {id ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default EditChecklist
