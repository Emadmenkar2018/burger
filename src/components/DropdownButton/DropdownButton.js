import React from 'react'
import { Dropdown, Button } from 'antd';


const DropdownButton = (props) => {

    const {
        overlay,
        children, 
        styleName
    } = props

    return (
        <Dropdown 
        className={styleName}
        overlay={overlay}>
            <Button>
                {children}
            </Button>
        </Dropdown>
    )
}

export default DropdownButton