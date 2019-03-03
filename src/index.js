import React, {Component} from 'react'
import PropTypes from 'prop-types';
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css';
import './index.css';
require('videojs-vr')

class Video360 extends Component {
  constructor(props){
    super(props);
    this.state = {
      camera: {x: 0, y: 0, z: 0},
      ...props
    }
  }

  componentWillReceiveProps(newProps){
    if(this.props !== newProps){
      this.setState({...newProps})
    }

    if(this.props.src !== newProps.src){
      this.player.src({src: newProps.src})
    }

    if(this.props.camera !== newProps.camera){
      this.updateCameraPosition(newProps.camera);
    }
  }

  updateCameraPosition(pos){
    if(this._vr && this._vr.camera){
      console.log("Updating camera to ", pos)
      this._vr.camera.position.x = pos.x
      this._vr.camera.position.y = pos.y
      this._vr.camera.position.z = pos.z
    }
  }
  
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  readyWaiter(){
    this.waiter = setInterval(() => {
      if(!this._vr && !this._vr.camera){
        this._vr = this.player.vr();
        if(this._vr && this._vr.camera){
          this.updateCameraPosition(this.props.camera);
          window.camera = this._vr;
          this._vr.controls3d.orbit.addEventListener('change', this.orbitChanged.bind(this));
          clearInterval(this.waiter);
        }
      }
    }, 250)
  } 

  componentDidMount(){
    this.player =  videojs(this.video, this.props, () => {
      console.log("Player ready")
      this.readyWaiter();
    });
    this.player.mediainfo = this.player.mediainfo || {};
    this.player.mediainfo.projection = '360';
    // AUTO is the default and looks at mediainfo
    this.vr = this.player.vr({projection: 'AUTO', debug: true, forceCardboard: false});
    console.log("VR Ready") 

  }
  
  render() {
    return (
      <div style={{width: this.props.width || '100%'}}>
      <div className="video-360-container">
         <video
              ref={ node => this.video = node}
              height="300"
              className="video-js vjs-default-skin"
              controls={true}
              autoPlay={false}
              playsInline
              crossOrigin="anonymous"
              id="videojs-vr-player" >
     
             <source src={this.state.src} type="video/mp4"/>
            </video>
      </div>
      </div>

      )
  }
}

Video360.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  camera: PropTypes.object,

}

export default Video360
