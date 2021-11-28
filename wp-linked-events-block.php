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
        $link = esc_url( $event->get_info_url() );
        $title_id = "wp-linked-events-block-title-" . $event->get_id();
        $classes  = empty( $image )
            ? 'wp-linked-events-block__event--has-image'
            : '';
        ?>
        <li class="wp-linked-events-block__event <?php esc_attr_e( $classes ); ?>">
            <a class="wp-linked-events-block__sr-link" href="<?php echo $link ?>">
                <span class="screen-reader-text"><?php echo esc_html( $event->get_name() ); ?></span>
            </a>
            <?php if ( ! empty( $image ) ) : ?>
                <div class="wp-linked-events-block__image-wrapper">
                    <div class="wp-linked-events-block__image-container">
                        <img src="<?php echo esc_url( $image->get_url() ); ?>"
                                class="wp-linked-events-block__image"
                                alt="" aria-hidden="true">
                    </div>

                    <?php if ( ! empty( $keywords ) ) : ?>
                        <ul class="wp-linked-events-block__keywords wp-linked-events-block__keywords--floated">
                            <?php foreach ( $keywords as $keyword ) : ?>
                                <li>
                                    <div class="wp-linked-events-block__keyword">
                                        <span class="wp-linked-events-block__keyword-label">
                                            <?php echo esc_html( $keyword->get_name() ); ?>
                                        </span>
                                    </div>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="wp-linked-events-block__fields">
                <?php if ( ! empty( $keywords ) && empty( $image ) ) : ?>
                    <ul class="wp-linked-events-block__keywords" aria-hidden="true">
                        <?php foreach ( $keywords as $keyword ) : ?>
                            <li>
                                <div class="wp-linked-events-block__keyword">
                                    <span class="wp-linked-events-block__keyword-label">
                                        <?php echo esc_html( $keyword->get_name() ); ?>
                                    </span>
                                </div>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>

                <time class="wp-linked-events-block__date" 
                    datetime="<?php echo $event->get_start_time()->format('c'); ?>"
                >
                        <?php echo esc_html( $event->get_formatted_time_string() ); ?>
                </time>

                <h3 class="wp-linked-events-block__title" aria-hidden="true">
                        <?php echo esc_html( $event->get_name() ); ?>
                </h3>

                <div class="wp-linked-events-block__location">
                    <?php echo esc_html( $event->get_location_string() ); ?>
                </div>
            </div>
        </li>
    <?php endforeach; ?>
</ul>
