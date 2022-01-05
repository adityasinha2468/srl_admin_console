/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import { CSVLink } from "react-csv";

import {BrowserRouter, Switch, Route, useLocation, Link, useRouteMatch} from 'react-router-dom'
type Props = {
  className: string
}

const UserList: React.FC<Props> = ({className}) => {
  const [userList, setUserList] = useState<any>([])

  useEffect(() => {
    getCenterTypeList()
  }, [])

  
  const getCenterTypeList = async() => {
    let data:any  = [];
 
    // Make a request for a user with a given ID
    axios
      .post('/centertype/listcentertypes')
      .then(function (response) {
        // handle success
        if (response?.data?.data[0]) {
          setUserList(response.data.data.map((a:any)=>{
            return a;
          }))
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error, 'error')
      })
  }



  const handleChnageStatus = (obj:any) => {
    const {id, is_active}  = obj
   
    axios
    .post('/centertype/activedeactivatecentertype',{id, is_active:is_active?0:1 })
    .then(function (response) {
      // handle success
     if(response.data.title === "success"){
       console.log(response);
       
      getCenterTypeList();
       
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
          title='Click to add a user'
        >

          <CSVLink 
              data={userList} 
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
            <Link to={'centertype/addCentertype'}>
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
             New  Center Type
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
                <th className='min-w-140px'>Center Type</th>
                <th className='min-w-50px '>Status</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {(userList || []).map((item: any, key: number) => {
                return (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.center_type}</td>
                    <td>{item.is_active === 1 ? <span style={{color:"green"}}>Active</span> : <span style={{color:"red"}}>InActive</span> }</td>
                    <td>
                      <div className='d-flex justify-content-end flex-shrink-0'>
                        <Link 
                        to={`centertype/editCentertype/${item.id}`}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <KTSVG
                            path='/media/icons/duotune/art/art005.svg'
                            className='svg-icon-3'
                          />
                        </Link>
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

export default UserList
