(function(wp){

	const __ = wp.i18n.__;
	const { registerBlockType } = wp.blocks;
    const { Fragment, createElement } = wp.element;
	const { useBlockProps, BlockControls, InnerBlocks } = wp.blockEditor;
	const { TextControl, TextareaControl, PanelBody, PanelRow } = wp.components;
    const { MediaUpload, InspectorControls } = wp.blockEditor;

    const MapInfo = (props) => {
        const {label} = props;
        if (!label)
            return (null);

        return(
        <div class="mapinfo has-icon has-icon--before">
            <span class="mapinfo__icon" aria-hidden="true">{hdsInfoIcon()}</span>
            <span class="mapinfo__text">{label}</span>
        </div>
        )
    }

	const contentButton = (props) => {
		return hdsContentButton(
			props,
			{
				className: 'hds-button button',
				href: props.attributes.buttonUrl,
				target: '_blank',
				rel: 'noopener',
			},
			hdsExternalLinkIcon()
		);
	}

    function edit(props) {
        const { attributes, setAttributes } = props
        const { mapUrl, iframeTitle, buttonText, buttonUrl, altText, infoText } = attributes;

		const blockProps = useBlockProps({ 
            className: ''
        });
        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="Asetukset" initialOpen={true}>

                    <PanelRow>
                        <TextControl
                            label="Linkki karttaan"
                            value={ mapUrl }
                            onChange={ ( value ) => setAttributes( {mapUrl: value }) }
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label="Otsake"
                            value={ iframeTitle }
                            onChange={ ( value ) => setAttributes( {iframeTitle: value }) }
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextareaControl
                            label="Vaihtoehtoinen teksti ruudunlukijoille"
                            value={ altText }
                            onChange={ ( value ) => setAttributes( {altText: value }) }
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label="Linkki kokoruutunäkymään"
                            value={ buttonUrl }
                            onChange={ ( value ) => setAttributes( {buttonUrl: value }) }
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label="Button text"
                            value={ buttonText }
                            onChange={ ( value ) => setAttributes( {buttonText: value }) }
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label="Opasteteksti"
                            value={ infoText }
                            onChange={ ( value ) => setAttributes( {infoText: value }) }
                        />
                    </PanelRow>
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <MapInfo label={ infoText} />
                    <div class="mapframe">
                        <iframe title={iframeTitle} src={mapUrl}></iframe>
                    </div>
                    { contentButton(props) }
                </div>
            </div>
        );
	}

	function save(props) {
        const { attributes, setAttributes } = props;
        const { mapUrl, iframeTitle, buttonText, altText, infoText } = attributes;

        const blockProps = useBlockProps.save({
            className: 'palvelukartta'
        });
        
       return (
        <article {...blockProps}>
            <div class="mapcontent" aria-hidden="true">
                <MapInfo label={ infoText} />
                <div class="mapframe">
                    <iframe title={iframeTitle} src={mapUrl}></iframe>
                </div>
            </div>
            { altText && <p class="screen-reader-text">{altText}</p>}
            { contentButton(props) }
        </article>
        );
	}

	registerBlockType('digituki/palvelukartta', {
		apiVersion: 2,
		title: __( 'Digituki - Palvelukartta' ),
		category: 'digituki',
		icon: 'format-gallery',
		supports: {
		},
		attributes: {
            mapUrl: {
                type: 'string'
             },
             downloadFile: {
                 type: 'string'
             },
             iframeTitle: {
                 type: 'string'
             },
             buttonText: {
                type: 'string'
            },
            buttonUrl: {
                type: 'string'
             },
            altText: {
                type: 'string'
            },
            infoText: {
                type: 'string'
            }
		},
		edit,
		save
	});

})(window.wp);
