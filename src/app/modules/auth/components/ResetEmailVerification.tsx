
import React, {useState, useEffect} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword} from '../redux/AuthCRUD'
import OtpInput from 'react-otp-input';
import { optVerification } from '../redux/AuthCRUD'
import "./auth.scss"
import { ForgotPassword } from './ForgotPassword'
import ResetPassword from './ResetPassword'
const initialValues = {
  email: '',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})
type Props = {
  data: any,
  email:any
}
const initData = {
  otp: '',
  otpData:'',
  resData:''
}
export const ResetEmailVerification: React.FC<Props> = ({data,email}) => {
  const [loading, setLoading] = useState(false);
  const [state,setState] = useState <any>(initData);
  const [isSuccess, setIsSuccess] = useState <any>(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const {otp, otpData, resData} = state;

  useEffect(() => {
   setState({
     ...state,
     otpData:data
   })
  }, [])

  //submit handler
  const handleOtpSubmit  = () => {
    setLoading(true)
    optVerification(otpData.request_id, otp)
    .then(({data}) => {
      setState({...state, resData:data})
      setLoading(false);
       let {status} : any = data;
       if(status === false) {
        setIsSuccess(false)
       } else {
         setIsSuccess(true)
       }
    })
    .catch(() => {
      setLoading(false)
     
    })
  }
  return (
    <>
    {isSuccess === false && (
 <form
 className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
 noValidate
 id='kt_login_password_reset_form'
>
 <div className='text-center mb-10'>
   {/* begin::Title */}
   <h1 className='text-dark mb-3'>Email Verification</h1>
   {/* end::Title */}

   {/* begin::Link */}
   <div className='text-gray-400 fw-bold fs-4'>Please enter the OTP received on  {email}</div>
   {/* end::Link */}
 </div>

 {/* begin::Title */}
 {resData?.status === false && (
   <div className='mb-lg-15 alert alert-danger'>
     <div className='alert-text font-weight-bold'>
     Incorrect OTP, please check your email and try again            </div>
   </div>
 )}

 {hasErrors === false && (
   <div className='mb-10 bg-light-info p-8 rounded'>
     <div className='text-info'>Sent password reset. Please check your email</div>
   </div>
 )}
 {/* end::Title */}
 <OtpInput
   value={otp}
   onChange={(otp: any) => setState({...state, otp:otp})}
   numInputs={4}
   separator={<span>-</span>}
   shouldAutoFocus
   containerStyle="otp__wrapper"
   inputStyle = "otp__input"
/>
<div className='d-flex flex-wrap justify-content-center pb-lg-0'>
<button
   type='button'
   id='kt_login_password_reset_form_cancel_button'
   className='btn btn-lg btn-light-primary fw-bolder me-4'
   onClick={() => setState({...state, otp:''})}
 >
 Clear
 </button>
 <button
   type='button'
   id='kt_password_reset_submit'
   className='btn btn-lg btn-primary fw-bolder '
   onClick={handleOtpSubmit}
   disabled = {otp.length <4}
 >
 <span className='indicator-label'>Submit</span>
 {loading && (
   <span className='indicator-progress'>
   Please wait...
   <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
   </span>
 )}
</button>

</div>

 {/* end::Form group */}
</form>
    ) }
     
      {resData && resData.data && <ResetPassword email = {email}   data = {resData}/>}
    </>
  )
}

