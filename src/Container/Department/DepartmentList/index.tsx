/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { CSVLink } from "react-csv";

import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers';

import {BrowserRouter, Switch, Route, useLocation, Link, useRouteMatch} from 'react-router-dom'
// import { instance } from '../../User/Component/UserList';
type Props = {
  className: string
}

const DepartmentList: React.FC<Props> = ({className}) => {
  const [departmentpList, setDepartmentList] = useState<any>([])

  useEffect(() => {
    getDepartmentList()
  }, [])



  const getContactPersons = async () => {
    return axios.post('/listusers')
  }

  const getCenterTypeIds = async () => {
   return axios.post('/centertype/listcentertypes')
  }

  const getDepartmentList = async() => {
    let contactPersonsList:any  = [];
    let centerTypeIds:any  = [];
    let resContactPersons =   await  getContactPersons();
    let resCenterTypeIds =   await  getCenterTypeIds();
    if (resContactPersons?.status === 200) {
      contactPersonsList = resContactPersons.data.data;
    }
    if (resCenterTypeIds?.status === 200) {
      centerTypeIds = resCenterTypeIds.data.data;
     }

    // Make a request for a user with a given ID
    axios
      .post('/department/list')
      .then(function (response) {
        // handle success
        if (response?.data?.data[0]) {
          response.data.data.map((a:any)=>{
            let contact_persons_name:any = [];
            let centerTypeIds_name:any = [];
           
            (a.contact_persons.split(",")).forEach((c:any)=>{
              let match =  contactPersonsList.find((b:any)=> b.id == c)
                if(match){
                  contact_persons_name.push(match.name)
                }
            });
            (a.center_type_ids.split(",")).forEach((c:any)=>{
              let match =  centerTypeIds.find((b:any)=> b.id == c)
                if(match){
                  centerTypeIds_name.push(match.center_type)
                }
            })
            a.contact_persons_name = contact_persons_name.toString()
            a.centerTypeIds_name = centerTypeIds_name.toString()
            return a
          })
          setDepartmentList(response.data.data)
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error, 'error')
      })
      .then(function () {
        // always executed
      })
  }

  const deleteDepartment = (id: number) => {
    axios
      .post('/department/delete', {id})
      .then(function (response) {
        // handle success
        if(response.data.status){
            getDepartmentList();
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error, 'error')
      })
      .then(function () {
        // always executed
      })
  }

  const handleChnageStatus = (obj:any) => {
    const {id, is_active}  = obj
   
    axios
    .post('/department/activedeactivate',{id, is_active:is_active?0:1 })
    .then(function (response) {
      // handle success
     if(response.data.title === "success"){
      getDepartmentList();
     }
    })
    .catch(function (error) {
      // handle error
      console.log(error, 'error')
    })
  }
  

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          {/* <span className='card-label fw-bolder fs-3 mb-1'>Members Statistics</span>
          <span className='text-muted mt-1 fw-bold fs-7'>Over 500 members</span> */}
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a department'
        >
           <CSVLink 
              data={departmentpList} 
              filename="report.csv"  
              target="_blank"
              className='btn btn-sm btn-light-primary me-5'
              >
             Download csv
          </CSVLink>
          <a
            href='#'
            className='btn btn-sm btn-light-primary'
            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
          >
            <Link to={'department/adddepartment'}>
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              New Department
            </Link>
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted'>
                <th className='min-w-40px'>id</th>
                <th className='min-w-140px'>Department Name</th>
                <th className='min-w-120px'>City</th>
                <th className='min-w-100px '>Contact Persons</th>
                <th className='min-w-50px '>Status</th>
                <th className='min-w-50px '>Center Types</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {(departmentpList || []).map((item: any, key: number) => {
                return (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.department_name}</td>
                    <td>{item.city}</td>
                    <td>{item.contact_persons_name}</td>
                    <td>{item.is_active === 1 ? <span style={{color:"green"}}>Active</span> : <span style={{color:"red"}}>InActive</span> }</td>
                    <td>{item.centerTypeIds_name}</td>
                    <td>
                      <div className='d-flex justify-content-end flex-shrink-0'>
                        <Link 
                        to={`department/editDepartment/${item.id}`}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <KTSVG
                            path='/media/icons/duotune/art/art005.svg'
                            className='svg-icon-3'
                          />
                        </Link>
                        {/* <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          onClick={() => {
                            deleteDepartment(item?.id)
                          }}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-3'
                          />
                        </a> */}
                         <span className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1' onClick={()=>{handleChnageStatus(item)}}>
                        {item.is_active === 1?<i className="bi bi-check-square-fill" />
                        :<i className="bi bi-check-square" />}
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default DepartmentList;
