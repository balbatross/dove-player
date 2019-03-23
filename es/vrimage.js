function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var VrImage = function (_Component) {
  _inherits(VrImage, _Component);

  function VrImage(props) {
    _classCallCheck(this, VrImage);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  VrImage.prototype.render = function render() {
    return React.createElement(
      'a-scene',
      null,
      React.createElement('a-sky', { src: this.props.src, rotation: this.props.rotation })
    );
  };

  return VrImage;
}(Component);

export { VrImage as default };