function hdsInfoIcon() {
  const infoCircleFill = hdsIcons( 'info-circle-fill' );
	return wp.element.createElement(
		'svg',
		{
			className: 'icon icon--info-circle-fill',
			viewBox: '0 0 24 24',
			'aria-hidden': 'true',
			tabindex: '-1',
		},
		wp.element.createElement('path', {
			d: infoCircleFill,
		})
	);
}