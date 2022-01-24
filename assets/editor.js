function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function hdsInfoIcon() {
  const infoCircleFill = hdsIcons('info-circle-fill');
  return wp.element.createElement('svg', {
    className: 'icon icon--info-circle-fill',
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    tabindex: '-1'
  }, wp.element.createElement('path', {
    d: infoCircleFill
  }));
}

(function (wp) {
  const __ = wp.i18n.__;
  const {
    registerBlockType
  } = wp.blocks;
  const {
    Fragment,
    createElement
  } = wp.element;
  const {
    useBlockProps,
    BlockControls,
    InnerBlocks
  } = wp.blockEditor;
  const {
    SelectControl,
    PanelBody
  } = wp.components;
  const {
    RichText,
    InspectorControls
  } = wp.blockEditor;
  const {
    PanelColorSettings,
    getColorClassName,
    withColors
  } = wp.editor;

  function digitukiIconPositionControl(props) {
    let options = [{
      label: "H2",
      value: 'h2'
    }, {
      label: "H3",
      value: 'h3'
    }, {
      label: "H4",
      value: 'h4'
    }, {
      label: "H5",
      value: 'h5'
    }, {
      label: "H6",
      value: 'h6'
    }];
    return hdsSelectControl({
      label: wp.i18n.__('Heading'),
      value: props.attributes.contentIconPosition,
      attribute: 'contentTitleHeading',
      options: options
    }, props);
  }

  function edit(props) {
    const {
      attributes,
      setAttributes,
      clientId,
      setBgColor,
      bgColor
    } = props;
    const blockProps = useBlockProps({
      className: ''
    });
    const {
      blockId
    } = attributes;

    if (!blockId) {
      setAttributes({
        blockId: clientId
      });
    }

    return /*#__PURE__*/React.createElement("aside", blockProps, /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, null, /*#__PURE__*/React.createElement(SelectControl, {
      label: __('Heading'),
      value: attributes.contentTitleHeading,
      options: [{
        label: "H2",
        value: 'h2'
      }, {
        label: "H3",
        value: 'h3'
      }, {
        label: "H4",
        value: 'h4'
      }, {
        label: "H5",
        value: 'h5'
      }, {
        label: "H6",
        value: 'h6'
      }],
      onChange: newSize => setAttributes({
        contentTitleHeading: newSize
      })
    })), /*#__PURE__*/React.createElement(PanelColorSettings, {
      title: __('Taustaväri'),
      colorSettings: [{
        value: bgColor.color,
        onChange: setBgColor,
        label: __('Color')
      }]
    })), /*#__PURE__*/React.createElement("div", {
      class: "aside-content",
      style: {
        backgroundColor: bgColor.color
      }
    }, /*#__PURE__*/React.createElement(RichText, {
      tagName: attributes.contentTitleHeading,
      value: attributes.contentTitle,
      multiline: false,
      withoutInteractiveFormatting: true,
      allowedFormats: [],
      onChange: contentTitle => setAttributes({
        contentTitle
      }),
      placeholder: __('Header')
    }), /*#__PURE__*/React.createElement(InnerBlocks, null)));
  }

  function save(props) {
    const {
      attributes,
      setAttributes
    } = props;
    const {
      blockId,
      contentTitle,
      bgColor
    } = attributes;
    const bgClassName = 'aside-content ' + getColorClassName('background-color', bgColor);
    let saveProps = {};

    if (contentTitle) {
      Object.assign(saveProps, {
        'aria-labelledby': blockId
      });
    }

    const blockProps = useBlockProps.save(saveProps);
    return /*#__PURE__*/React.createElement("aside", blockProps, /*#__PURE__*/React.createElement("div", {
      className: bgClassName
    }, /*#__PURE__*/React.createElement(RichText.Content, {
      id: blockId,
      tagName: attributes.contentTitleHeading,
      value: attributes.contentTitle
    }), /*#__PURE__*/React.createElement(InnerBlocks.Content, null)));
  }

  registerBlockType('digituki/aside', {
    apiVersion: 2,
    title: __('Digituki - Sivupalsta'),
    category: 'digituki',
    icon: 'format-gallery',
    parent: ['core/column'],
    supports: {},
    attributes: {
      blockId: {
        type: 'string'
      },
      contentTitle: {
        type: 'string',
        default: ''
      },
      contentTitleHeading: {
        type: 'string',
        default: 'h2'
      },
      bgColor: {
        type: 'string',
        default: 'medium-light'
      }
    },
    edit: withColors('bgColor')(edit),
    save
  });
})(window.wp);

(function (wp) {
  const __ = wp.i18n.__;
  const {
    registerBlockType,
    registerBlockStyle
  } = wp.blocks;
  const {
    Fragment,
    createElement
  } = wp.element;
  const {
    useBlockProps,
    BlockControls,
    InnerBlocks
  } = wp.blockEditor;
  const ALLOWED_BLOCKS = ['core/paragraph', 'core/heading', 'core/list'];
  const MY_TEMPLATE = [['core/heading', {
    placeholder: 'Otsikko'
  }]];

  const BannerIcon = props => {
    const {
      icon
    } = props;
    if (!icon) return null;
    return /*#__PURE__*/React.createElement("div", {
      class: "content__inner content__inner--icon"
    }, icon);
  };

  const Banner = props => {
    const {
      icon,
      content,
      iconPosition
    } = props;
    return /*#__PURE__*/React.createElement("div", {
      className: `content ${icon ? iconPosition : 'content--no-icon'}`
    }, /*#__PURE__*/React.createElement(BannerIcon, {
      icon: icon
    }), /*#__PURE__*/React.createElement("div", {
      class: "content__inner content__inner--text"
    }, content));
  };

  function digitukiIconPositionControl(props) {
    let options = [{
      label: __("Vierellä"),
      value: 'content--icon-side'
    }, {
      label: __("Yläpuolella"),
      value: 'content--icon-top'
    }];
    return hdsSelectControl({
      label: wp.i18n.__('Icon position'),
      value: props.attributes.contentIconPosition,
      attribute: 'contentIconPosition',
      options: options
    }, props);
  }

  function editBanner(props) {
    const {
      attributes,
      setAttributes
    } = props;
    const {
      contentIconPosition
    } = attributes;
    const blockProps = useBlockProps({
      className: 'wp-block-hds-wp-banner-custom'
    });
    return /*#__PURE__*/React.createElement("div", blockProps, hdsInspectorControls({
      title: wp.i18n.__('Content'),
      initialOpen: true
    }, hdsIconControl(props), digitukiIconPositionControl(props)), /*#__PURE__*/React.createElement(Banner, {
      content: /*#__PURE__*/React.createElement(InnerBlocks, {
        allowedBlocks: ALLOWED_BLOCKS,
        template: MY_TEMPLATE
      }),
      icon: hdsContentIcon(props),
      iconPosition: contentIconPosition ? contentIconPosition : ''
    }));
  }

  function saveBanner(props) {
    const {
      attributes
    } = props;
    const {
      contentIconPosition
    } = attributes;
    const blockProps = useBlockProps.save({
      className: 'wp-block-hds-wp-banner-custom'
    });
    return /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(Banner, {
      icon: hdsContentIcon(props),
      iconPosition: contentIconPosition ? contentIconPosition : '',
      content: /*#__PURE__*/React.createElement(InnerBlocks.Content, null)
    }));
  }

  registerBlockType('digituki/banner', {
    apiVersion: 2,
    title: __('Digituki - Huomioalue'),
    category: 'digituki',
    icon: 'format-gallery',
    supports: {
      anchor: true
    },
    attributes: {
      contentIcon: {
        type: 'string',
        default: ''
      },
      contentIconPosition: {
        type: 'string',
        default: 'content--icon-side'
      }
    },
    edit: editBanner,
    save: saveBanner
  });
  registerBlockStyle('digituki/banner', {
    name: 'light',
    label: 'Vaalea'
  });
})(window.wp);

(function (wp) {
  const __ = wp.i18n.__;
  const {
    registerBlockType
  } = wp.blocks;
  const {
    Fragment,
    createElement
  } = wp.element;
  const {
    useBlockProps,
    BlockControls,
    InnerBlocks
  } = wp.blockEditor;
  const {
    ToolbarGroup,
    Button,
    SelectControl
  } = wp.components;
  const {
    RichText
  } = wp.blockEditor;

  function toolbar(props) {
    return createElement(BlockControls, {
      key: 'controls'
    }, createElement(ToolbarGroup, {}, hdsMediaUpload(props.attributes.mediaId, function (media) {
      props.setAttributes({
        mediaId: media.id,
        mediaUrl: media.sizes.large ? media.sizes.large.url : media.sizes.full.url,
        mediaWidth: media.sizes.large ? media.sizes.large.width : media.sizes.full.width,
        mediaHeight: media.sizes.large ? media.sizes.large.height : media.sizes.full.height,
        mediaAlt: media.alt,
        mediaSrcset: media.sizes.large ? media.sizes.large.srcset : media.sizes.full.srcset
      });
    }, function (mediaUpload) {
      return createElement(Button, {
        icon: 'format-image',
        label: __('Select image'),
        onClick: mediaUpload.open
      });
    })));
  }

  function imageConfig(props) {
    return {
      id: props.attributes.mediaId,
      alt: props.attributes.mediaAlt,
      src: props.attributes.mediaUrl,
      srcset: props.attributes.mediaSrcset,
      width: props.attributes.mediaWidth,
      height: props.attributes.mediaHeight,
      "aria-hidden": "true"
    };
  }

  const LinkButton = props => {
    const {
      label,
      href,
      type,
      edit
    } = props;
    const iconClass = "content__link hds-button button content__link--" + type;

    if (!href) {
      return null;
    }

    if (type == 'external') {
      return /*#__PURE__*/React.createElement("a", {
        href: edit != true ? href : undefined,
        className: iconClass,
        target: "_blank",
        rel: "noopener"
      }, label);
    }

    return /*#__PURE__*/React.createElement("a", {
      href: edit != true ? href : undefined,
      className: iconClass
    }, label);
  };

  const selectControl = (config, props) => {
    return wp.element.createElement(wp.components.PanelRow, {}, wp.element.createElement(wp.components.SelectControl, {
      label: config.label,
      value: config.value,
      onChange: function (value) {
        var newAttributes = {};
        newAttributes[config.attribute] = value;
        props.setAttributes(newAttributes);
      },
      options: config.options
    }));
  };

  function controls(props) {
    const {
      buttonType
    } = props.attributes;
    return hdsInspectorControls({
      title: wp.i18n.__('Content'),
      initialOpen: true
    }, hdsButtonTextControl(props), hdsButtonUrlControl(props), selectControl({
      label: 'Linkin kohde',
      options: [{
        label: "Sisäinen linkki",
        value: 'internal'
      }, {
        label: "Ulkoinen linkki",
        value: 'external'
      }],
      attribute: 'buttonType',
      value: buttonType
    }, props), createElement('button', {
      onClick: function () {
        props.setAttributes({
          mediaId: 0,
          mediaUrl: '',
          mediaWidth: '',
          mediaHeight: '',
          mediaAlt: '',
          mediaSrcset: ''
        });
      }
    }, __("Posta kuva")));
  }

  function edit(props) {
    const {
      attributes,
      setAttributes,
      clientId
    } = props;
    const {
      blockId,
      buttonUrl,
      buttonText,
      buttonType
    } = attributes;

    if (!blockId) {
      setAttributes({
        blockId: clientId
      });
    }

    const blockProps = useBlockProps({
      className: 'digituki-card grid__column'
    });
    return /*#__PURE__*/React.createElement(Fragment, null, toolbar(props), controls(props), /*#__PURE__*/React.createElement("div", _extends({
      class: "article"
    }, blockProps), /*#__PURE__*/React.createElement("div", {
      class: "digituki-card__content"
    }, /*#__PURE__*/React.createElement("div", {
      class: "digituki-card__header"
    }, /*#__PURE__*/React.createElement(RichText, {
      tagName: "h2",
      value: attributes.contentTitle,
      allowedFormats: ['core/bold', 'core/italic'],
      onChange: contentTitle => setAttributes({
        contentTitle
      }),
      placeholder: __('Header')
    })), /*#__PURE__*/React.createElement("div", {
      class: "digituki-card__image"
    }, hdsSingleImage(imageConfig(props))), /*#__PURE__*/React.createElement("div", {
      class: "digituki-card__summary"
    }, /*#__PURE__*/React.createElement(RichText, {
      tagName: "p",
      format: "string",
      value: attributes.contentText,
      allowedFormats: ['core/bold', 'core/italic', 'core/link'],
      onChange: contentText => setAttributes({
        contentText
      }),
      placeholder: __('Content')
    }), /*#__PURE__*/React.createElement(LinkButton, {
      href: buttonUrl,
      label: buttonText,
      type: buttonType,
      edit: true
    })))));
  }

  function save(props) {
    const {
      attributes,
      setAttributes,
      clientId
    } = props;
    const {
      blockId,
      buttonUrl,
      buttonText,
      buttonType
    } = attributes;
    const blockTitle = "title-" + blockId;
    const blockDescr = "content-" + blockId;
    const blockProps = useBlockProps.save({
      className: 'digituki-card grid__column'
    });
    return /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("article", {
      class: "digituki-card__content",
      tabindex: "0",
      "aria-labelledby": blockTitle,
      "aria-describedby": blockDescr
    }, /*#__PURE__*/React.createElement("div", {
      class: "digituki-card__header"
    }, /*#__PURE__*/React.createElement(RichText.Content, {
      tagName: "h2",
      value: attributes.contentTitle,
      id: blockTitle
    })), /*#__PURE__*/React.createElement("div", {
      class: "digituki-card__image"
    }, hdsSingleImage(imageConfig(props))), /*#__PURE__*/React.createElement("div", {
      class: "digituki-card__summary"
    }, /*#__PURE__*/React.createElement(RichText.Content, {
      tagName: "p",
      value: attributes.contentText,
      id: blockDescr
    }), /*#__PURE__*/React.createElement(LinkButton, {
      href: buttonUrl,
      label: buttonText,
      type: buttonType,
      edit: false
    }))));
  }

  registerBlockType('digituki/card', {
    apiVersion: 2,
    title: __('Digituki - Kortti'),
    category: 'digituki',
    icon: 'format-gallery',
    parent: ['digituki/card-group'],
    supports: {},
    attributes: {
      mediaId: {
        type: 'number',
        default: 0
      },
      mediaUrl: {
        type: 'string',
        default: ''
      },
      mediaWidth: {
        type: 'number',
        default: 0
      },
      mediaHeight: {
        type: 'number',
        default: 0
      },
      mediaAlt: {
        type: 'string',
        default: ''
      },
      mediaSrcset: {
        type: 'string',
        default: ''
      },
      contentTitle: {
        type: 'string',
        source: 'html',
        selector: 'h2',
        default: ''
      },
      contentText: {
        type: 'string',
        source: 'html',
        selector: 'p',
        default: ''
      },
      buttonText: {
        type: 'string',
        default: ''
      },
      buttonUrl: {
        type: 'string',
        default: ''
      },
      buttonType: {
        type: 'string',
        default: 'internal'
      },
      blockId: {
        type: 'string'
      }
    },
    edit,
    save
  });
})(window.wp);

(function (wp) {
  const __ = wp.i18n.__;
  const {
    registerBlockType,
    registerBlockStyle
  } = wp.blocks;
  const {
    Fragment,
    createElement
  } = wp.element;
  const {
    useBlockProps,
    __experimentalUseInnerBlocksProps,
    InnerBlocks
  } = wp.blockEditor;
  const ALLOWED_BLOCKS = ['digituki/card'];

  function edit() {
    return function (props) {
      const blockProps = useBlockProps({
        className: 'digituki-card-group grid xs-up-1 s-up-2 l-up-3'
      });

      const innerBlocksProps = __experimentalUseInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS
      });

      return /*#__PURE__*/React.createElement("div", innerBlocksProps);
    };
  }

  function save() {
    return function (props) {
      return createElement('div', useBlockProps.save({
        className: 'digituki-card-group grid xs-up-1 s-up-2 l-up-3'
      }), createElement(InnerBlocks.Content));
    };
  }

  registerBlockType('digituki/card-group', {
    apiVersion: 2,
    title: __('Digituki - Korttiryhmä'),
    category: 'digituki',
    icon: 'format-gallery',
    supports: {
      anchor: true
    },
    attributes: {},
    edit: edit(),
    save: save()
  });
  registerBlockStyle('digituki/card-group', {
    name: 'light',
    label: 'Kevyt'
  });
})(window.wp);

(function (wp) {
  const allowedEmbedBlocks = [];
  const heading = ['core/heading', {
    level: 2,
    placeholder: "Lisää otsikko"
  }];
  const group = ['digituki/aside', {}];
  const banner = ['digituki/banner', {}];
  const classNames = {
    'full': 'grid__column xs-12',
    'main': 'grid__column s-12 l-7 xl-8',
    'side': 'grid__column grid__column--sidebar s-12 l-5 xl-4',
    '50': 'grid_column l-6',
    '33': 'grid_column l-4'
  };

  const generateColumnVariationsIcon = function (d) {
    const el = wp.element.createElement;
    const SVG = wp.primitives.SVG;
    const icon = el(SVG, {
      width: 48,
      height: 48,
      viewBox: '0 0 48 48'
    }, el('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d: d
    }));
    return icon;
  };

  const templateWide = [];
  const columnVariations = [{
    name: 'hel-grid-column-100',
    title: '100',
    icon: generateColumnVariationsIcon('m39.0625 14h-30.0625v20.0938h30.0625zm-30.0625-2c-1.10457 0-2 .8954-2 2v20.0938c0 1.1045.89543 2 2 2h30.0625c1.1046 0 2-.8955 2-2v-20.0938c0-1.1046-.8954-2-2-2z'),
    attributes: {
      className: 'grid'
    },
    innerBlocks: [['core/column', {
      className: classNames['full']
    }, [heading]]],
    scope: ['block']
  }, {
    name: 'hel-grid-column-50-50',
    title: '50 / 50',
    icon: generateColumnVariationsIcon('M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z'),
    attributes: {
      className: 'grid'
    },
    innerBlocks: [['core/column', {
      className: classNames['50']
    }, [heading]], ['core/column', {
      className: classNames['50']
    }, [heading]]],
    scope: ['block']
  }, {
    name: 'hel-grid-column-66-33',
    title: '66 / 33',
    icon: generateColumnVariationsIcon('M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z'),
    attributes: {
      className: 'grid'
    },
    innerBlocks: [['core/column', {
      className: classNames['main']
    }, [heading]], ['digituki/aside', {
      className: classNames['side']
    }]],
    scope: ['block']
  }, {
    name: 'hel-grid-column-33-66',
    title: '33 / 66',
    icon: generateColumnVariationsIcon('M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z'),
    attributes: {
      className: 'grid'
    },
    innerBlocks: [['core/column', {
      className: classNames['side'],
      allowedEmbedBlocks
    }, [group]], ['core/column', {
      className: classNames['main']
    }, [heading]]],
    scope: ['block']
  }, {
    name: 'hel-grid-column-33-33-33',
    title: '33 / 33 / 33',
    icon: generateColumnVariationsIcon('M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z'),
    attributes: {
      className: 'grid'
    },
    innerBlocks: [['core/column', {
      className: classNames['33']
    }, [heading]], ['core/column', {
      className: classNames['33']
    }, [heading]], ['core/column', {
      className: classNames['33']
    }, [heading]]],
    scope: ['block']
  }, {
    name: 'hel-grid-column-banner',
    title: 'Bannerit',
    icon: generateColumnVariationsIcon('M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z'),
    attributes: {
      className: 'grid grid--banner'
    },
    innerBlocks: [['core/column', {
      className: 'grid__column xl-4 m-12 grid--banner__heading'
    }, [heading]], ['core/column', {
      className: 'grid__column xl-4 m-6 grid--banner__column'
    }, [banner]], ['core/column', {
      className: 'grid__column xl-4 m-6 grid--banner__column grid--banner__column--last '
    }, [banner]]],
    scope: ['block']
  }];
  window.addEventListener('load', function () {
    wp.blocks.getBlockVariations('core/columns').forEach(function (blockVariation) {
      if (-1 === allowedEmbedBlocks.indexOf(blockVariation.name)) {
        wp.blocks.unregisterBlockVariation('core/columns', blockVariation.name);
      }
    });
    columnVariations.forEach(function (variation) {
      wp.blocks.registerBlockVariation('core/columns', variation);
    });
  });
})(window.wp);

(function (wp) {
  const __ = wp.i18n.__;
  window.addEventListener('load', function () {
    wp.blocks.registerBlockVariation('core/group', {
      name: 'lift-group',
      title: __('Kainalojuttu'),
      attributes: {
        className: 'lift',
        backgroundColor: 'medium-light',
        tagName: 'article'
      },
      innerBlocks: [['core/group', {
        tagName: 'div',
        className: 'hds-container'
      }, [['core/heading', {
        level: 2,
        placeholder: __('Lisää otsikko')
      }]]]]
    });
  });
})(window.wp);

(function (wp) {
  const __ = wp.i18n.__;
  const {
    registerBlockType
  } = wp.blocks;
  const {
    Fragment,
    createElement
  } = wp.element;
  const {
    useBlockProps,
    BlockControls,
    InnerBlocks
  } = wp.blockEditor;
  const {
    TextControl,
    TextareaControl,
    PanelBody,
    PanelRow
  } = wp.components;
  const {
    MediaUpload,
    InspectorControls
  } = wp.blockEditor;

  const MapInfo = props => {
    const {
      label
    } = props;
    if (!label) return null;
    return /*#__PURE__*/React.createElement("div", {
      class: "mapinfo has-icon has-icon--before"
    }, /*#__PURE__*/React.createElement("span", {
      class: "mapinfo__icon",
      "aria-hidden": "true"
    }, hdsInfoIcon()), /*#__PURE__*/React.createElement("span", {
      class: "mapinfo__text"
    }, label));
  };

  const contentButton = props => {
    return hdsContentButton(props, {
      className: 'hds-button button',
      href: props.attributes.buttonUrl,
      target: '_blank',
      rel: 'noopener'
    }, hdsExternalLinkIcon());
  };

  function edit(props) {
    const {
      attributes,
      setAttributes
    } = props;
    const {
      mapUrl,
      iframeTitle,
      buttonText,
      buttonUrl,
      altText,
      infoText
    } = attributes;
    const blockProps = useBlockProps({
      className: ''
    });
    return /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
      title: "Asetukset",
      initialOpen: true
    }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(TextControl, {
      label: "Linkki karttaan",
      value: mapUrl,
      onChange: value => setAttributes({
        mapUrl: value
      })
    })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(TextControl, {
      label: "Otsake",
      value: iframeTitle,
      onChange: value => setAttributes({
        iframeTitle: value
      })
    })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(TextareaControl, {
      label: "Vaihtoehtoinen teksti ruudunlukijoille",
      value: altText,
      onChange: value => setAttributes({
        altText: value
      })
    })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(TextControl, {
      label: "Linkki kokoruutun\xE4kym\xE4\xE4n",
      value: buttonUrl,
      onChange: value => setAttributes({
        buttonUrl: value
      })
    })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(TextControl, {
      label: "Button text",
      value: buttonText,
      onChange: value => setAttributes({
        buttonText: value
      })
    })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(TextControl, {
      label: "Opasteteksti",
      value: infoText,
      onChange: value => setAttributes({
        infoText: value
      })
    })))), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(MapInfo, {
      label: infoText
    }), /*#__PURE__*/React.createElement("div", {
      class: "mapframe"
    }, /*#__PURE__*/React.createElement("iframe", {
      title: iframeTitle,
      src: mapUrl
    })), contentButton(props)));
  }

  function save(props) {
    const {
      attributes,
      setAttributes
    } = props;
    const {
      mapUrl,
      iframeTitle,
      buttonText,
      altText,
      infoText
    } = attributes;
    const blockProps = useBlockProps.save({
      className: 'palvelukartta'
    });
    return /*#__PURE__*/React.createElement("article", blockProps, /*#__PURE__*/React.createElement("div", {
      class: "mapcontent",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement(MapInfo, {
      label: infoText
    }), /*#__PURE__*/React.createElement("div", {
      class: "mapframe"
    }, /*#__PURE__*/React.createElement("iframe", {
      title: iframeTitle,
      src: mapUrl
    }))), altText && /*#__PURE__*/React.createElement("p", {
      class: "screen-reader-text"
    }, altText), contentButton(props));
  }

  registerBlockType('digituki/palvelukartta', {
    apiVersion: 2,
    title: __('Digituki - Palvelukartta'),
    category: 'digituki',
    icon: 'format-gallery',
    supports: {},
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
      buttonUrl: {
        type: 'string'
      },
      altText: {
        type: 'string'
      },
      infoText: {
        type: 'string'
      }
    },
    edit,
    save
  });
})(window.wp);

(function (wp) {
  const {
    __
  } = wp.i18n;
  const {
    useSelect,
    useDispatch
  } = wp.data;
  const {
    PluginDocumentSettingPanel
  } = wp.editPost;
  const {
    TextControl,
    PanelRow
  } = wp.components;
  const {
    registerPlugin
  } = wp.plugins;

  const DigitukiBodyClasses = () => {
    const {
      postMeta
    } = useSelect(select => {
      return {
        postMeta: select('core/editor').getEditedPostAttribute('meta')
      };
    });
    const {
      editPost
    } = useDispatch('core/editor', [postMeta.extra_body_classes]);
    return /*#__PURE__*/React.createElement(PluginDocumentSettingPanel, {
      title: __('Advanced'),
      icon: "edit",
      initialOpen: "true"
    }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(TextControl, {
      label: __('Additional CSS class(es)'),
      value: postMeta.extra_body_classes,
      onChange: value => editPost({
        meta: {
          extra_body_classes: value
        }
      })
    })));
  };

  registerPlugin('digituki-body-classes-plugin', {
    render() {
      return /*#__PURE__*/React.createElement(DigitukiBodyClasses, null);
    }

  });
})(window.wp);