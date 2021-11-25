(function (wp) {
    const __ = wp.i18n.__;

    window.addEventListener('load', function () {
        wp.blocks.registerBlockVariation(
            'core/group',
            {
                name: 'lift-group',
                title: __('Kainalojuttu'),
                attributes: {
                    className: 'lift',
                    backgroundColor: 'medium-light',
                    tagName: 'article'
                },
                innerBlocks: [
                    ['core/heading', {level: 2, placeholder: __('Lisää otsikko')}]
                ]
            },
        );
    });
})(window.wp);