'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

var _video3 = require('./video');

var _video4 = _interopRequireDefault(_video3);

var _vrvideo = require('./vrvideo');

var _vrvideo2 = _interopRequireDefault(_vrvideo);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _vrimage = require('./vrimage');

var _vrimage2 = _interopRequireDefault(_vrimage);

var _audio = require('./audio');

var _audio2 = _interopRequireDefault(_audio);

require('video.js/dist/video-js.min.css');

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('videojs-vr');
require('aframe');

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
          return _react2.default.createElement(_vrvideo2.default, { camera: this.props.camera, src: this.props.src });
        } else {
          return _react2.default.createElement(_video4.default, { src: this.props.src });
        }
      case 'image':
        if (this.props.vr) {
          return _react2.default.createElement(_vrimage2.default, { src: this.props.src });
        } else {
          return _react2.default.createElement(_image2.default, { src: this.props.src });
        }
      case 'audio':
        if (this.props.vr) {} else {
          return _react2.default.createElement(_audio2.default, { src: this.props.src });
        }
      default:
        return null;
    }
  };

  Video360.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { style: { flex: 1, display: 'flex', height: '100%' } },
      this._renderView()
    );
  };

  return Video360;
}(_react.Component);

Video360.propTypes = process.env.NODE_ENV !== "production" ? {
  src: _propTypes2.default.string.isRequired,
  style: _propTypes2.default.object,
  vr: _propTypes2.default.bool,
  type: _propTypes2.default.string,
  width: _propTypes2.default.string,
  camera: _propTypes2.default.object

} : {};

exports.default = Video360;
module.exports = exports['default'];