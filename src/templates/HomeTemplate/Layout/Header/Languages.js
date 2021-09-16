import React from "react";
import { Select } from "antd";



export default function Languages(props) {

  const {handleChange} = props

  const { Option } = Select;



  return (
    <div className="ml-2">
      <Select defaultValue="en" style={{ width: 80 }} onChange={handleChange}>
        <Option value="chi" label="China">
                <div className="demo-option-label-item">
                    <span role="img" aria-label="China">
                    🇨🇳
                    </span>
                    <span className="ml-1">CHI</span> 
                </div>
            </Option>
            <Option value="en" label="USA">
                <div className="demo-option-label-item">
                    <span role="img" aria-label="USA">
                    🇺🇸
                    </span>
                    <span  className="ml-1">EN</span> 
                </div>
            </Option>
            <Option value="vi" label="Korea">
                <div className="demo-option-label-item">
                    <span role="img" aria-label="Korea">
                    🇰🇷
                    </span>
                    <span  className="ml-1">VI</span>
                </div>
            </Option>
        </Select>
      ,
    </div>
  );
}
