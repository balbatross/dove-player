import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      src: 'http://columbidae.tv:9000/videos/test-folder/krash-pt1.mp4'
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({src: 'http://columbidae.tv:9000/videos/test-folder/house-1.mp4'})
    }, 5 * 1000)
  }

  render() {
    return <div>
      <h1>dove-player Demo</h1>
      <Example src={this.state.src} />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))