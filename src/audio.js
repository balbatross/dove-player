import React, {
  Component
} from 'react';

export default class Audio extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <audio src={this.props.src} controls={true}/>
    );
  }
}
