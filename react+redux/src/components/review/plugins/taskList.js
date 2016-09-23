import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {consts} from 'constants';
import Task from 'components/apply/mileStoneTask/index';
import RefreshStatus from 'components/widget/scroll/RefreshStatus';

export default
class h5TasksPlugin extends Component {


  render() {
    const {tasks, detail, projectStatus, onUpload}=this.props;
    return (
      <div className="ms-goal doc-manage">
        <div className="bg-white task-header-bar ">
          <span className="title">文档列表{ tasks.empty &&<span>(暂无文档)</span>}</span>
        </div>
        <div className={`version-detail-content ${tasks.empty?'hidden':''}`}>
          {tasks.items && tasks.items.map(item =>
          <div className="task-group" key={item.taskcode + item.topiccode}>
            <Task task={item} detail={detail} onUpload={onUpload} projectStatus={projectStatus}/>
          </div>
          )}
        </div>
      </div>
    )
  }

}
