import { actionTypes } from 'constants';

export default function (state = {}, action = null) {
  const { type, projectDetail, data } = action;

  switch (type) {
    case actionTypes.RECEIVE_PROJECT_DETAIL:
      return {
        ...state,
        ...projectDetail
      };
    case actionTypes.UPDATE_PROJECT_DETAIL:
      return {
        ...state,
        'project_info': {
          ...data
        }
      }
    default:
      return state;
  }
}
