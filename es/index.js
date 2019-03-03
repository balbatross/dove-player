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

    _this.state = _extends({
      camera: { x: 0, y: 0, z: 0 },
      fov: 75,
      rotation: 0
    }, props);
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
    if (this._vr && this._vr.camera) {
      this._vr.camera.position.x = pos.x;
      this._vr.camera.position.y = pos.y;
      this._vr.camera.position.z = pos.z;
    }
  };

  Video360.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  };

  Video360.prototype.readyWaiter = function readyWaiter(cb) {
    var _this2 = this;

    this.waiter = setInterval(function () {
      if (_this2.player) {
        if (!_this2._vr) {
          _this2._vr = _this2.player.vr();
          clearInterval(_this2.waiter);
          cb();
        }
      }

      /*      if(!this._vr && !this._vr.camera){
              this._vr = this.player.vr();
              console.log(this.player.vr())
              if(this._vr && this._vr.camera){
                this.updateCameraPosition(this.props.camera);
                window.camera = this._vr;
                this._vr.controls3d.orbit.addEventListener('change', this.orbitChanged.bind(this));
                clearInterval(this.waiter);
              }
            }*/
    }, 250);
  };

  Video360.prototype.rtoD = function rtoD(i) {
    var r = i > 0 ? i : Math.PI * 2 + i;
    return r * (180 / Math.PI);
  };

  Video360.prototype.orbitChanged = function orbitChanged(orbit) {
    var position = orbit.target.object.rotation;
    //   console.log(position)
    var y = this.rtoD(position.y);
    var x = this.rtoD(position.x);
    var z = this.rtoD(position.z);
    var o = { x: x, y: y, z: z };
    if (this.props.onRotate) this.props.onRotate(o);
    this.setState({ rotation: o, fov: this._vr.camera.fov });
  };

  Video360.prototype.componentDidMount = function componentDidMount() {
    var _this3 = this;

    this.player = videojs(this.video, this.props, function () {
      console.log("Player ready");
      _this3.readyWaiter(function () {
        _this3.updateCameraPosition(_this3.state.camera);
        window.camera = _this3._vr;
        _this3._vr.camera.rotation.order = "YXZ";
        _this3._vr.controls3d.orbit.addEventListener('change', _this3.orbitChanged.bind(_this3));
      });
    });
    this.player.mediainfo = this.player.mediainfo || {};
    this.player.mediainfo.projection = '360';
    // AUTO is the default and looks at mediainfo
    this.vr = this.player.vr({ projection: 'AUTO', debug: true, forceCardboard: false });
    console.log("VR Ready");
  };

  Video360.prototype.render = function render() {
    var _this4 = this;

    return React.createElement(
      'div',
      { style: { width: this.props.width || '100%' } },
      React.createElement(
        'div',
        { className: 'video-360-container' },
        React.createElement(
          'video',
          {
            ref: function ref(node) {
              return _this4.video = node;
            },
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
  width: PropTypes.string,
  camera: PropTypes.object

} : {};

export default Video360;