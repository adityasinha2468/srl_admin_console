import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {useParams, useHistory, Link} from 'react-router-dom'
import axios from 'axios'

interface Props {}

interface UserFrom {
  name: string,
  checklist_id:String,
  is_active:Number,
  question:any,
  checklist_module_id:any,
  center_type_ids:any,
  yes_score:any,
  nc_score:any,
  default_days:any,
  nabl:any,
  risk:any,
  patient_care:any,
}

const initialState = {
  name:"",
  checklist_id:"",
  is_active:1,
  question:"",
  checklist_module_id:"",
  center_type_ids:"",
  yes_score:"",
  nc_score:"",
  default_days:"",
  nabl:false,
  risk:false,
  patient_care:false,

}

const EditCheckList = (props: Props) => {
  const {id} = useParams<any>()
  let history = useHistory()
  const [state, setState] = useState<UserFrom>(initialState);

//center type list
const [centerTypeList, setCenterTypeList] = useState<any>([]);
const [centerTypeValue, setCenterTypeValue] = useState<any>([]);

//Checklist module list
const [checklistModule, setChecklistModule] = useState<any>([]);
const [checklistValue, setChecklistValue] = useState<any>([]);

const {name,checklist_id, question, is_active, 
  checklist_module_id, 
  center_type_ids, yes_score, nc_score, 
  default_days, nabl, risk, 
  patient_care } = state;

  useEffect(() => {
    allApiCall()
  }, [])
  const allApiCall = async () => {
   let checklistModuleData: any = [];
   let centerTypeListData: any = [];
   const centerTypeListDataRes  = await getCenterTypeList();
   const checklistDataRes  = await getCheckListModuleList();
    if (centerTypeListDataRes.data.title === 'success') {
        if(centerTypeListDataRes.data.data) {
            centerTypeListDataRes.data.data.map((a:any)=>{
                centerTypeListData.push({
                label:a.center_type,
                value:a.id
                })
            })
            setCenterTypeList(centerTypeListData)
        }
    }

    if (checklistDataRes.data.title === 'success') {
        if(checklistDataRes.data.data) {
            checklistDataRes.data.data.map((a:any)=>{
                checklistModuleData.push({
                label:a.name,
                value:a.id
                })
            })
            setChecklistModule(checklistModuleData)
        }
    }

    await getCheckList({checklistModuleData, centerTypeListData})
  }

  const getCheckList = async({centerTypeListData,checklistModuleData} : {centerTypeListData:any,checklistModuleData:any }) => {
    try {
      const result = await axios.post('/checklist/get', {id : id * 1});
     console.log("result",result);
     let responseData = result.data.data     
     let centerTypeValue = centerTypeListData.length > 0 && centerTypeListData.filter((a :any) => responseData.center_type_ids.split(',').find((b:any) =>b == a.value)).map((el:any) => ({value:el.value, label:el.label}))
     let checklistValue = checklistModuleData.length > 0 && checklistModuleData.find((el: any) => el.value === responseData.checklist_module_id)


     setCenterTypeValue(centerTypeValue);
     setChecklistValue(checklistValue);
     setState({
       ...state,
       name:responseData.name,
       checklist_id:responseData.id,
       is_active:responseData.is_active,
       question:responseData.question,
       yes_score:responseData.yes_score,
       nc_score:responseData.nc_score,
       default_days:responseData.default_days,
       nabl:responseData.nabl,
       risk:responseData.risk,
       patient_care:responseData.patient_care
     })
     
    } catch (error) {
       console.log(error);
       
    }
  }

  const getCenterTypeList = async() => {
    return axios
      .post('/centertype/listcentertypes')
    
  }

  const getCheckListModuleList = async() => {
    let data:any  = [];
 
    // Make a request for a user with a given ID
   return axios
      .post('/checklistmodule/list')
      
  }

 

  const handleChange = ({target: {name, value}}: any) => {
    setState({...state, [name]: value})
  }

  const handleSubmit = () => {
    const payload = {
       question:question,
       id: id ? checklist_id:undefined,
       is_active: is_active,
       checklist_module_id:checklistValue.value,
       center_type_ids:centerTypeValue.map((a:any)=>a.value).toString(),
       yes_score:yes_score,
       nc_score:nc_score,
       default_days:default_days,
       nabl:nabl ? 1 : 0,
       risk:risk ? 1 : 0,
       patient_care:patient_care ? 1 : 0,
    }
   

    const url = id ? '/checklist/update' : '/checklist/add'
    axios
      .post(url, payload)
      .then(function (response) {
        // handle success
        history.push('/checklist')
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
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Question</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='text'
                    name='question'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Question'
                    onChange={handleChange}
                    value={question}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Center type  </label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={true}
                    value={centerTypeValue}
                    onChange={(a: any) => {
                       setCenterTypeValue(a)
                    }}
                    options={centerTypeList}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Checklist module </label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={false}
                    value={checklistValue}
                    onChange={(a: any) => {
                      setChecklistValue(a)
                    }}
                    options={checklistModule}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Yes score</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='number'
                    name='yes_score'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Yes score'
                    onChange={handleChange}
                    value={yes_score}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>NC score</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='number'
                    name='nc_score'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='NC score'
                    onChange={handleChange}
                    value={nc_score}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Default days</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='number'
                    name='default_days'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Default days'
                    onChange={handleChange}
                    value={default_days}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>nabl</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                <div className="form-check form-switch form-check-custom form-check-solid">
                    <input className="form-check-input" type="checkbox" value="" id="flexSwitchChecked"  checked = {nabl}  onChange={(e) => setState({...state, nabl:e.target.checked})}/>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>risk</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                <div className="form-check form-switch form-check-custom form-check-solid">
                    <input className="form-check-input" type="checkbox" value="" id="flexSwitchChecked"  checked = {risk}  onChange={(e) => setState({...state, risk:e.target.checked})}/>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>patient care</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                <div className="form-check form-switch form-check-custom form-check-solid">
                    <input className="form-check-input" type="checkbox" value="" id="flexSwitchChecked"  checked = {patient_care}  onChange={(e) => setState({...state, patient_care:e.target.checked})}/>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card-footer d-flex justify-content-end py-6 px-9'>
        <Link to="/checklist" style={{marginRight:"15px"}}>
        <button type='submit' className='btn btn-primary' > Cancel </button> </Link> 
          <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
            {id ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default EditCheckList
