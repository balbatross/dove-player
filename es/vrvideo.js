function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var VrVideo = function (_Component) {
  _inherits(VrVideo, _Component);

  function VrVideo(props) {
    _classCallCheck(this, VrVideo);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      playing: true
    };
    return _this;
  }

  VrVideo.prototype._play = function _play() {
    this.setState({ playing: !this.state.playing });
    //    document.querySelector("#video").components.material.material.map.image.play();
  };

  VrVideo.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "dove-player__vr-video" },
      React.createElement(
        "div",
        { className: "vr-video__button", onClick: this._play.bind(this) },
        React.createElement("div", { className: "vr-video__" + (!this.state.playing ? 'play' : 'pause') + "-button" })
      ),
      React.createElement(
        "a-scene",
        { embedded: true, style: { flex: 1, display: 'flex', flexDirection: 'column' } },
        React.createElement("a-videosphere", {
          "play-on-window-click": true,
          style: { flex: 1 }, rotation: this.props.camera.x + " " + this.props.camera.y + " " + this.props.camera.z, src: "#video" }),
        React.createElement(
          "a-assets",
          null,
          React.createElement(
            "video",
            { id: "video", style: { display: "none" },
              autoPlay: true, crossOrigin: "anonymous", playsInline: true },
            React.createElement("source", { type: "video/mp4",
              src: this.props.src })
          )
        )
      )
    );
  };

  return VrVideo;
}(Component);

export { VrVideo as default };