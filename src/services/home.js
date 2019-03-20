import request from '../utils/request';

export function getList() {
  return request('/api/users',{
    headers: {
      'content-type': 'application/json'
    },
  });
}
