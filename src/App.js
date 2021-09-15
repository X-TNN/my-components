import CustomSelect from './components/CustomSelect/CustomSelect'
import 'antd/dist/antd.css'
import './assets/font/style.css'
import './assets/css/index.less';

// const datas = [
//   {value:'1',label:'Jack',disabled:true},
//   {value:'2',label:'Lucy'},
//   {value:'3',label:'Tom'},
//   {value:'4',label:'Mike'},
// ];
const datas = [
  {
    label:'Manager',
    key:'Manager',
    options: [
      {
        value:'1',
        label:'Jack',
        disabled:'true'
      },
      {
        value:'2',
        label:'Lucy'
      },
      {
        value:'4',
        label:'Mike'
      }
    ]
  },
  {
    label:'Engineer',
    key:'Engineer',
    options: [
      {
        value:'3',
        label:'Tom'
      }
    ]
  }
];

function onChange(value){
  console.log('onChange:', value);
}

function App() {
  return (
    <div className="App">
      <div className="select-box">
        <CustomSelect
          datas={datas}
          //defaultValue={{value:2,label:'Lucy'}}
          //priorOption={{value:-1,label:'全部'}} // 设置优先选项是否保留，总是在列表第一项显示并且作为默认值, 内容{label, value}
          placeholder='请选择'
          onChange={onChange}
          searchable
          loading={false}
        />
      </div>
    </div>
  );
}

export default App;
