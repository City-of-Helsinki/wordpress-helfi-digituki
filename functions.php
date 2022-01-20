<?php
/**
 * Wordpress-helfi-digituki Theme functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package wordpress-helfi-digituki
 */

require_once('functions/palette.php');
require_once('functions/rest.php');

/**
 * Enqueue scripts and styles.
 */

function digituki_enqueue_styles() {
	wp_enqueue_style( 'wordpress-helfi-digituki-style',
		get_stylesheet_directory_uri() . '/assets/style.css',
		['theme']
	);

	wp_enqueue_script( 'wordpress-helfi-digituki-script',
		get_stylesheet_directory_uri() . '/assets/scripts.js',
		['jquery']
	);
}
add_action( 'wp_enqueue_scripts', 'digituki_enqueue_styles' );

function digituki_enqueue_editor_scripts(){
	wp_enqueue_script(
		'editor-scripts',
			get_stylesheet_directory_uri() . '/assets/editor.js',
		['wp-i18n', 'wp-blocks', 'wp-dom-ready']
	);
}
add_action('enqueue_block_editor_assets', 'digituki_enqueue_editor_scripts', 10);

function digituki_generate_child_setup() {
    add_theme_support('editor-styles');
    add_editor_style('assets/editor.css');
	// Editor Color Palette

	add_theme_support( 'editor-color-palette', digituki_palette() );
	
	remove_filter('render_block', 'helsinki_alignfull_block_hds_customizations');
}
add_action('after_setup_theme', 'digituki_generate_child_setup');

/**
 * Remove menu items not needed
 */
add_action( 'admin_init', 'digituki_remove_admin_menus' );
function digituki_remove_admin_menus() {
    remove_menu_page( 'edit-comments.php' );
}
