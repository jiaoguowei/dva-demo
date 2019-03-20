import { getList } from '../services/home'

export default {

  namespace: 'home',

  state: {
    value: '欢迎来到onesight'
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *getList({ payload}, { call, put}) {
      const res = yield call(getList)
      console.log('异步请求的数据',res)
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};