(function(wp){

	const __ = wp.i18n.__;
	const { registerBlockType } = wp.blocks;
	const { Fragment, createElement } = wp.element;
	const { useBlockProps, BlockControls, InnerBlocks } = wp.blockEditor;
	const { ToolbarGroup, Button, SelectControl } = wp.components;
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

	const LinkButton = (props) => {
		const {label, href, type, edit} = props;

		const iconClass = "content__link hds-button button content__link--" + type;
		if (!href){
			return null;
		}

		if (type == 'external'){
				return(
					<a 	href={edit != true ? href : undefined } 
						className={iconClass} 
						target="_blank"
						rel="noopener"
					>{label}</a>
				);	
		}

		return(
			<a 	href={edit != true ? href : undefined }  
				className={iconClass} 
			>{label}</a>
		)
	}
	const selectControl = (config, props) => {
		return wp.element.createElement(
			wp.components.PanelRow, {},
			wp.element.createElement(
				wp.components.SelectControl,
				{
					label: config.label,
					value: config.value,
					onChange: function(value) {
						var newAttributes = {};
						newAttributes[config.attribute] = value;
						props.setAttributes(newAttributes);
					},
					options: config.options
				}
			)
		);
	}
    function controls(props){
		const {buttonType} = props.attributes;
        return hdsInspectorControls(
            {
                title: wp.i18n.__('Content'),
                initialOpen: true,
            },
            hdsButtonTextControl(props),
            hdsButtonUrlControl(props),
			selectControl({
				label: 'Linkin kohde',
				options: [
					{label: "Sisäinen linkki", value: 'internal'},
					{label: "Ulkoinen linkki", value: 'external'}
				],
				attribute: 'buttonType',
				value: buttonType
			}, props),
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
        const { attributes, setAttributes, clientId } = props;
		const { blockId, buttonUrl, buttonText, buttonType } = attributes;
        if ( ! blockId ) {
            setAttributes( { blockId: clientId } );
        }
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

							<LinkButton href={buttonUrl} label={buttonText} type={buttonType} edit={true} />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
	}

	function save(props) {
		const { attributes, setAttributes, clientId } = props;
        const { blockId, buttonUrl, buttonText, buttonType } = attributes;
		const blockTitle = "title-" + blockId;
		const blockDescr = "content-" + blockId;
        const blockProps = useBlockProps.save({
            className: 'digituki-card grid__column'
        });
		return(
            <div {...blockProps} >
                <article class="digituki-card__content" tabindex="0" aria-labelledby={blockTitle} aria-describedby={blockDescr} >
                    <div class="digituki-card__header">
                        <RichText.Content tagName="h2" value={ attributes.contentTitle } id={blockTitle} />
                    </div>
                    <div class="digituki-card__image">
                        {hdsSingleImage(
                            imageConfig(props)
                        )}
                    </div>
                    <div class="digituki-card__summary">
                        <RichText.Content tagName="p" value={ attributes.contentText } id={blockDescr} />
                        <LinkButton href={buttonUrl} label={buttonText} type={buttonType} edit={false} />
                    </div>
                </article>
            </div>
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
			buttonType: {
				type: 'string',
				default: 'internal',
			},
			blockId: {
                type: 'string'
             },
		},
		edit,
		save
	});

})(window.wp);
