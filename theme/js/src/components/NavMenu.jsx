'use strict';

import React from 'react';

class NavLink extends React.Component {
	render() {
		<a href={this.props.url}>
			{this.props.title}
		</a>
	}
}

class NavMenu extends React.Component {
    render() {
    	function processMenuItem(menuItem) {
    		let classes = 'menu-item';
    		if (menuItem.children.length) {
    			classes += ' menu-item-has-children';
    		}
            return (
                <li className={classes}>
                    <a href={menuItem.url}>{menuItem.title}</a>

                    {menuItem.children.length ?
                    	<ul className="sub-menu">
                    		{menuItem.children.map(processMenuItem)}
                    	</ul>
                    : '' }
                </li>
            );
        }

    	let menuComponent = PHP.app.$nav_menus[this.props.location].map(processMenuItem);

        return (
            <ul className="menu">
            	{menuComponent}
            </ul>
        );
    }
}

export default NavMenu;
