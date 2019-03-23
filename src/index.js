import React, {Component} from 'react'
import PropTypes from 'prop-types';
import videojs from 'video.js'

import Video from './video';
import VrVideo from './vrvideo';


import Audio from './audio';
import 'video.js/dist/video-js.min.css';
import './index.css';

require('aframe')

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
    
//      this.updateCameraPosition(newProps.camera);
    
  }

  updateCameraPosition(pos){
    console.log("UPDATE", pos)
    if(this._vr && this._vr.camera){
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

  }

  _renderView(){
    switch(this.props.type){
      case 'video':
        if(this.props.vr){
          return (<VrVideo camera={this.props.camera} src={this.props.src} />)
        }else{
          return (<Video src={this.props.src} />)
        }
      case 'image': 
        if(this.props.vr){
          return (<VrImage src={this.props.src} />)
        }else{
          return (<Image src={this.props.src} />)
        }
      case 'audio':
        if(this.props.vr){
          
        }else{
          return (<Audio src={this.props.src} />)
        }
      default:
        return null;
    }
  }
  
  render() {
    return (
      <div style={{flex: 1, display: 'flex', height: '100%'}}> 
        {this._renderView()}
      </div>

      )
  }
}

Video360.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  vr: PropTypes.bool,
  type: PropTypes.string,
  width: PropTypes.string,
  camera: PropTypes.object,

}

export default Video360
