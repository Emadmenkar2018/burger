import React from 'react'
import { DatePicker, Space } from 'antd';

const UDatePicker = (props) => {

    const {onChange ,onOk} =props 

    return (
        <Space direction="vertical" size={12}>
            <DatePicker showTime onChange={onChange} onOk={onOk} /> 
        </Space>
    )
}
export default UDatePicker