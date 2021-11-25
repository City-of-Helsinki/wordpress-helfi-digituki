(function (wp) {
    const allowedEmbedBlocks = [];

    const heading = ['core/heading', {level: 2, placeholder: "Lisää otsikko"}];
    const group = ['digituki/aside', {}];
    const banner = ['digituki/banner', {}];
    const generateColumnVariationsIcon = function(d){
        const el = wp.element.createElement;
        const SVG = wp.primitives.SVG;

        const icon = el(
            SVG,
            { width: 48, height: 48, viewBox: '0 0 48 48' },
            el('path', {
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            d: d
            })
        );

        return icon;
    }
    const templateWide = [

    ]
    const columnVariations = [
        {
            name: 'hel-grid-column-100',
            title: '100',
            icon: generateColumnVariationsIcon('m39.0625 14h-30.0625v20.0938h30.0625zm-30.0625-2c-1.10457 0-2 .8954-2 2v20.0938c0 1.1045.89543 2 2 2h30.0625c1.1046 0 2-.8955 2-2v-20.0938c0-1.1046-.8954-2-2-2z'),
            attributes: {
            className: 'grid'
            },
            innerBlocks: [
            [ 'core/column', { className: 'grid__column xs-12' }, [ heading ] ]
            ],
            scope: [ 'block' ],
        },
        {
            name: 'hel-grid-column-50-50',
            title: '50 / 50',
            icon: generateColumnVariationsIcon('M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z'),
            attributes: {
            className: 'grid'
            },
            innerBlocks: [
            [ 'core/column', { className: 'grid__column l-6' }, [ heading ] ],
            [ 'core/column', { className: 'grid__column l-6' }, [ heading ] ],
            ],
            scope: [ 'block' ],
        },
        {
            name: 'hel-grid-column-66-33',
            title: '66 / 33',
            icon: generateColumnVariationsIcon('M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z'),
            attributes: {
            className: 'grid'
            },
            innerBlocks: [
            [ 'core/column', { className: 'grid__column l-8' }, [ heading ] ],
            [ 'core/column', { className: 'grid__column l-4 grid__column--sidebar', allowedEmbedBlocks }, [ group ]],
            ],
            scope: [ 'block' ],
        },
        {
            name: 'hel-grid-column-33-66',
            title: '33 / 66',
            icon: generateColumnVariationsIcon('M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z'),
            attributes: {
            className: 'grid'
            },
            innerBlocks: [
            [ 'core/column', { className: 'grid__column l-4 grid__column--sidebar', allowedEmbedBlocks }, [ group ] ],
            [ 'core/column', { className: 'grid__column l-8' }, [ heading ] ],
            ],
            scope: [ 'block' ],
        },
        {
            name: 'hel-grid-column-33-33-33',
            title: '33 / 33 / 33',
            icon: generateColumnVariationsIcon('M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z'),
            attributes: {
            className: 'grid'
            },
            innerBlocks: [
            [ 'core/column', { className: 'grid__column l-4' }, [ heading ] ],
            [ 'core/column', { className: 'grid__column l-4' }, [ heading ] ],
            [ 'core/column', { className: 'grid__column l-4' }, [ heading ] ]
            ],
            scope: [ 'block' ],
        },
        {
            name: 'hel-grid-column-banner',
            title: 'Bannerit',
            icon: generateColumnVariationsIcon('M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z'),
            attributes: {
            className: 'grid grid--banner'
            },
            innerBlocks: [
            [ 'core/column', { className: 'grid__column xl-4 m-12 grid--banner__heading' }, [ heading ] ],
            [ 'core/column', { className: 'grid__column xl-4 m-6 grid--banner__column' }, [ banner ] ],
            [ 'core/column', { className: 'grid__column xl-4 m-6 grid--banner__column grid--banner__column--last ' }, [ banner ] ]
            ],
            scope: [ 'block' ],
        }
    ];
    window.addEventListener('load', function () {
        wp.blocks.getBlockVariations('core/columns').forEach(function (blockVariation) {
            if (-1 === allowedEmbedBlocks.indexOf(blockVariation.name)) {
                wp.blocks.unregisterBlockVariation('core/columns', blockVariation.name);
            }
        });
    
        columnVariations.forEach(function(variation){
            wp.blocks.registerBlockVariation( 'core/columns', variation);
        })
    });
      
})(window.wp);