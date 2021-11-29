<?php
/**
 * Block
 *
 * @var array $fields
 */
$block_data = $fields['data'] ?? [];

if ( empty( $block_data ) || empty( $block_data['events'] ) ) {
    return;
}
?>
<ul class="wp-linked-events-block">
    <?php
    /**
     * Event
     *
     * @var \Geniem\Theme\Integrations\LinkedEvents\Entities\Event $event
     */
    ?>
    <?php foreach ( $block_data['events'] as $event ) : ?>
        <?php


        $image    = $event->get_primary_image();
        $keywords = $event->get_keywords( 3 );

        $location = $event->get_location();
        $link = $location->get_info_url();

        $title_id = "wp-linked-events-block-title-" . $event->get_id();
        $date_id = "wp-linked-events-block-date-" . $event->get_id();
        $address_id = "wp-linked-events-block-address-" . $event->get_id();
        $classes  = empty( $image )
            ? 'wp-linked-events-block__event--has-image'
            : '';
        ?>
        <li class="wp-linked-events-block__event <?php esc_attr_e( $classes ); ?>">
            <?php if ( ! empty( $image ) ) : ?>
                <div class="wp-linked-events-block__image-wrapper">
                    <div class="wp-linked-events-block__image-container">
                        <img src="<?php echo esc_url( $image->get_url() ); ?>"
                                class="wp-linked-events-block__image"
                                alt="" aria-hidden="true">
                    </div>
                </div>
            <?php endif; ?>

            <div class="wp-linked-events-block__fields">
                <h3 class="wp-linked-events-block__title" id="<?php echo $title_id  ?>">
                    <a href="<?php echo $link ?>" target="_blank" rel="noopener">
                        <?php echo esc_html( $event->get_name() ); ?>
                    </a>
                </h3>
                <div class="wp-linked-events-block__details has-icon has-icon--before" aria-label="<?php esc_attr_e( 'Date and time', 'wp-linked-events' ); ?>">
                    <i class="hds-icon hds-icon--size-s hds-icon--calendar-clock" aria-hidden="true"></i>
                    <time class="wp-linked-events-block__details-content" id="<?php echo $date_id ?>
                        datetime="<?php echo $event->get_start_time()->format('c'); ?>"
                    >
                        <?php echo esc_html( $event->get_formatted_time_string() ); ?>
                    </time>    
                </div>

                <div class="wp-linked-events-block__details has-icon has-icon--before" id="<?php echo $address_id ?>" aria-label="<?php esc_attr_e( 'Location', 'wp-linked-events' ); ?>">
                    <i class="hds-icon hds-icon--size-s hds-icon--location" aria-hidden="true"></i>
                    <div class="wp-linked-events-block__details-content">
                        <?php echo esc_html( $event->get_location_string() ); ?>
                    </div>
                </div>
            </div>
        </li>
    <?php endforeach; ?>
</ul>
