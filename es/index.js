var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';

import Video from './video';
import VrVideo from './vrvideo';
import VrImage from './vrimage';
import Image from './image';
import Audio from './audio';
import 'video.js/dist/video-js.min.css';
import './index.css';

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

    //      this.updateCameraPosition(newProps.camera);
  };

  Video360.prototype.updateCameraPosition = function updateCameraPosition(pos) {
    console.log("UPDATE", pos);
    if (this._vr && this._vr.camera) {
      this._vr.camera.position.x = this.dtoR(pos.x);
      this._vr.camera.position.y = this.dtoR(pos.y);
      this._vr.camera.position.z = this.dtoR(pos.z);
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
          if (_this2._vr && _this2._vr.camera) {
            clearInterval(_this2.waiter);
            cb();
          }
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

  Video360.prototype.dtoR = function dtoR(i) {
    return i * (Math.PI / 180);
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
    /*
      this.player =  videojs(this.video, this.props, () => {
        console.log("Player ready")
        this.player.on('loadedmetadata', () => {
          console.log("METADATA")
          this.updateCameraPosition(this.state.camera);
        })
        this.readyWaiter(() => {
          window.camera = this._vr;
          this._vr.camera.rotation.order = "YXZ"
          this._vr.controls3d.orbit.addEventListener('change', this.orbitChanged.bind(this));
        });
      });
      this.player.mediainfo = this.player.mediainfo || {};
      this.player.mediainfo.projection = '360';
      // AUTO is the default and looks at mediainfo
      this.vr = this.player.vr({projection: 'AUTO', debug: true, forceCardboard: false});
      console.log("VR Ready")*/

  };

  Video360.prototype._renderView = function _renderView() {
    switch (this.props.type) {
      case 'video':
        if (this.props.vr) {
          return React.createElement(VrVideo, { camera: this.props.camera, src: this.props.src });
        } else {
          return React.createElement(Video, { src: this.props.src });
        }
      case 'image':
        if (this.props.vr) {
          return React.createElement(VrImage, { src: this.props.src });
        } else {
          return React.createElement(Image, { src: this.props.src });
        }
      case 'audio':
        if (this.props.vr) {} else {
          return React.createElement(Audio, { src: this.props.src });
        }
      default:
        return null;
    }
  };

  Video360.prototype.render = function render() {
    return React.createElement(
      'div',
      { style: { flex: 1, display: 'flex', height: '100%' } },
      this._renderView()
    );
  };

  return Video360;
}(Component);

Video360.propTypes = process.env.NODE_ENV !== "production" ? {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  vr: PropTypes.bool,
  type: PropTypes.string,
  width: PropTypes.string,
  camera: PropTypes.object

} : {};

export default Video360;