import { SET_APP, REMOVE_APP } from '../../constants/actions';

export const setApp = (id, app) => ({
  type: SET_APP,
  id,
  app,
});

export const removeApp = id => ({
  type: REMOVE_APP,
  id,
});
