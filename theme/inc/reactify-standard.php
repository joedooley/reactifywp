<?php

/**
 * Template tags
 */

ReactifyWP::instance()->register_template_tag( 'wp_head', function() {
	do_action( 'wp_head' );
} );

ReactifyWP::instance()->register_template_tag( 'wp_footer', function() {
	do_action( 'wp_footer' );
} );

ReactifyWP::instance()->register_template_tag( 'get_body_class', function() {
	return get_body_class();
} );

/**
 * Constants
 */
ReactifyWP::instance()->register_constant( 'home_url', function() {
	return home_url();
} );

ReactifyWP::instance()->register_constant( 'bloginfo_name', function() {
	return get_bloginfo( 'name' );
} );

ReactifyWP::instance()->register_constant( 'bloginfo_description', function() {
	return get_bloginfo( 'description' );
} );

ReactifyWP::instance()->register_constant( 'header_image', function() {
	return header_image();
} );
