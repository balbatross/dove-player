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
      fov: 75,
      rotation: 0,
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
    console.log("UPDATE", pos)
    if(this._vr && this._vr.camera){
      console.log(this.dtoR(pos.z))
      this._vr.camera.position.x = this.dtoR(pos.x)
      this._vr.camera.position.y = this.dtoR(pos.y)
      this._vr.camera.position.z = this.dtoR(pos.z)
    }
  }
  
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  readyWaiter(cb){
    this.waiter = setInterval(() => {
      if(this.player){
        if(!this._vr){
          this._vr = this.player.vr();
          if(this._vr && this._vr.camera){
            clearInterval(this.waiter); 
            cb()
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
    }, 250)
  } 

  dtoR(i){
    return i * (Math.PI / 180)
  }

  rtoD(i){
    const r = i > 0 ? i : (Math.PI * 2) + i
    return r * (180 / Math.PI)
  }

  orbitChanged(orbit){
    const position = orbit.target.object.rotation;
 //   console.log(position)
    let y = this.rtoD(position.y)
    let x = this.rtoD(position.x)
    let z = this.rtoD(position.z)
    let o = {x: x, y: y, z: z}
    if(this.props.onRotate)this.props.onRotate(o);
    this.setState({rotation: o, fov: this._vr.camera.fov})
  }

  componentDidMount(){
    this.player =  videojs(this.video, this.props, () => {
      console.log("Player ready")
      this.readyWaiter(() => {
        this.updateCameraPosition(this.state.camera);
        window.camera = this._vr;
        this._vr.camera.rotation.order = "YXZ"
        this._vr.controls3d.orbit.addEventListener('change', this.orbitChanged.bind(this));
      });
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
      {/*<div>
          {this.state.rotation}
          <br />
          {this.state.fov}
        </div>*/}
      {/*        <div style={{width: '20px', height: '30px', background: 'green', borderRadius: '5px', transform: `translateY(-50%) rotateZ(-${this.state.rotation}deg)`}} />*/}
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
