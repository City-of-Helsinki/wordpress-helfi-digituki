(function(wp){

	const __ = wp.i18n.__;
	const { registerBlockType } = wp.blocks;
	const { Fragment, createElement } = wp.element;
	const { useBlockProps, BlockControls, InnerBlocks } = wp.blockEditor;
	const { ToolbarGroup, Button } = wp.components;
    const { RichText } = wp.blockEditor;
	function toolbar( props ) {

		return createElement(BlockControls, {key: 'controls'},
			createElement(ToolbarGroup, {},
				hdsMediaUpload(
					props.attributes.mediaId,
					function( media ) {
						props.setAttributes({
							mediaId: media.id,
							mediaUrl: media.sizes.large ? media.sizes.large.url : media.sizes.full.url,
							mediaWidth: media.sizes.large ? media.sizes.large.width : media.sizes.full.width,
							mediaHeight: media.sizes.large ? media.sizes.large.height : media.sizes.full.height,
							mediaAlt: media.alt,
							mediaSrcset: media.sizes.large ? media.sizes.large.srcset : media.sizes.full.srcset,
						});
					},
					function( mediaUpload ) {
						return createElement(Button,{
							icon: 'format-image',
							label: __('Select image'),
							onClick: mediaUpload.open
						});
					}
				),
			)
		);
	}

    function imageConfig(props){
		return({
			id: props.attributes.mediaId,
			alt: props.attributes.mediaAlt,
			src: props.attributes.mediaUrl,
			srcset: props.attributes.mediaSrcset,
			width: props.attributes.mediaWidth,
			height: props.attributes.mediaHeight,
			"aria-hidden":"true"
		});
	}
	function contentButton(props) {
		return hdsContentButton(
			props,
			{
				className: 'content__link hds-button button',
				href: props.attributes.buttonUrl,
				target: '_blank',
				rel: 'noopener',
			},
			hdsExternalLinkIcon()
		);
	}
    function controls(props){

        return hdsInspectorControls(
            {
                title: wp.i18n.__('Content'),
                initialOpen: true,
            },
            hdsButtonTextControl(props),
            hdsButtonUrlControl(props),
            createElement('button',{
                onClick: function(){
                    props.setAttributes({
                        mediaId: 0,
                        mediaUrl: '',
                        mediaWidth: '',
                        mediaHeight: '',
                        mediaAlt: '',
                        mediaSrcset: '',
                    });
                }
            }, __("Posta kuva"))
        )
    }
    function edit(props) {
        const { attributes, setAttributes } = props;
		const blockProps = useBlockProps({
            className: 'digituki-card grid__column'
        });

        return (
            <Fragment>
            {toolbar( props ) }
            {controls( props ) }
            <div class="article" {...blockProps}>
                <div class="digituki-card__content">
                        <div class="digituki-card__header">
                            <RichText
                                tagName="h2"
                                value={ attributes.contentTitle }
                                allowedFormats={ [ 'core/bold', 'core/italic' ] }
                                onChange={ ( contentTitle ) => setAttributes( { contentTitle } ) }
                                placeholder={ __( 'Header' ) } 
                            />
                        </div>
                        <div class="digituki-card__image">
                            {hdsSingleImage(
                                imageConfig(props)
                            )}
                        </div>
                        <div class="digituki-card__summary">
                            <RichText
                                tagName="p"
                                format="string"
                                value={ attributes.contentText }
                                allowedFormats={ [ 'core/bold', 'core/italic', 'core/link'  ] }
                                onChange={ ( contentText ) => setAttributes( { contentText } ) }
                                placeholder={ __( 'Content' ) } 
                            />

                            {contentButton(props)}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
	}

	function save(props) {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps.save({
            className: 'digituki-card grid__column'
        });
		return(
            <article {...blockProps}>
                <div class="digituki-card__content">
                    <div class="digituki-card__header">
                        <RichText.Content tagName="h2" value={ attributes.contentTitle } />
                    </div>
                    <div class="digituki-card__image">
                        {hdsSingleImage(
                            imageConfig(props)
                        )}
                    </div>
                    <div class="digituki-card__summary">
                        <RichText.Content tagName="p" value={ attributes.contentText } />
                        {contentButton(props)}
                    </div>
                </div>
            </article>
        )
	}

	registerBlockType('digituki/card', {
		apiVersion: 2,
		title: __( 'Digituki - Kortti' ),
		category: 'digituki',
		icon: 'format-gallery',
        parent: ['digituki/card-group'],
		supports: {
		},
		attributes: {
			mediaId: {
				type: 'number',
				default: 0
			},
			mediaUrl: {
				type: 'string',
				default: '',
			},
			mediaWidth: {
				type: 'number',
				default: 0
			},
			mediaHeight: {
				type: 'number',
				default: 0
			},
			mediaAlt: {
				type: 'string',
				default: '',
			},
			mediaSrcset: {
				type: 'string',
				default: '',
			},
			contentTitle: {
				type: 'string',
                source: 'html',
                selector: 'h2',
				default: '',
			},
			contentText: {
				type: 'string',
                source: 'html',
                selector: 'p',
				default: '',
			},
			buttonText: {
				type: 'string',
				default: '',
			},
			buttonUrl: {
				type: 'string',
				default: '',
			},
		},
		edit,
		save
	});

})(window.wp);
