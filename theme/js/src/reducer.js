import {List, Map} from 'immutable';

export default function(state = Map(), action) {
	switch (action.type) {
		case 'SET_ROUTE':
			return state.set('route', action.route);
			break;
	}

	return state;
}
