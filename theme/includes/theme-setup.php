<?php
namespace ReactifyWP\ThemeSetup;

/**
 * Set up theme defaults and register supported WordPress features.
 *
 * @since 1.0
 */
function setup() {
	add_action( 'after_setup_theme', __NAMESPACE__  . '\i18n' );
	add_action( 'wp_head', __NAMESPACE__  . '\header_meta' );
	add_action( 'wp_enqueue_scripts', __NAMESPACE__  . '\scripts' );
	add_action( 'wp_enqueue_scripts',  __NAMESPACE__  . '\styles' );
}

/**
 * Make theme available for translation
 * 
 * @since 1.0
 */
function i18n() {
	load_theme_textdomain( 'v8-wp-react', get_template_directory() . '/languages' );
 }

/**
 * Enqueue scripts for front-end.
 *
 * @param bool $debug Whether to enable loading uncompressed/debugging assets. Default false.
 * @since 1.0
 */
function scripts( $debug = false ) {
	$min = ( $debug || defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

	wp_enqueue_script(
		'reactifywp',
		get_stylesheet_directory_uri() . "/assets/js/wp-theme{$min}.js",
		array(),
		REACTIFYWP_VERSION,
		true
	);
}

/**
 * Enqueue styles for front-end.
 *
 * @param bool $debug
 * @since 1.0
 */
function styles( $debug = false ) {
	$min = ( $debug || defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

	wp_enqueue_style(
		'reactifywp',
		WPTHEME_URL . "/assets/css/wp-theme{$min}.css",
		array(),
		WPTHEME_VERSION
	);
}
