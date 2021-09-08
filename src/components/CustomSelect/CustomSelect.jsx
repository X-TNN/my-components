import React,{useState} from "react";
import { Select } from 'antd';

const { Option } = Select;

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function CustomSelect(props){
    const [searchValue,setSearchValue] = useState(''); //数组解构search的状态
    const [changeValue,setChangeValue] = useState(''); //数组解构change的状态
    
    function onSearch(value) {  //search改变value
        console.log('search:', value);
        setSearchValue(value);
    }
    function onChange(value) {  //change改变value
        console.log('onChange:', value);
        setChangeValue(value);
    }

    let optionsValues = props.datas;  //定义存储options原始数据的变量

    if(searchValue !==''){
        optionsValues = [searchValue,...optionsValues];  //optionsValues存储search的值+原始数据
    }

    if(changeValue !=='' && changeValue !== undefined){
        optionsValues = [changeValue,...optionsValues];  //optionsValues存储change的值+原始数据
    }

    return (
        <Select
            showSearch = {props.searchable}
            style={{ width: 200 }}
            placeholder={props.placeholder || '请选择默认'}
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={props.searchable ? onSearch : null}
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
            clearIcon={<i className='icon-input-close'></i>}
            suffixIcon={
                <>
                  <i className='icon-select-arrow'></i>
                  <i className='icon-search'></i>
                </>
            }
        >
            {
                Array.from(new Set(optionsValues)).map((value) => {   //Array.from(new Set(optionsValues))数组去重
                    return <Option value={value} key={value}>{value}</Option>
                })
            }
        </Select>
    )
}

export default CustomSelect;