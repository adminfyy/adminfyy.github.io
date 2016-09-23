import { actionTypes } from 'constants';

export default function (state = {}, action = null) {
  const { type,projectVersionLog} = action;

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_VERSION_LOG:
      return projectVersionLog;
    default:
      return state;
  }
}
