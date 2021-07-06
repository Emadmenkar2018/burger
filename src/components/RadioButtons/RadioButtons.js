import React from 'react'
import { Radio } from 'antd';


const RadioButtons = (props) => {

    const {
        value,
        onChange,
        inputs
    } = props
 
    return (
        <Radio.Group
            onChange={onChange}
            value={value}
        >
            {inputs.map((item, index) => {
                return (
                    <Radio key={index} value={index + 1}>{item}</Radio>
                )

            })}
        </Radio.Group>
    )
}

export default RadioButtons