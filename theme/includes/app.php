<?php
namespace ReactifyWP;

class App {
	private $v8;

	public function __construct() { }

	public function create_context() {

	}

	public function render() {
		$server = file_get_contents( __DIR__ . '/../js/server.js');

		$this->v8->executeString( $server );
	}

	public function setup() {
		$this->v8 = new \V8Js();
		$this->v8->app = [
			'actions' => [
				'wp_head' => $this->capture_action( 'wp_head' ),
				'wp_footer' => $this->capture_action( 'wp_footer' ),
			],
		];
	}

	public function capture_action( $action, $args = array() ) {
		ob_start();

		do_action( $action );

		return ob_get_clean();
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
