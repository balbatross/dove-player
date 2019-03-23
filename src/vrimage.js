import React, {
  Component
} from 'react';

export default class VrImage extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <a-scene>
        <a-sky src={this.props.src} rotation={this.props.rotation}></a-sky>
      </a-scene>
    );
  }
}
