import CustomSelect from './components/CustomSelect/CustomSelect'
import 'antd/dist/antd.css'
import './assets/font/style.css'
import './assets/css/index.less';

const datas = ['Jack', 'Lucy', 'Tom', 'Mike'];


function App() {
  return (
    <div className="App">
      <div className="select-box">
        <CustomSelect
          datas={datas}
          placeholder='请选择'
          searchable
        />
      </div>
    </div>
  );
}

export default App;
