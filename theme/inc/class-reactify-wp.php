<?php

class ReactifyWP {
	public $v8;

	public function __construct() { }

	public function create_context() {

	}

	public function render() {
		do_action( 'reactifywp_render' );

		$server = file_get_contents( __DIR__ . '/../js/server.js');

		$this->v8->executeString( $server );
	}

	public function register_template_tag( $tag_name, $tag_function, $on_action = 'reactifywp_render' ) {
		$app = $this->v8->app;

		$register = function() use ( &$app, $tag_name, $tag_function ) {
			ob_start();

			$tag_function();

			$output = ob_get_clean();

			$app->template_tags[ $tag_name ] = $output;
		};

		if ( ! empty( $on_action ) ) {
			add_action( $on_action, $register );
		} else {
			$register();
		}
	}

	public function register_constant( $constant_name, $constant_function, $on_action = false ) {
		$app = $this->v8->app;

		$register = function() use ( &$app, $constant_name, $constant_function ) {
			$app->constants[ $constant_name ] = $constant_function();
		};

		if ( ! empty( $on_action ) ) {
			add_action( $on_action, $register );
		} else {
			$register();
		}
	}

	public function setup() {
		$this->v8 = new \V8Js();
		$this->v8->app = new stdClass(); // v8js didn't like an array here :(
		$this->v8->app->template_tags = [];
		$this->v8->app->constants = [];
		$this->v8->app->nav_menus = [];
		$this->v8->app->context = [];

		add_action( 'after_setup_theme', array( $this, 'register_menus' ), 11 );
		add_action( 'reactifywp_render', array( $this, 'construct_route' ), 11 );
	}

	public function construct_route() {
		$route = [
			'type'        => null,
			'object_id'   => null,
		];

		if ( is_home() || is_front_page() ) {

			if ( is_home() ) {
				$route['type'] = 'home';
			} else {
				$route['type'] = 'front_page';
			}
		} else {
			$object = get_queried_object();

			if ( is_single() || is_page() ) {
				$route['type'] = 'single';
				$route['object_type'] = $object->post_type;
				$route['object_id'] = $object->ID;
			} else {
				$route['type'] = 'archive';

				if ( is_author() ) {
					$route['object_type'] = 'author';
				} elseif ( is_post_type() ) {
					$route['object_type'] = $object->name;
				} elseif ( is_tax() ) {
					$route['object_type'] = $object->taxonomy;
				}
			}
		}

		$this->v8->app->context['route'] = $route;
	}

	public function register_menus() {
		$menus = get_nav_menu_locations();

		foreach ( $menus as $location => $menu_id ) {
			$items = wp_get_nav_menu_items( $menu_id );

			$ref_map = [];
			$menu = [];

			foreach ( $items as $item_key => $item ) {
				$menu_item = new stdClass(); // We use a class so we can modify objects in place
				$menu_item->url = $item->url;
				$menu_item->title = apply_filters( 'the_title', $item->title, $item->ID );
				$menu_item->children = [];

				if ( empty( $item->menu_item_parent ) ) {
					$index = ( empty( $menu ) ) ? 0 : count( $menu );
					$menu[ $index ] = $menu_item;

					$ref_map[ $item->ID ] = $menu_item;
				} else {
					$ref_map[ $item->menu_item_parent ]->children[] = $menu_item;
				}
			}

			$this->v8->app->nav_menus[ $location ] = $menu;
		}
	}

	public static function instance() {
		static $instance;

		if ( empty( $instance ) ) {
			$instance = new self();
			$instance->setup();
		}

		return $instance;
	}
}

require_once __DIR__ . '/class-reactify-api.php';
add_action( 'rest_api_init', function () {
	$reactify_api = new ReactifyWP_API();
	$reactify_api->register_routes();
} );

