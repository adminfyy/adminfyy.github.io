import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {consts} from 'constants';
import * as helpers from '../../../utils/helpers';
import * as dateHelper from '../../../utils/misc/date'

export default
class MileStonePlugin extends Component {


  render() {
    const {detail}=this.props;


    return (
      <div>
      <div className="header-bar">
        <span className="title">{detail.project_name + '_' + detail.version_title}</span>
      </div>
      <div className="report-detail">
        <ul>
          <li>
            <div className="fl">里程碑周期:</div>
            <div className="fr">
              {helpers.dateTime(detail.schedule_begin_time).format(consts.DATE_FORMAT)}
              至
              {helpers.dateTime(detail.schedule_end_time).format(consts.DATE_FORMAT)}
            </div>
          </li>
        </ul>
      </div>
      </div>
    );
  }


}
