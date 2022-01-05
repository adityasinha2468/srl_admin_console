/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { CSVLink } from "react-csv";

import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {BrowserRouter, Switch, Route, useLocation, Link, useRouteMatch} from 'react-router-dom'
type Props = {
  className: string
}

const CollectioncenterList: React.FC<Props> = ({className}) => {
  const [collectioncenterList, setCollectioncenterList] = useState<any>([])

  useEffect(() => {
    getCollectioncenterList()
  }, [])

  const getCollectioncenterList = () => {
    // Make a request for a user with a given ID
    axios
      .post('/cc/list')
      .then(function (response) {
        // handle success
        console.log(response, 'response')
        if (response?.data?.data[0]) {
          setCollectioncenterList(response.data.data)
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

  const deleteCollectioncenter = (id: number) => {
    axios
      .post('/cc/delete', {id})
      .then(function (response) {
        // handle success
        console.log(response, 'response')
        if(response.data.status){
            getCollectioncenterList();
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

  

  console.log(collectioncenterList, 'collectioncenterList')
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
              data={collectioncenterList} 
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
            <Link to={'collectioncenter/addcollectioncenter'}>
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              New Collection Center
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
                <th className='min-w-140px'>Auditor Name</th>
                <th className='min-w-120px'>Center Name</th>
                <th className='min-w-100px '>Center Type</th>
                <th className='min-w-50px '>Departments</th>
                <th className='min-w-50px '>Location</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {(collectioncenterList || []).map((item: any, key: number) => {
                return (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.auditor_name}</td>
                    <td>{item.center_name}</td>
                    <td>{item.center_type}</td>
                    <td>{item.departments}</td>
                    <td>{item.location}</td>
                    <td>
                      <div className='d-flex justify-content-end flex-shrink-0'>
                        <Link 
                        to={`collectioncenter/editCollectioncenter/${item.id}`}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <KTSVG
                            path='/media/icons/duotune/art/art005.svg'
                            className='svg-icon-3'
                          />
                        </Link>
                        <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          onClick={() => {
                            deleteCollectioncenter(item?.id)
                          }}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-3'
                          />
                        </a>
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

export default CollectioncenterList;
