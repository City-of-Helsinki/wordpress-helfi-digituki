<?php

/**
 * Fix Linked events keyword naming
 */

function digituki_wp_linked_events_event_block_params( $params = [], $postID = null) {

	$data_source = array("data_source" => "helmet,enter");
	$params = array_merge($params, $data_source);
	if (array_key_exists('keywords', $params)){
		$params["keyword"] = $params["keywords"];
		unset($params["keywords"]);
	}

    return $params;
}
add_filter( 'wp_linked_events_event_block_params', 'digituki_wp_linked_events_event_block_params', 10, 2 );