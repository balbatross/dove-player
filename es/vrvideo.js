function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var VrVideo = function (_Component) {
  _inherits(VrVideo, _Component);

  function VrVideo(props) {
    _classCallCheck(this, VrVideo);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  VrVideo.prototype.render = function render() {
    return React.createElement(
      'a-scene',
      { embedded: true, style: { flex: 1, display: 'flex', flexDirection: 'column' } },
      React.createElement('a-videosphere', { style: { flex: 1 }, rotation: this.props.camera.x + ' ' + this.props.camera.y + ' ' + this.props.camera.z, src: '#video',
        'play-on-window-click': true,
        'play-on-vrdisplayactivate-or-enter-vr': true }),
      React.createElement('a-entity', { camera: true, 'look-controls': true, position: '0 0 0' }),
      React.createElement(
        'a-assets',
        { timeout: '1' },
        React.createElement(
          'video',
          { id: 'video', style: { display: "none" },
            autoPlay: true, loop: true, crossOrigin: 'anonymous', playsInline: true },
          React.createElement('source', { type: 'video/mp4',
            src: this.props.src })
        )
      )
    );
  };

  return VrVideo;
}(Component);

export { VrVideo as default };