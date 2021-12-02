(function(wp){

	const __ = wp.i18n.__;
	const { registerBlockType, registerBlockStyle } = wp.blocks;
	const { Fragment, createElement } = wp.element;
	const { useBlockProps, __experimentalUseInnerBlocksProps, InnerBlocks } = wp.blockEditor;

    const ALLOWED_BLOCKS = ['digituki/card'];


	function edit() {
		return function(props) {
            const blockProps = useBlockProps( {
                className: 'digituki-card-group grid xs-up-1 s-up-2 l-up-3'
            } );
            const innerBlocksProps = __experimentalUseInnerBlocksProps( blockProps, {
                allowedBlocks: ALLOWED_BLOCKS
            } );
            
			return (
                <div { ...innerBlocksProps } />
            )
		}
	}

	function save() {
		return function(props) {
			return createElement('div', useBlockProps.save({
                className: 'digituki-card-group grid xs-up-1 s-up-2 l-up-3'
            }), createElement( InnerBlocks.Content )
			);
		}
	}

	registerBlockType('digituki/card-group', {
		apiVersion: 2,
		title: __( 'Digituki - Korttiryhmä' ),
		category: 'digituki',
		icon: 'format-gallery',
		supports: {
			anchor: true,
		},
		attributes: {
		},
		edit: edit(),
		save: save()
	});

    registerBlockStyle('digituki/card-group', {
		name: 'light',
		label: 'Kevyt'
    });

})(window.wp);
