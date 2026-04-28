(function (wp) {

	const { __ } = wp.i18n;
	const { useSelect, useDispatch } = wp.data;

	const { PluginDocumentSettingPanel } = wp.editPost;
	const { TextControl, PanelRow } = wp.components;
	const { registerPlugin } = wp.plugins;

	const DigitukiBodyClasses = () => {
		const { postMeta } = useSelect((select) => {
			return {
				postMeta: select('core/editor').getEditedPostAttribute('meta'),
			};
		});
		const { editPost } = useDispatch('core/editor', [postMeta.extra_body_classes]);

		return (
			<PluginDocumentSettingPanel title={__('Advanced')} icon="edit" initialOpen="true">
				<PanelRow>
					<TextControl
						label={__('Additional CSS class(es)')}
						value={postMeta.extra_body_classes}
						onChange={(value) => editPost({ meta: { extra_body_classes: value } })}
					/>
				</PanelRow>
			</PluginDocumentSettingPanel>
		);
	}

	registerPlugin('digituki-body-classes-plugin', {
		render() {
			return (<DigitukiBodyClasses />);
		}
	});

})(window.wp);

