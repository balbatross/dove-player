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
    if(this.vr && this.vr.camera){
      console.log("Updating camera to ", pos)
      this.vr.camera.position.x = pos.x
      this.vr.camera.position.y = pos.y
      this.vr.camera.position.z = pos.z
    }
  }
  
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  componentDidMount(){
    this.player =  videojs('videojs-vr-player', () => {
      console.log("Player ready")
    });
    this.player.mediainfo = this.player.mediainfo || {};
    this.player.mediainfo.projection = '360';
    // AUTO is the default and looks at mediainfo
    this.vr = this.player.vr({projection: 'AUTO', debug: true, forceCardboard: false});
    console.log("VR Ready") 

    setInterval(() => {
      this.vr = this.player.vr()
      this.updateCameraPosition(this.props.camera);
//      this.vr.camera.position = this.props.camera;
      window.camera = this.vr
      window.camera.controls3d.orbit.addEventListener('change', (e) => {
        console.log("cahnge", e)
      })
    }, 1000);
  }
  
  render() {
    return (
      <div style={{width: this.props.width || '100%'}}>
      <div className="video-360-container">
         <video
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
