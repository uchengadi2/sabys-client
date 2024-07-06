import _ from "lodash";
import {
  FETCH_TARGET,
  FETCH_TARGETS,
  EDIT_TARGET,
  DELETE_TARGET,
  CREATE_TARGET,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TARGETS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_TARGET:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_TARGET:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_TARGET:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_TARGET:
      return _.omit(state, action.payload); //note that payload is just the target id
    default:
      return state;
  }
};
