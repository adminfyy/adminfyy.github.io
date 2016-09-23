import stats from './projects/stats/projectStatistics'
import projects from './projects/all/projects'
import subProjects from './projects/subscribe/subProjects'
import normalProjects from './projects/normal/normalProjects'
import errorProjects from './projects/error/errorProjects'
import warnProjects from './projects/warn/warnProjects'
import searchProjects from './projects/search/index'

import selectTask from './tasks/selectTasks'
import isInitTaskState from './tasks/initTaskState'
import oldTaskCodes from './tasks/oldTaskCodes'
import removeTask from './tasks/removeTask'
import queryInfo from './queryInfo'
import projectDetail from './projectDetail'
import projectSummary from './projectSummary'
import histories from './histories'
import history from './history'
import permission from './permission'
import members from './members'
import memberCost from './memberCost'
// import addmember from './addmember'
import users from './users'
import projectGoal from './projectGoal'
import projectVersions from './versions/active/projectVersions'
import unActiveVersions from './versions/unactive/checkingVersions'
import VersionActiveTab from './versions/tab/tab'
import projectVersionDetail from './projectVersionDetail'
import projectVersionLog from './projectVersionLog'
import projectVersionGroupGoals from './groupGoals'
import lastTime from './mileStone'
import projectVersionGroupDetail from './groupDetail'
import roles from './roles'
import versionTasks from './tasks'
import groupUser from './groupUser'
import forumUser from './forumUser'
import versionTask from './task'
import misc from './misc/common'
import curTab from './projects/tab/tab'
import projectNoVersionTasks from './noVersionTasks'
import H5Tasks from './h5/milestone/tasks'
import versionApplyStatus from './h5/milestone/apply'
import applyHistory from './h5/milestone/applyHistory'
import applyStatus from './apply'
import versionPermission from './h5/milestone/permission'
import refresh from './projects/subscribe/subStatus'
import projectCurVersions from './versions/projectCurVersions'
import projectUndoVersions from './versions/projectUndoVersions'
import projectDoneVersions from './versions/projectDoneVersions'
import h5ReportDetail from './h5/project/reportDetail'
import h5ReportVersions from './h5/project/reportVersions'
import h5ProjectInfo from './h5/project/projectInfo'
import projectsAll from './open/projects'
import versionsTotal from './versionsTotal'
import weeklyScore from './weeklyScore'
import projectWeeklyReport from './statistic/projectWeeklyReport'
import versionStandard from './statistic/versionStandard'
// statistic
import weeklyReport from './statistic/weeklyReport'
import versionStat from './statistic/versionStat'
import rsVersionStat from './statistic/rsVersionStat'
import mineWeeklyReport from './statistic/mineWeeklyReport'
// widget
import selectResult from './widget/select'
import unread from './notification/unread'
import checkNum from './notification/checkNum'
// notfication
import notifications from './notification/notificationlist'
import notificationDetail from './notification/detail'
import reply from './notification/reply'
import noticeChecklist from './notification/noticeChecklist'
import sentTime from './notification/sentTime'
import currentRoadmaps from './roadmap/currentRoadmaps'
import currentMilestones from './milestone/currentMilestones'
import roadmap from './roadmap/roadmap'
import milepost from './milepost/milepost'
import currentMilepost from './milepost/currentMilepost'
export {
  projects,
  subProjects,
  normalProjects,
  warnProjects,
  errorProjects,
  searchProjects,
  queryInfo,
  projectDetail,
  members,
  histories,
  history,
  permission,
  memberCost,
  projectSummary,
  // addmember,
  users,
  projectGoal,
  projectVersions,
  unActiveVersions,
  projectVersionDetail,
  projectVersionLog,
  projectVersionGroupGoals,
  lastTime,
  projectVersionGroupDetail,
  roles,
  versionTasks,
  groupUser,
  forumUser,
  versionTask,
  projectNoVersionTasks,
  applyStatus,
  misc,
  curTab,
  H5Tasks,
  versionApplyStatus,
  versionPermission,
  refresh,
  VersionActiveTab,
  projectCurVersions,
  projectUndoVersions,
  projectDoneVersions,
  h5ReportDetail,
  h5ReportVersions,
  h5ProjectInfo,
  stats,
  selectTask,
  isInitTaskState,
  projectsAll,
  oldTaskCodes,
  removeTask,
  weeklyReport,
  versionStat,
  rsVersionStat,
  projectWeeklyReport,
  versionStandard,
  mineWeeklyReport,
  versionsTotal,
  weeklyScore,
  // notification
  notifications,
  notificationDetail,
  reply,
  notifications,
  selectResult,
  unread,
  checkNum,
  noticeChecklist,
  sentTime,
  applyHistory,
  currentRoadmaps,
  currentMilestones,
  roadmap,
  milepost,
  currentMilepost
}
