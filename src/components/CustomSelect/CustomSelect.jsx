import React,{useState} from "react";
import { Select, Spin  } from 'antd';
//const { Option, OptGroup} = Select;


function CustomSelect(props) {
    let optionValues = props.datas;  //定义存储原数据options的变量
    const [userValue, setUserValue] = useState(''); //用户输入的值
    const [userOption, setUserOption] = useState(); //用户选中的自定义option
    const [defaultValue, setDefaultValue] = useState(getDefaultValue());  //默认选项

    function getDefaultValue() {    
        if(props.priorOption !== undefined) {
            return props.priorOption.label;
        }
        
        //if(props.defaultValue !== undefined && props.datas.map((obj) => obj.label.toLowerCase()).includes(props.defaultValue.label.toLowerCase())) {
        if(props.defaultValue !== undefined) {
            return props.defaultValue.label;
        }
        return props.datas[0] && props.datas[0].label;
    }

    function onSearch(value) {  //search改变value
        console.log('search:', value);
        //如果用户设置了优先选项，并且输入的value和优先选项的值相同，则不设置uservalue
        if(props.priorOption !== undefined && props.priorOption.label === value) {  
            setUserValue('');
            return;
        }

        //如果输入的value和源列表中的任何一项相同，则不设置uservalue
        if(props.datas.map((obj) => obj.label.toLowerCase()).includes(value.toLowerCase())) {
            setUserValue('');
            return;
        }

        // 如果有用户自定义选项，并且输入的value与自定义选项相同，则不设置uservalue
        if(userOption !==undefined && userOption.label === value) {
            setUserValue('');
            return;
        }

        setUserValue(value);
    }

    function onChange(value, option) {  //change改变value
        console.log('onChange:', value ,option);
        if(option === undefined) {
            return;
        }

        if(userValue !== '' && option.label === userValue) {
            setUserOption(option);
            setUserValue('');
        }else{
            setUserOption();
        }
        props.onChange(value, option);//用户处理被选中值的回调函数
    }

    function onSelect(value, option) {
        console.log('onSelect:', value , option);
        setDefaultValue(value);
    }

    function onClear() {
        console.log('onClear:');
        setDefaultValue(getDefaultValue());
    }

    if(userOption !==undefined) { //如果用户选中的自定义option不为undefined，在原列表前添加
        optionValues = [userOption, ...optionValues];
    }

    if(userValue !== '') {  //如果用户输入的值不为空，在原列表前添加
        optionValues = [{value:userValue,label:userValue}, ...optionValues];
    }

    if(props.priorOption !== undefined) {   //设置优先选项，添加在列表第一项
        optionValues = [props.priorOption, ...optionValues];
    }
    
    //暂无数据效果
    const notFoundContent = <div className="selectNodata">暂无数据</div>
    // 自定义下拉内容loading状态
    const loading = props.loading;
    const dropdownRender = (Menu) => {
        if(loading) {
            return (
            <>
                <div className="selectLoading"><Spin /></div>
            </>
            );
        }
        return Menu;
    }

    return (
        <Select
            showSearch = {props.searchable}
            style={{ width: 200 }}
            placeholder={props.placeholder || '请选择默认'}
            value={defaultValue}
            optionFilterProp="label"
            // options={optionValues.map((obj) => {
            //     return {value:obj.value,label:obj.label}
            // })}
            options={optionValues ? optionValues : notFoundContent}
            onChange={onChange}
            onSelect={onSelect}
            onClear={onClear}
            loading
            onSearch={props.searchable ? onSearch : null}
            filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
            clearIcon={<i className='icon-input-close'></i>}
            suffixIcon={
                <>
                  <i className='icon-select-arrow'></i>
                  <i className='icon-search'></i>
                </>
            }
            notFoundContent={notFoundContent}
            dropdownRender={dropdownRender}
        >
           {/* {
                optionValues.map((obj) => {
                    return <Option value={obj.value} key={obj.value} label={obj.label}>{obj.label}</Option>
                })
           }  */}
           {/* <OptiongGroup optiongGroup={props.optiongGroup} /> */}

        </Select>
    )
}

export default CustomSelect;