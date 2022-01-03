


/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useHistory} from 'react-router-dom'
import {useFormik} from 'formik'
import * as auth from '../redux/AuthRedux'
import {forgotPassword} from '../redux/AuthCRUD'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

const loginSchema = Yup.object().shape({
    passwordValue: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('New Password is required'),
    confirmPasswordValue: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Confirm Password is required'),
})



const initialValues = {
    passwordValue: '',
    confirmPasswordValue: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/
type Props = {
    data: any,
    email:any
  }
const ResetPassword: React.FC<Props> = ({data,email}) => {

    let history = useHistory();

    const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      forgotPassword(values.passwordValue, values.confirmPasswordValue, data.data.user_id.toString())
          .then((res) => {
            setLoading(false); 
            setSubmitting(false);
           console.log("res", res);
           let {status, message} : any = res.data;
            if(status === false) {
                setStatus(message);
            } else {
                document.location.href = "/auth/login";
            }
          
          })
          .catch(() => {
            setLoading(false)
            setSubmitting(false)
            setStatus('There are some error');
          })
     
    },
  })



 
  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Reset Password</h1>
        
      </div>
      <div className='text-gray-400 fw-bold fs-4'>Please create your new password</div>

      {/* begin::Heading */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) }


      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>New password</label>
        <input
          placeholder='New password'
          {...formik.getFieldProps('passwordValue')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.passwordValue && formik.errors.passwordValue},
            {
              'is-valid': formik.touched.passwordValue && !formik.errors.passwordValue,
            }
          )}
          type='text'
          name='passwordValue'
          autoComplete='off'
        />
        {formik.touched.passwordValue && formik.errors.passwordValue && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.passwordValue}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
      <label className='form-label fs-6 fw-bolder text-dark'>Confirm password</label>
        <input
          type='text'
          autoComplete='off'
          placeholder='Confirm password'
          {...formik.getFieldProps('confirmPasswordValue')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.confirmPasswordValue && formik.errors.confirmPasswordValue,
            },
            {
              'is-valid': formik.touched.confirmPasswordValue && !formik.errors.confirmPasswordValue,
            }
          )}
        />
        {formik.touched.confirmPasswordValue && formik.errors.confirmPasswordValue && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.confirmPasswordValue}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'> Save Password</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

      
      </div>
      {/* end::Action */}
    </form>
  )
}
export default ResetPassword
