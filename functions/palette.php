<?php

/**
  * Child Theme Palette setup
  */

add_filter( 'helsinki_default_scheme', 'digituki_palette_name' , 11 );

function digituki_palette_name(): string {
	return 'digituki';
}

function digituki_colors(): array {
	return array(
		'primary' => array(
			'color' => '#BDD4EE',
			'light' => '#EDF4FB',
			'medium' => '#FFE584',
			'dark' => '#0072c6',
			'content' => '#1a1a1a',
			'content-secondary' => '#ffffff',
		),
		'secondary' => '#EDF4FB',
		'secondary-content' => '#1a1a1a',
		'accent' => '#ffdbeb',
	);
}

add_filter( 'helsinki_colors', function( $colors ): array {
	return array_merge( $colors, array(
		digituki_palette_name() => digituki_colors(),
	) );
}, 11);

add_filter('helsinki_scheme_root_styles_colors', function($colors, $scheme){
	if ( digituki_palette_name() === $scheme ) {
		add_filter( 'helsinki_scheme_root_styles_use_hex', '__return_true' );

		$custom = digituki_colors();
		$colors['--primary-color-accent'] = $custom['accent'];
	}

	return $colors;
}, 11, 2);
