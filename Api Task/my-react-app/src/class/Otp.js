import axios from 'axios';
import React, { useRef, useState } from 'react'
import OtpInput from "otp-input-react"


export const Otp = () => {

    const[otp,setOtp]=useState("")
   

  return (
    <div className='container mt-5'>
      <h3>ENTER OTP</h3>
      <OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType='number' disable={false} autoFocus ></OtpInput>
     <button className='btn btn-successnpm start
      mt-4'>Verify</button>
    
    </div>
  );
}
