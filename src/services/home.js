import request from '../utils/request';
import requestV from '../utils/requestV1'

console.log('+++', requestV)

// export function getList() {
//   return request('/api/users',{
//     headers: {
//       'content-type': 'application/json'
//     },
//   });
// }

export function getList() {
  return requestV.get('/api/users')
}
