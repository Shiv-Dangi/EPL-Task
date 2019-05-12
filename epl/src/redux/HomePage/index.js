import { FETCH_TEAMS, SET_SUMMARY_DATA } from './actions';

const initialState = { clubs: {}, summary: {} };

export default function EplReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_TEAMS:
			return { ...state, clubs: action.payload };
		case SET_SUMMARY_DATA:
			return { ...state, summary: action.payload };
		default:
			return state;
	}
}
