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
	body_class();
} );

ReactifyWP::instance()->register_template_tag( 'home_url', function() {
	echo home_url();
} );

ReactifyWP::instance()->register_template_tag( 'bloginfo_name', function() {
	bloginfo( 'name' );
} );

ReactifyWP::instance()->register_template_tag( 'bloginfo_description', function() {
	bloginfo( 'description' );
} );

ReactifyWP::instance()->register_template_tag( 'header_image', function() {
	echo header_image();
} );
