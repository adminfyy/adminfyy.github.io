import React, { Component } from 'react'
import { Router } from 'react-router'
import { history } from 'react-router/lib/HashHistory'
let rootRoute = {
  path: '/',
  component: require('pages/IndexPage'),
  indexRoute: {
    // web上直接打开某个页面不需要加载首页
    component: require('pages/ProjectsPage')
  },
  // indexRoute: { component: require('pages/Login') },
  childRoutes: [
    require('./List/index'),
    require('./List/search/index'),
    require('./Detail/index'),
    require('./History/index'),
    require('./Cost/index'),
    require('./AddMember/index'),
    require('./Members/index'),
    require('./VersionList/index'),
    require('./Version/index'),
    require('./VersionEdit/index'),
    require('./VersionNew/index'),
    require('./Task/index'),
    require('./MileStoneReview/index'),
    require('./H5/ProjectReport/index'),
    require('./versionTasks/index'),
    require('./AddTasks/index'),
    require('./versionValid/index'),
    require('./Open/index'),
    require('./Open/thumbnail'),
    require('./Open/thumbnailBig'),
    require('./OpenSecond/index'),
    require('./OpenThird/index'),
    require('./Statistic/weeklyreport'),
    require('./Statistic/versionstat'),
    require('./Statistic/rsversionstat'),
    require('./Statistic/valuation'),
    require('./Statistic/projectWeeklyReportList'),
    require('./ViewManage/index'),
    require('./Notification/detail'),
    require('./Notification/list'),
    require('./notification/checklist'),
    require('./Notification/add'),
    require('./Notification/time'),
    require('./Milestone/applyHistory'),
    require('./Widget/Select/index'),
    require('./Widget/Select/result'),
    require('./403'),
    require('./404'),
    require('./Login'),
    require('./ProjectIndex/index'),
    require('./Roadmap/index'),
    require('./MilePost/index'),
    {
      path: 'menu/:menu/project/:id/dashboard',

      getComponents (cb) {
        require.ensure([], (require) => {
          cb(null, require('../pages/DashBoard'))
        })
      }
    },
    {
      path: ':index',
      getComponents (cb) {
        require.ensure([], (require) => {
          cb(null, require('../pages/ProjectsPage'))
        })
      }
    }
  ]
}

export {rootRoute}

export default class Routes extends Component {
  render() {
    return <Router history={history} routes={rootRoute}/>
  }
}
