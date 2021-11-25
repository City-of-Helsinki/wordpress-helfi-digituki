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
    function edit(props) {
        const { attributes, setAttributes } = props
        const { downloadFile, mapUrl, iframeTitle, buttonText, altText, infoText } = attributes;

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
                    <a href={mapUrl} target="_blank" rel="noopener" class="button hds-button">{buttonText}</a>
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
            <p class="screen-reader-text">{altText}</p>
            <MapInfo label={ infoText} />
            <div class="mapframe">
                <iframe title={iframeTitle} src={mapUrl}></iframe>
            </div>
            <a href={mapUrl} target="_blank" rel="noopener" class="button hds-button">{buttonText}</a>
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
