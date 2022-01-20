(function (wp) {

	const { __ } = wp.i18n;
	const { compose } = wp.compose;
	const { withSelect, withDispatch } = wp.data;

	const { PluginDocumentSettingPanel } = wp.editPost;
	const { ToggleControl, TextControl, PanelRow } = wp.components;
	const { registerPlugin } = wp.plugins;

	const DigitukiBodyClasses = ({ postType, postMeta, setPostMeta }) => {

		return (
			<PluginDocumentSettingPanel title={__('Advanced')} icon="edit" initialOpen="true">
				<PanelRow>
					<TextControl
						label={__('Additional CSS class(es)')}
						value={postMeta.extra_body_classes}
						onChange={(value) => setPostMeta({ extra_body_classes: value })}
					/>
				</PanelRow>
			</PluginDocumentSettingPanel>
		);
	}
	const ComposedDigitukiBodyClasses = compose([
		withSelect((select) => {
			return {
				postMeta: select('core/editor').getEditedPostAttribute('meta'),
				postType: select('core/editor').getCurrentPostType(),
			};
		}),
		withDispatch((dispatch) => {
			return {
				setPostMeta(newMeta) {
					dispatch('core/editor').editPost({ meta: newMeta });
				}
			};
		})
	])(DigitukiBodyClasses);

	registerPlugin('digituki-body-classes-plugin', {
		render() {
			return (<ComposedDigitukiBodyClasses />);
		}
	});

})(window.wp);

