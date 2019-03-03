var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import './index.css';
require('videojs-vr');

var Video360 = function (_Component) {
  _inherits(Video360, _Component);

  function Video360(props) {
    _classCallCheck(this, Video360);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = _extends({}, props);
    return _this;
  }

  Video360.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.setState(_extends({}, newProps));
    }

    if (this.props.src !== newProps.src) {
      this.player.src({ src: newProps.src });
    }

    if (this.props.camera !== newProps.camera) {
      this.updateCameraPosition(newProps.camera);
    }
  };

  Video360.prototype.updateCameraPosition = function updateCameraPosition(pos) {
    if (this.vr && this.vr.camera) {
      console.log("Updating camera to ", pos);
      this.vr.camera.position.x = pos.x;
      this.vr.camera.position.y = pos.y;
      this.vr.camera.position.z = pos.z;
    }
  };

  Video360.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.player = videojs('videojs-vr-player');
    this.player.mediainfo = this.player.mediainfo || {};
    this.player.mediainfo.projection = '360';
    // AUTO is the default and looks at mediainfo
    this.vr = this.player.vr({ projection: 'AUTO', debug: true, forceCardboard: false });

    setInterval(function () {
      _this2.vr = _this2.player.vr();
      _this2.updateCameraPosition(_this2.props.camera);
      //      this.vr.camera.position = this.props.camera;
      window.camera = _this2.vr;
      window.camera.controls3d.orbit.addEventListener('change', function (e) {
        console.log("cahnge", e);
      });
    }, 1000);
  };

  Video360.prototype.render = function render() {
    return React.createElement(
      'div',
      { style: { width: this.props.width || '100%' } },
      React.createElement(
        'div',
        { className: 'video-360-container' },
        React.createElement(
          'video',
          {
            height: '300',
            className: 'video-js vjs-default-skin',
            controls: true,
            autoPlay: false,
            playsInline: true,
            crossOrigin: 'anonymous',
            id: 'videojs-vr-player' },
          React.createElement('source', { src: this.state.src, type: 'video/mp4' })
        )
      )
    );
  };

  return Video360;
}(Component);

Video360.propTypes = process.env.NODE_ENV !== "production" ? {
  src: PropTypes.string.isRequired,
  width: PropTypes.string
} : {};

export default Video360;