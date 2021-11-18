(function(wp){

	const __ = wp.i18n.__;
	const { registerBlockType } = wp.blocks;
	const { Fragment, createElement } = wp.element;
	const { useBlockProps, BlockControls, InnerBlocks } = wp.blockEditor;


	const ALLOWED_BLOCKS = ['core/paragraph', 'core/heading', 'core/list'];

	function digitukiIconPositionControl(props){
		let options = [
			{label: __("Vierellä"), value: 'content--icon-side'},
			{label: __("Yläpuolella"), value: 'content--icon-top'},
		];
	
		return hdsSelectControl({
			label: wp.i18n.__('Icon position'),
			value: props.attributes.contentIconPosition,
			attribute: 'contentIconPosition',
			options: options
		}, props);
	}

	function editBanner() {
		return function(props) {
			return createElement(
				'div', useBlockProps({
					className: 'wp-block-hds-wp-banner-custom'
				}),
				hdsInspectorControls(
					{
						title: wp.i18n.__('Content'),
						initialOpen: true,
					},
					hdsIconControl(props),
					digitukiIconPositionControl(props)
				),
				createElement('div', useBlockProps(),
					createElement('div',
						{ className: `content ${props.attributes.contentIconPosition}`},
						createElement(
							'div', {className: 'content__inner content__inner--icon'},
							hdsContentIcon(props),
						),
						createElement( 'div', {className: 'content__inner content__inner--text'}, 
							createElement( InnerBlocks, {
								allowedBlocks: ALLOWED_BLOCKS
							} ) )
					),				
				)
			);
		}
	}

	function saveBanner() {
		return function(props) {
			return createElement('div', useBlockProps.save({
				className: 'wp-block-hds-wp-banner-custom'
			}),
				createElement('div',
					{ className: `content ${props.attributes.contentIconPosition}`},
					createElement(
						'div', {className: 'content__inner content__inner--icon' },
						hdsContentIcon(props),
					),
					createElement(
						'div', {className: 'content__inner content__inner--text'},
						createElement( InnerBlocks.Content )
					)
				),
			);
		}
	}

	registerBlockType('digituki/banner', {
		apiVersion: 2,
		title: __( 'Digituki - Huomioalue' ),
		category: 'digituki',
		icon: 'format-gallery',
		supports: {
			anchor: true,
		},
		attributes: {
			contentIcon: {
				type: 'string',
				default: '',
			},
			contentIconPosition: {
				type: 'string',
				default: 'content--icon-side',
			}
		},
		edit: editBanner(),
		save: saveBanner()
	});

})(window.wp);
