import React, {
  Component
} from 'react';

export default class Video extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <video src={this.props.src} style={this.props.style} />
    );
  }
}
