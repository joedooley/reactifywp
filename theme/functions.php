<?php

define( 'REACTIFYWP_VERSION', '1.0' );

// Setup theme
require_once __DIR__ . '/includes/theme-setup.php';
require_once __DIR__ . '/includes/app.php';
\ReactifyWP\ThemeSetup\setup();
