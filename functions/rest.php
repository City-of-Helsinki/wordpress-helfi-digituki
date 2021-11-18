<?php

/**
 * Disallow REST API for unauthorized users and remove XML-RPC endpoints
 */
remove_action( 'wp_head', 'rest_output_link_wp_head' );
remove_action( 'template_redirect', 'rest_output_link_header' );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );


function rest_only_for_authorized_users($wp_rest_server){
    if ( !is_user_logged_in() ) {
		wp_redirect(home_url());
		exit();
    }
}


add_filter( 'xmlrpc_enabled', '__return_false' );
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
