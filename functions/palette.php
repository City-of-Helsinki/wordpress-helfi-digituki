<?php
/**
  * Child Theme Palette setup
  */
  add_filter('helsinki_default_scheme', function($name){
	return 'digituki';
}, 11);

function digituki_colors() {
	return array(
		'digituki' => '#BDD4EE',
		'digituki-light' => '#EDF4FB',
		'digituki-medium-light' => '#FFE584',
		'digituki-dark' => '#0072c6',
        'digituki-accent' => '#ffdbeb',
	);
}

function digituki_palette(){
	$palette = helsinki_scheme_editor_palette();
	$digituki_colors = digituki_colors();
	$additional_colors = [
		["name" => __("Medium light"), "slug" => "medium-light", "color" => $digituki_colors["digituki-medium-light"]],
        ["name" => __("Accent"), "slug" => "accent", "color" => $digituki_colors["digituki-accent"]]	
	];

    return array_merge($palette, $additional_colors);
}

add_filter('helsinki_colors', function($colors){
	return array_merge(
		$colors,
		digituki_colors()
	);
}, 11);

add_filter('helsinki_scheme_root_styles_colors', function($colors, $scheme){
	if ( 'digituki' !== $scheme ) {
		return $colors;
	}

	add_filter('helsinki_scheme_root_styles_use_hex', '__return_true');
	$custom = digituki_colors();
	return array(
		'--primary-color' => $custom['digituki'],
		'--primary-color-light' => $custom['digituki-light'],
		'--primary-color-medium' => $custom['digituki-medium-light'],
		'--primary-color-dark' => $custom['digituki-dark'],
        '--primary-color-accent' => $custom['digituki-accent'],
	);
}, 11, 2);