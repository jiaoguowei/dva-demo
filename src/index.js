import dva from 'dva';
import ReactDOM from 'react-dom'
import './index.css';
import createLoading from 'dva-loading'
import { IntlProvider,addLocaleData } from 'react-intl';
import 'intl';
import 'intl/locale-data/jsonp/en';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import zh_CN from './config/zh_CN';
import en_US from './config/en_US';
import { createHashHistory as createHistory } from 'history'


// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(err, dispatch) {
    console.error(err)
  }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
const App = app.start();

let change = 'zh';
let change_c = zh_CN;
// if(localStorage.getItem('lang_type') === 'zh_CN'){
//   change = 'zh';
//   change_c = zh_CN;
// }
// else if(localStorage.getItem('lang_type') === 'en_US'){
//   change = 'en';
//   change_c = en_US;
// }

addLocaleData([...en,...zh]);


ReactDOM.render(<IntlProvider locale={change} messages={change_c}><App/></IntlProvider>, document.getElementById('root'))
