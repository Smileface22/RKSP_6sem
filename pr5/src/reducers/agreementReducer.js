import {  TOGGLE_AGREEMENT  } from "../actions/agreementActions";

const initialState = {
  accepted: false,
};

export const agreementReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_AGREEMENT:
      return { ...state, accepted: !state.accepted };
    default:
      return state;
  }
};