<?php

class ReactifyWP_API extends WP_REST_Controller {

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$version = '1';
		$namespace = 'reactifywp/v' . $version;

		$base = 'route';
		register_rest_route( $namespace, '/' . $base, [
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_route' ],
				'permission_callback' => '__return_true',
				'args'                => [
					'context'         => [
						'default'     => 'view',
					],
				],
			],
		] );
	}

	public function get_route() {
		$type = ( empty( $_GET['type'] ) ) ? 'home' : $_GET['type'];
		$object_type = ( empty( $_GET['object_type'] ) ) ? null : $_GET['object_type'];
		$object_id = ( empty( $_GET['object_id'] ) ) ? null : $_GET['object_id'];

		add_action( 'parse_query', function( $query ) use ( $type ) {
			if ( 'home' === $type ) {
				$query->is_home = true;

				if ( 'page' == get_option('show_on_front') && get_option('page_on_front') ) {
					$qv['page_id'] = get_option('page_on_front');
					$query->is_page = true;
					$query->is_posts_page = false;
				} else {
					$this->is_page = false;
					$query->is_posts_page = true;
				}
			}
		} );

		$GLOBALS['wp_the_query'] = new WP_Query();

		$GLOBALS['wp_query'] = $GLOBALS['wp_the_query'];

		do_action( 'reactifywp_render' );

		ReactifyWP::instance()->setup_posts();

		$output = ReactifyWP::instance()->v8->context;

		return $output;
	}

	/**
	 * Prepare the item for create or update operation
	 *
	 * @param WP_REST_Request $request Request object
	 * @return WP_Error|object $prepared_item
	 */
	protected function prepare_item_for_database( $request ) {
		return array();
	}

	/**
	 * Prepare the item for the REST response
	 *
	 * @param mixed $item WordPress representation of the item.
	 * @param WP_REST_Request $request Request object.
	 * @return mixed
	 */
	public function prepare_item_for_response( $item, $request ) {
		return array();
	}

	/**
	 * Get the query params for collections
	 *
	 * @return array
	 */
	public function get_collection_params() {
		return array(
			'page'                   => array(
				'description'        => 'Current page of the collection.',
				'type'               => 'integer',
				'default'            => 1,
				'sanitize_callback'  => 'absint',
			),
			'per_page'               => array(
				'description'        => 'Maximum number of items to be returned in result set.',
				'type'               => 'integer',
				'default'            => 10,
				'sanitize_callback'  => 'absint',
			),
			'search'                 => array(
				'description'        => 'Limit results to those matching a string.',
				'type'               => 'string',
				'sanitize_callback'  => 'sanitize_text_field',
			),
		);
	}
}
