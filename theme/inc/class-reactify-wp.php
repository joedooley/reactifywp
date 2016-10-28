<?php

/**
 * Nav menu walker
 */
class Bridge_Walker_Nav_Menu extends Walker_Nav_Menu {

	/**
	 * Prepare item
	 *
	 * @param  object $item  Menu Item.
	 * @param  array  $args  Arguments passed to walk().
	 * @param  int    $depth Item's depth.
	 * @return array
	 */
	protected function prepare_item( $item, $args, $depth ) {
		$title   = apply_filters( 'the_title', $item->title, $item->ID );
		$title   = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );
		$classes = apply_filters( 'nav_menu_css_class', array_filter( $item->classes ), $item, $args, $depth );

		return array(
			'title'       => $title,
			'url'         => $item->url,
			'children'    => array(),
		);
	}


	/**
	 * Traverse elements to create list from elements.
	 *
	 * This method should not be called directly, use the walk() method instead.
	 *
	 * @param object $element           Data object.
	 * @param array  $children_elements List of elements to continue traversing.
	 * @param int    $max_depth         Max depth to traverse.
	 * @param int    $depth             Depth of current element.
	 * @param array  $args              An array of arguments.
	 * @param array  $output            Passed by reference. Used to append additional content.
	 */
	public function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
		if ( ! $element ) {
			return;
		}

		$id_field = $this->db_fields['id'];
		$id       = $element->$id_field;
		$item     = $this->prepare_item( $element, $args, $depth );

		if ( ! empty( $children_elements[ $id ] ) ) {
			foreach ( $children_elements[ $id ] as $child ) {
				$this->display_element(
					$child,
					$children_elements,
					1,
					( $depth + 1 ),
					$args,
					$item['children']
				);
			}

			unset( $children_elements[ $id ] );
		}

		$output[] = $item;
	}
}

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
		$this->v8->app = new stdClass();
		$this->v8->app->template_tags = [];
		$this->v8->app->constants = [];
		$this->v8->app->nav_menus = [];

		add_action( 'after_setup_theme', array( $this, 'register_menus' ), 11 );
	}

	public function register_menus() {
		$walker = new Bridge_Walker_Nav_Menu;

		$menus = get_nav_menu_locations();

		foreach ( $menus as $location => $menu_id ) {

			$this->v8->app->nav_menus[ $location ] = $walker->walk( wp_get_nav_menu_items( $menu_id ), 0 );
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
