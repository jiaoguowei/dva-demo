// eg: 在用户不断的输入过程中，当暂停输入100ms才发起ajax，在发起ajax的同时，中断上一个查询keyword的ajax
// $(input).on('input', evt => {
//    debounce(()=>{
//      get('http://baidu.com', {keyword: evt.target.value})
//  })
//})
// 定义一个防抖函数
function debounce(fn, step = 100 ) {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, step);
  }
}