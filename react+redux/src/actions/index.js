import * as projectsActions from './Projects'
import * as queryInfoCreators from './QueryInfo'
import * as projectCreators from './Project'
import * as historyCreators from './History'
import * as userCreators from './Users'
import * as versionCreators from './Version'
import * as login from './login'
import * as ucUtil from './UCUtil'
import * as milestones from './Milestone'
import * as group from './Group'
import * as task from './Task'
import * as IM from './IM'
import * as misc from './misc/common'
import * as mileStoneApply from './h5/mileStone/Apply'
import * as taskApply from './h5/task/Apply'
import * as versionsCreators from './versions/index'
import * as h5Project from './h5/project/Apply'
import * as statistic from './statistic/index'
import * as notifications from './notification/index'
import * as select from './widget/Select'
import * as noticeChecklist from './notification/checklist'
import * as ContentService from './CS'
import * as roadmaps from './roadmaps'
import * as milepost from './milepost'
export default {
  ...projectsActions,
  ...queryInfoCreators,
  ...projectCreators,
  ...historyCreators,
  ...userCreators,
  ...versionCreators,
  ...login,
  ...ucUtil,
  ...milestones,
  ...group,
  ...IM,
  ...task,
  ...misc,
  ...taskApply,
  ...mileStoneApply,
  ...versionsCreators,
  ...h5Project,
  ...statistic,
  ...notifications,
  ...select,
  ...noticeChecklist,
  ...ContentService,
  ...roadmaps,
  ...milepost
}
