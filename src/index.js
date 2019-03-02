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
  }

  componentDidMount(){
    this.player =  videojs('videojs-vr-player');
    this.player.mediainfo = this.player.mediainfo || {};
    this.player.mediainfo.projection = '360';
    // AUTO is the default and looks at mediainfo
    var vr = this.player.vr({projection: 'AUTO', debug: true, forceCardboard: false});
    window.camera = vr.camera;
  }
  
  render() {
    return (
      <div style={{width: this.props.width || '100%'}}>
      <div className="video-360-container">
         <video
              height="300"
              class="video-js vjs-default-skin"
              controls={true}
              autoPlay={false}
              playsinline
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
  width: PropTypes.string
}

export default Video360
