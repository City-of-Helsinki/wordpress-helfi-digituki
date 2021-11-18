(function(wp){

	const __ = wp.i18n.__;
	const { registerBlockType } = wp.blocks;
    const { Fragment, createElement } = wp.element;
	const { useBlockProps, BlockControls, InnerBlocks } = wp.blockEditor;
	const { TextControl, TextareaControl, PanelBody, PanelRow } = wp.components;
    const { MediaUpload, InspectorControls } = wp.blockEditor;

    function edit(props) {
        const { attributes, setAttributes } = props
        const { downloadFile, mapUrl, iframeTitle, buttonText, altText } = attributes;
        
        const removeFile = () => {
            setAttributes({
                downloadFile: ''
            });
        }

        const handleRender = ({open}) => {
            let cb = open;
            if (downloadFile){
                return (
                <div>
                    <img onClick={open} src={downloadFile} />
                    <button onClick={removeFile}>Poista kuva</button>
                </div>
                )
            }
            return (<button onClick={cb}>Lisää kuva</button>)
        }

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
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
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
        const { mapUrl, iframeTitle, buttonText, altText } = attributes;

        const blockProps = useBlockProps.save({
            className: 'palvelukartta'
        });
        
       return (
        <article {...blockProps}>
            <p class="screen-reader-text">{altText}</p>
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
            }
		},
		edit,
		save
	});

})(window.wp);
