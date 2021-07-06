import React from 'react'
import { Input,   } from 'antd';
import './FloatingInput.css'

const FloatingInput = (props) => {
    const { placeholder , value} = props


    return (
        <div className="input-container">

            <Input
                type='text'
                value={value}
                placeholder={placeholder}
            />
            {/* <label className={value && 'filled'}  >{placeholder}</label> */}
        </div>

    )

}
export default FloatingInput