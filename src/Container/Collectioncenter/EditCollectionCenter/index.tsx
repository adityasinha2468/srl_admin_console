import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import Select from 'react-select'

interface Props {}

interface CollectioncenterFrom {
    center_code:any,
    center_name:any,
    center_type_id:any,
    location:any,
    latitude:any,
    longitude:any,
    premise_size:any,
    rsm_id:any,
    auditor_id:any,
    cc_id:any,
    abm_id:any,
    ch_id:any,
    bh_id:any,
    department_id:any,
}

const initialState = {
       center_code:"",
        center_name:"",
        center_type_id:"",
        location:"",
        latitude:"",
        longitude:"",
        premise_size:"",
        rsm_id:1,
        auditor_id:1,
        cc_id:7,
        abm_id:6,
        ch_id:8,
        bh_id:9,
        department_id:""
}

const EditCollectioncenter = (props: Props) => {
  const {id} = useParams<any>()
  let history = useHistory();
  const [state, setState] = useState<CollectioncenterFrom>(initialState)

  //roles
  const [rolesValue, setRolesValue] = useState<any>([])
  const [rolesList, setRolesList] = useState<any>([])
  //departmernt
  const [departmentpList, setDepartmentList] = useState<any>([])
  const [departmentValue, setDepartmentValue] = useState<any>([])

  //center type list
  const [centerTypeList, setCenterTypeList] = useState<any>([])
  const [centerTypeValue, setCenterTypeValue] = useState<any>([])

  //Userlist base on rules 
 const [userRoles, setUserRoles] = useState <any>([])

 //All users
 const [allUsers, setAllUsers] = useState <any>([])

  //Destruct from state
  const {center_code,center_name,center_type_id,location,longitude,latitude,premise_size, rsm_id, auditor_id, cc_id,abm_id,ch_id,bh_id,department_id} = state;




  useEffect(() => {
    allApiCall();
  },[])


  const allApiCall = async () => {
      let centerTypeListData: any = [];
      let departmentListData: any = [];
      let allUsersListData: any = [];
      const centerTypeListDataRes =  await getCenterTypeList();
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
   const departmentTypeListRes =  await getDepartmentList();
   if (departmentTypeListRes.data.title === 'success') {
    if(departmentTypeListRes.data.data) {
        departmentTypeListRes.data.data.map((department:any)=>{
            departmentListData.push({
                label:department.department_name,
                value:department.id
            })
         })
         setDepartmentList(departmentListData)
    }
           
} 
  const allUsersListRes =   await getUsers();
  if(allUsersListRes.data.title === 'success') {
    allUsersListData = allUsersListRes.data.data;
     setAllUsers(allUsersListRes.data.data)

  }
      await getRoles();
     
    
      await getCollectionCenter({centerTypeListData,departmentListData,allUsersListData});
    }

    //Get cc 
    const getCollectionCenter = ({centerTypeListData,departmentListData,allUsersListData}:{centerTypeListData:any,departmentListData:any,allUsersListData:any}) => {
        axios
        .post('/cc/get', { id:id})
        .then(function (response) {    
            console.log("allUsersListData",allUsersListData);
                    
           let resData = response.data.data;
           let centerTypeValue = centerTypeListData.length > 0 && centerTypeListData.find((el: any) => el.value === resData.center_type_id)
           let departmentValue = departmentListData.length > 0 && departmentListData.filter((a :any) => resData.department_id.split(',').find((b:any) =>b == a.value)).map((el:any) => ({value:el.value, label:el.label}))
           setCenterTypeValue(centerTypeValue);
           setDepartmentValue(departmentValue);
           
           const getUserByid = (id:any) => {
            let user = allUsersListData.find((el:any) => el.id ===id)
             return user &&  {label:user.name, value:user.id} 
           } 

           setState({
               ...state,
               center_code:resData.center_code,
               center_name:resData.center_name,
               premise_size:resData.premise_size,
               location:resData.location,
               latitude:resData.latitude,
               longitude:resData.longitude,
               rsm_id:getUserByid(resData.rsm_id),
               auditor_id:getUserByid(resData.auditor_id),
               cc_id:getUserByid(resData.cc_id),
               abm_id:getUserByid(resData.abm_id),
               ch_id:getUserByid(resData.ch_id),
               bh_id:getUserByid(resData.bh_id),

           })
           
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


  const getUsers = () => {
      return     axios
      .post('/listusers', {})
    // axios
    // .post('/listusers', {})
    // .then(function (response) {
    //   if (response?.status === 200) {        
    //     setAllUsers(response.data.data)
    //   }
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error, 'error')
    // })
  }
  const getDepartmentList = async() => {
      // Make a request for a user with a given ID
      return axios.post('/department/list');
    // axios
    //   .post('/department/list')
    //   .then(function (response) {
    //     // handle success
    //     if (response?.data?.data[0]) {
    //       let departmentListArray:any = []
    //       response.data.data.map((department: any) => {
    //         departmentListArray.push({
    //           label:department.department_name,
    //           value:department.id
    //         })
    //       })
    //       setDepartmentList(departmentListArray)
    //     }
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error, 'error')
    //   })
    //   .then(function () {
    //     // always executed
    //   })
  }

    
  const getCenterTypeList = async() => {
    return axios.post('/centertype/listcentertypes');
    // axios
    //   .post('/centertype/listcentertypes')
    //   .then(function (response) {
    //     // handle success
    //     if (response?.data?.data[0]) {
    //       let centerTypeArray : any = [];
        
    //      response.data.data.map((a:any)=>{
    //          centerTypeArray.push({
    //            label:a.center_type,
    //            value:a.id
    //          })
    //       })

    //       setCenterTypeList(centerTypeArray)
    //     }
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error, 'error')
    //   })
  }

  const handleChange = ({target: {name, value}}: any) => {
    setState({...state, [name]: value})
  }

  const handleSubmit = () => {
  
    const payload = {
      id:id * 1,
      center_code,
      center_name,
      center_type_id:centerTypeValue.value,
      location,
      latitude,
      longitude,
      premise_size,
      rsm_id:rsm_id? rsm_id.value : "",
      auditor_id: auditor_id? auditor_id.value:"",
      cc_id: cc_id?cc_id.value:"",
      abm_id: abm_id ? abm_id.value:"",
      ch_id:ch_id?ch_id.value:"",
      bh_id:bh_id?bh_id.value:"",
      department_id:departmentValue.map((a:any)=>a.value).toString(),
      is_active:1
    }
console.log("payload", payload);

    const url = '/cc/update' 
    axios
      .post(url, payload)
      .then(function (response) {
        // handle success
        console.log(response, 'response')
        history.push("/collectioncenter");
      })
      .catch(function (error) {
        // handle error
        console.log(error, 'error')
      })
      .then(function () {
        // always executed
      })
  }


  //Options
  const getUserByRoleId = (allUsers:any, filterId:any) => {
   return allUsers.filter((el: any) => (el.roles.includes(filterId))).map((el: any) =>({value:el.id, label:el.name}));
  }

  let auditUserOptions: any=  [];
  let ccUserOptions: any = [];
  let abmUserOptions: any = [];
  let bhUserOptons: any = []
  let departmentOptions: any = [];
  if(allUsers && allUsers.length > 0) {
   auditUserOptions = getUserByRoleId(allUsers, "1");
   ccUserOptions = getUserByRoleId(allUsers, "3");
   abmUserOptions = getUserByRoleId(allUsers, "4");
   bhUserOptons = getUserByRoleId(allUsers, "5");
   departmentOptions = getUserByRoleId(allUsers, "8")
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
              <label className='col-lg-4 col-form-label  fw-bold fs-6'>Center Code</label>
              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>
                    <input
                      type='text'
                      name='center_code'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Center Code'
                      onChange={handleChange}
                      value={state.center_code}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label  fw-bold fs-6'>Center Name</label>
              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>
                    <input
                      type='text'
                      name='center_name'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Center Name'
                      onChange={handleChange}
                      value={state.center_name}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label  fw-bold fs-6'>Premise Size</label>
              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>
                    <input
                      type='text'
                      name='premise_size'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Premise Size'
                      onChange={handleChange}
                      value={state.premise_size}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label  fw-bold fs-6'>Location</label>
              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>
                    <input
                      type='text'
                      name='location'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Location'
                      onChange={handleChange}
                      value={state.location}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label  fw-bold fs-6'>Latitude</label>
              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>
                    <input
                      type='text'
                      name='latitude'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Latitude'
                      onChange={handleChange}
                      value={state.latitude}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label  fw-bold fs-6'>Longitude</label>
              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>
                    <input
                      type='text'
                      name='longitude'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='longitude'
                      onChange={handleChange}
                      value={state.longitude}
                    />
                  </div>
                </div>
              </div>
            </div>
          
            <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>RSM </label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={false}
                    value={state.rsm_id}
                    onChange={(a: any) => {
                      setState({
                        ...state,
                        rsm_id:a
                      })
                    }}
                    options={auditUserOptions}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>AUDITOR </label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={false}
                    value={state.auditor_id}

                    onChange={(a: any) => {
                      setState({
                        ...state,
                        auditor_id:a
                      })
                    }}
                    options={auditUserOptions}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>CC </label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={false}
                    value={state.cc_id}
                    onChange={(a: any) => {
                      setState({
                        ...state,
                        cc_id:a
                      })
                    }}
                    options={ccUserOptions}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>ABM </label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={false}
                    value={state.abm_id}
                    onChange={(a: any) => {
                      setState({
                        ...state,
                        abm_id:a
                      })
                    }}
                    options={abmUserOptions}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>CH </label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={false}
                    value={state.ch_id}
                    onChange={(a: any) => {
                      setState({
                        ...state,
                        ch_id:a
                      })
                    }}
                    options={auditUserOptions}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>BH </label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={false}
                    value={state.bh_id}
                    onChange={(a: any) => {
                      setState({
                        ...state,
                        bh_id:a
                      })
                    }}
                    options={bhUserOptons}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Departments</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={true}
                    value={departmentValue}
                    onChange={(a) => {
                      setDepartmentValue(a)
                    }}
                    options={departmentpList}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label  fw-bold fs-6'>Center Type</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <Select
                    isMulti={false}
                    value={centerTypeValue}
                    onChange={(a) => {
                      setCenterTypeValue(a)
                    }}
                    options={centerTypeList}
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className='card-footer d-flex justify-content-end py-6 px-9'>
          <Link to="/collectioncenter" style={{marginRight:"15px"}}>
        <button type='submit' className='btn btn-primary' > Cancel </button> </Link> 
            <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
              {id?"Update":"Save"} 
              {/* {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )} */}
            </button>
          </div>
      </div>
    </div>
  )
}
export default EditCollectioncenter;
