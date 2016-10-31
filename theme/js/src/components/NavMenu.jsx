'use strict';

import React from 'react';

class NavLink extends React.Component {
	navigater() {
		console.log('test');
	}

	render() {
		return (
			<a onClick={this.navigater}>
				{this.props.title}
			</a>
		);
	}
}

class NavMenu extends React.Component {
    render() {
    	function processMenuItem(menuItem, key) {
    		let classes = 'menu-item';
    		if (menuItem.children && menuItem.children.length) {
    			classes += ' menu-item-has-children';
    		}

            return (
                <li key={key} className={classes}>
                    <NavLink title={menuItem.title} url={menuItem.url} />

                    {menuItem.children && menuItem.children.length ?
                    	<ul className="sub-menu">
                    		{menuItem.children.map(processMenuItem)}
                    	</ul>
                    : '' }
                </li>
            );
        }

    	let menuComponent = this.props.nav_menus[this.props.location].map(processMenuItem);

        return (
            <ul className={this.props.className}>
            	{menuComponent}
            </ul>
        );
    }
}

export default NavMenu;
