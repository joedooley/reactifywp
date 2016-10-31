import {List, Map} from 'immutable';

export default function(state = Map(), action) {
	switch (action.type) {
		case 'SET_CONTEXT':
			delete action.template_tags.wp_head;
			delete action.template_tags.wp_footer;
			
			return Map({ route: action.route, posts: action.posts, template_tags: action.template_tags, nav_menus: action.nav_menus, sidebars: action.sidebars });
			break;
	}

	return state;
}
