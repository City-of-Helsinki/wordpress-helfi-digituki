(function(wp){

	const __ = wp.i18n.__;
	const { registerBlockType, registerBlockStyle } = wp.blocks;
	const { Fragment, createElement } = wp.element;
	const { useBlockProps, BlockControls, InnerBlocks } = wp.blockEditor;


	const ALLOWED_BLOCKS = ['core/paragraph', 'core/heading', 'core/list'];
	const MY_TEMPLATE = [
		[ 'core/heading', { placeholder: 'Otsikko' } ]
	]
	const BannerIcon = (props) => {
		const {icon} = props;
		if (!icon)
			return (null);

		return (
			<div class="content__inner content__inner--icon">
				{ icon }
			</div>
		)
	}
	const Banner = (props) => {
		const {icon, content, iconPosition} = props;
		
		return(	
			<div className={`content ${icon ? iconPosition : 'content--no-icon'}`}>
				<BannerIcon icon={icon} />
				<div class="content__inner content__inner--text">
					{content}
				</div>
			</div>
		)
	}
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

	function editBanner(props) {
        const { attributes, setAttributes } = props
        const { contentIconPosition } = attributes;

		const blockProps = useBlockProps({ 
            className: 'wp-block-hds-wp-banner-custom'
        });
        return (
            <div {...blockProps}>
				{
				hdsInspectorControls(
					{
						title: wp.i18n.__('Content'),
						initialOpen: true,
					},
					hdsIconControl(props),
					digitukiIconPositionControl(props)
				)
				}
				<Banner 
					content={<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={ MY_TEMPLATE } />} 
					icon={hdsContentIcon(props)}
					iconPosition={contentIconPosition ? contentIconPosition : ''}
				/>
			</div>
		)
	}

	function saveBanner(props) {
        const { attributes } = props
        const { contentIconPosition } = attributes;
        const blockProps = useBlockProps.save({
            className: 'wp-block-hds-wp-banner-custom'
        });

		return (
			<div {...blockProps}>
				<Banner 
					icon={hdsContentIcon(props)}
					iconPosition={contentIconPosition ? contentIconPosition : ''}
					content={<InnerBlocks.Content />} 
				/>
			</div>
		)
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
		edit: editBanner,
		save: saveBanner
	});

	registerBlockStyle('digituki/banner',{
		name: 'light',
		label: 'Vaalea'
	})

})(window.wp);
