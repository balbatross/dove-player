import React, {
  Component
} from 'react';

export default class VrVideo extends Component {
  constructor(props){
    super(props);
    this.state = {
      playing: true
    }
  }

  _play(){
    this.setState({playing: !this.state.playing})
//    document.querySelector("#video").components.material.material.map.image.play();
  }

  render(){
    return ( 
    <div className="dove-player__vr-video">
      <div className="vr-video__button" onClick={this._play.bind(this)}>
      <div className={`vr-video__${(!this.state.playing) ? 'play' : 'pause'}-button`}/>
      </div>
      <a-scene embedded style={{flex: 1, display: 'flex', flexDirection: 'column'}}> 
          <a-videosphere 
            play-on-window-click
            style={{flex: 1}} rotation={`${this.props.camera.x} ${this.props.camera.y} ${this.props.camera.z}`} src="#video"> 
          </a-videosphere>    

        <a-assets>
        
            <video id="video" style={{display:"none"}}
                 autoPlay crossOrigin="anonymous" playsInline>
      
       
              <source type="video/mp4"
                   src={this.props.src} />
            </video>
        </a-assets>
      </a-scene>
    </div>
    );
  }
}
