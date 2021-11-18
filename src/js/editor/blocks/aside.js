(function(wp){

	const __ = wp.i18n.__;
	const { registerBlockType } = wp.blocks;
	const { Fragment, createElement } = wp.element;
	const { useBlockProps, BlockControls, InnerBlocks } = wp.blockEditor;
	const { SelectControl, PanelBody } = wp.components;
    const { RichText, InspectorControls } = wp.blockEditor;
    const { PanelColorSettings, getColorClassName, withColors } = wp.editor;

	function digitukiIconPositionControl(props){
		let options = [
			{label: "H2", value: 'h2'},
			{label: "H3", value: 'h3'},
            {label: "H4", value: 'h4'},
            {label: "H5", value: 'h5'},
            {label: "H6", value: 'h6'},
		];
	
		return hdsSelectControl({
			label: wp.i18n.__('Heading'),
			value: props.attributes.contentIconPosition,
			attribute: 'contentTitleHeading',
			options: options
		}, props);
	}

    function edit(props) {
        const { attributes, setAttributes, clientId, setBgColor, bgColor } = props;
		const blockProps = useBlockProps({ 
            className: ''
        });
        const { blockId } = attributes;
        if ( ! blockId ) {
            setAttributes( { blockId: clientId } );
        }
        return (
            <aside {...blockProps} 			style={ {
				backgroundColor: bgColor.color,
			} }>
                            <InspectorControls>
                                <PanelBody>
                                    <SelectControl
                                        label={wp.i18n.__('Heading')}
                                        value={ attributes.contentTitleHeading }
                                        options={ [
                                            {label: "H2", value: 'h2'},
                                            {label: "H3", value: 'h3'},
                                            {label: "H4", value: 'h4'},
                                            {label: "H5", value: 'h5'},
                                            {label: "H6", value: 'h6'},
                                        ] }
                                        onChange={ ( newSize ) => setAttributes( {contentTitleHeading: newSize} ) }
                                    />
                                </PanelBody>
                                <PanelColorSettings
                                    title={ 'Color Options' }
                                    colorSettings= { [ 
                                        {
                                        value: bgColor.color,
                                        onChange: setBgColor,
                                        label: __('Color'),
                                        },
                                    ] }
                                />
                            </InspectorControls>
                            <RichText
                                tagName={attributes.contentTitleHeading}
                                value={ attributes.contentTitle }
                                multiline={ false }
                                withoutInteractiveFormatting
                                allowedFormats={ [] }
                                onChange={ ( contentTitle ) => setAttributes( { contentTitle } ) }
                                placeholder={ __( 'Header' ) } 
                            />
                            <div class="aside-content">
                                <InnerBlocks />
                            </div>
            </aside>
        );
	}

	function save(props) {
        const { attributes, setAttributes } = props;
        const { blockId, contentTitle, bgColor } = attributes;

        let saveProps = {
            className: getColorClassName( 'background-color', bgColor)
        };

        if ( contentTitle ){
            Object.assign(saveProps, {'aria-labelledby': blockId});
        }
        const blockProps = useBlockProps.save(saveProps);
        
       return (
            <aside {...blockProps}>
                <RichText.Content id={blockId} tagName={attributes.contentTitleHeading} value={ attributes.contentTitle } />
                <div class="aside-content">
                    <InnerBlocks.Content />
                </div>
            </aside>
        );
	}

	registerBlockType('digituki/aside', {
		apiVersion: 2,
		title: __( 'Digituki - Sivupalsta' ),
		category: 'digituki',
		icon: 'format-gallery',
        parent: ['core/column'],
		supports: {
		},
		attributes: {
            blockId: {
                type: 'string'
             },
			contentTitle: {
				type: 'string',
				default: '',
			},
			contentTitleHeading: {
				type: 'string',
				default: 'h2',
			},
            bgColor: {
                type: 'string',
                default: ''
            }
            
		},
		edit: withColors('bgColor')(edit),
		save
	});

})(window.wp);
