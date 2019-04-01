import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic'

// 封装动态加载model配置
function RouterConfig({ history, app}) {
  const routes = [
    {
      path: '/home',
      name: 'Home',
      models: () =>[import('./models/home')],
      component: () => import('./routes/Home')
    },
    {
      path: '/about',
      name: 'About',
      models: () =>[import('./models/about')],
      component: () => import('./routes/About')
    }
  ]
  return (
    <Router history={history}>
      <Switch>
        {
          routes.map(({path, name, ...dynamics}) => {
            return (
              <Route path={path} key={name} exact component={dynamic({app, ...dynamics})}/>
            )
          })
        }
        <Redirect from="/" to="/home"></Redirect>
      </Switch>
    </Router>
  )
}


export default RouterConfig;
