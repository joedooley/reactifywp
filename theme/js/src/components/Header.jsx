'use strict';

import React from 'react';
import NavMenu from './NavMenu.jsx';
var util = require('util');

class Header extends React.Component {
	render() {
		return (
			<div>
				<a className="skip-link screen-reader-text" href="#content">Skip to content</a>

				<header id="masthead" className="site-header" role="banner">
					<div className="site-header-main">
						<div className="site-branding">
							<div dangerouslySetInnerHTML={{__html: PHP.app.$template_tags.twentysixteen_the_custom_logo}}></div>

							{'home' === PHP.app.$context.route.type ?
								<h1 class="site-title"><a href={PHP.app.$constants.home_url} rel="home">{PHP.app.$constants.bloginfo_name}</a></h1>
							:
								<div>
									<p class="site-title"><a href={PHP.app.$constants.home_url} rel="home">{PHP.app.$constants.bloginfo_name}</a></p>
							
									<p class="site-description">{PHP.app.$constants.bloginfo_description}</p>
								</div>
							}
						</div>

						{PHP.app.$nav_menus.primary || PHP.app.$nav_menus.social ?
							<div>
								<button id="menu-toggle" className="menu-toggle">Menu</button>

								<div id="site-header-menu" className="site-header-menu">
									{PHP.app.$nav_menus.primary ?
										<nav id="site-navigation" className="main-navigation" role="navigation" aria-label="Primary Menu">
											<NavMenu className="primary-menu" location="primary" />
										</nav>
									: '' }

									{PHP.app.$nav_menus.social ?
										<nav id="social-navigation" className="social-navigation" role="navigation" aria-label="Social Links Menu">
											<NavMenu className="social-links-menu" location="social" />
										</nav>
									: '' }
								</div>
							</div>
						: '' }
					</div>

					{/*<?php if ( get_header_image() ) : ?>
						<div class="header-image">
							<a href={PHP.app.$constants.home_url} rel="home">
								<img src={PHP.app.$constants.header_image} srcset={PHP.app.$constants.twentysixteen_custom_header_sizes} sizes={PHP.app.$constants.twentysixteen_custom_header_sizes} width="<?php echo esc_attr( get_custom_header()->width ); ?>" height="<?php echo esc_attr( get_custom_header()->height ); ?>" alt={PHP.app.$constants.bloginfo_name}>
							</a>
						</div>
					/*<?php endif; ?>*/}
				</header>
			</div>
		);
	}
}

export default Header;
