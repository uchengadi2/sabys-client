import _ from "lodash";
import {
  FETCH_CONTRIBUTION,
  FETCH_CONTRIBUTIONS,
  EDIT_CONTRIBUTION,
  DELETE_CONTRIBUTION,
  CREATE_CONTRIBUTION,
} from "./../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CONTRIBUTIONS:
      let id = 0;
      return {
        ...state,
        ..._.mapKeys(action.payload, `id`),
      };

    case FETCH_CONTRIBUTION:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_CONTRIBUTION:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_CONTRIBUTION:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_CONTRIBUTION:
      return _.omit(state, action.payload); //note that payload is just the target id
    default:
      return state;
  }
};
