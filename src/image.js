import React, {
  Component
} from 'react';

export default class Image extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <img src={this.props.src} style={this.props.style} />
    );
  }
}
