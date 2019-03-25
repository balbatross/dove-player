"use strict";

exports.__esModule = true;
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VrVideo = function (_Component) {
  _inherits(VrVideo, _Component);

  function VrVideo(props) {
    _classCallCheck(this, VrVideo);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  VrVideo.prototype._play = function _play() {
    //    document.querySelector("#video").components.material.material.map.image.play();
  };

  VrVideo.prototype.render = function render() {
    return _react2.default.createElement(
      "div",
      { className: "dove-player__vr-video" },
      _react2.default.createElement("div", { className: "vr-video__play-button", onClick: this._play.bind(this) }),
      _react2.default.createElement(
        "a-scene",
        { embedded: true, style: { flex: 1, display: 'flex', flexDirection: 'column' } },
        _react2.default.createElement("a-videosphere", {
          "play-on-window-click": true,
          style: { flex: 1 }, rotation: this.props.camera.x + " " + this.props.camera.y + " " + this.props.camera.z, src: "#video" }),
        _react2.default.createElement(
          "a-assets",
          null,
          _react2.default.createElement(
            "video",
            { id: "video", style: { display: "none" },
              autoPlay: true, crossOrigin: "anonymous", playsInline: true },
            _react2.default.createElement("source", { type: "video/mp4",
              src: this.props.src })
          )
        )
      )
    );
  };

  return VrVideo;
}(_react.Component);

exports.default = VrVideo;
module.exports = exports["default"];