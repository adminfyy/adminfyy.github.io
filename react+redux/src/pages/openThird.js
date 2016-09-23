import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'actions'
import Search from 'components/open/Search'
import Operate from 'components/open/Operate'
import ProjectList from 'components/open/ProjectList'
import * as helpers from 'utils/helpers'
@connect(state => ({
  projectsAll: state.projectsAll,
  stats: state.stats
}), actionCreators)
export default class OpenThirdPage extends Component {
  search() {
    let $input = this.refs.filter.getDOMNode()
    let val = $input.value
    let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/

    $input.blur()
    this.props.clearProjectsAll()

    if (val.length) {
      if (!reg.test(val)) {
        window.toast.setTxt('请输入合法关键字')
        $input.value = null
        return
      } else{
        this.props.fetchProjectsAll({
          filter: val
        })
      }
    } else {
      window.toast.setTxt('请输入项目名称')
    }
  }

  linkTo() {
    helpers.goPage(`/thumbnail`)
  }

  backTo(count) {
    if (count) {
      helpers.goPage(`/`)
    } else {
      helpers.goPage(`/open`)
    }
  }

  close() {
    const {projectsAll} = this.props
    let keyword = projectsAll.keyword

    if (projectsAll && projectsAll.items) {
      projectsAll.items.forEach(item => {
        this.props.updateProjectsAll(item.project_id, 0, keyword)
      })
    }
  }

  componentDidMount() {
    this.props.clearProjectsAll()
  }

  componentWillMount() {
    let val = this.props.params.val

    this.props.fetchProjectsAll({
      filter: val
    })
    this.props.fetchProjectsStatistic()
  }


  render() {
    this.props.search = this.search
    this.props.linkTo = this.linkTo
    this.props.backTo = this.backTo
    let isExist
    const {projectsAll} = this.props

    if (projectsAll && projectsAll.items) {
      isExist = projectsAll.items.some(item => {
        return item.isSelected && item.isSelected === item.is_actived
      })
    }

    return (
      <div className="open-wrap open-third">
        <div className="main">
          <Search {...this.props} />

          <div className="projects">
            <ProjectList {...this.props} />
          </div>
        </div>
        <Operate {...this.props} isExist={isExist} />
        {isExist &&
          <div className="tips">
            <p>项目已开通，请99U联系项目负责人</p>
            <div className="close" onClick={this.close.bind(this)}></div>
          </div>
        }
      </div>
    )
  }
}
