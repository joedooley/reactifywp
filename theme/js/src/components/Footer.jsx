'use strict';

import React from 'react';
import NavMenu from './NavMenu.jsx';

class Footer extends React.Component {
	render() {
		return (
			<footer id="colophon" className="site-footer" role="contentinfo">

				{PHP.app.$nav_menus.primary ?
					<nav className="main-navigation" role="navigation" aria-label="Footer Primary Menu">
						<NavMenu className="primary-menu" location="primary" />
					</nav>
				: '' }

				{PHP.app.$nav_menus.social ?
					<nav className="social-navigation" role="navigation" aria-label="Footer Social Links Menu">
						<NavMenu className="social-links-menu" location="social" />
					</nav>
				: '' }

				<div className="site-info">
					{PHP.app.$template_tags.twentysixteen_credits}
					<span className="site-title"><a href={PHP.app.$constants.home_url} rel="home">{PHP.app.$constants.bloginfo_name}</a></span>
					<a href="https://wordpress.org">Proudly powered by WordPress</a>
				</div>
			</footer>
		);
	}
}

export default Footer;
