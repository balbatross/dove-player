import React, {
  Component
} from 'react';

export default class VrVideo extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return ( 
      <a-scene embedded style={{flex: 1, display: 'flex', flexDirection: 'column'}}> 
          <a-videosphere style={{flex: 1}} rotation={`${this.props.camera.x} ${this.props.camera.y} ${this.props.camera.z}`} src="#video" 
                         play-on-window-click
                         play-on-vrdisplayactivate-or-enter-vr>
          </a-videosphere>    
        <a-entity camera look-controls position="0 0 0"></a-entity>
        <a-assets timeout="1">
        
            <video id="video" style={{display:"none"}}
                 autoPlay loop crossOrigin="anonymous" playsInline>
      
       
              <source type="video/mp4"
                   src={this.props.src} />
            </video>
        </a-assets>
      </a-scene>
    );
  }
}
