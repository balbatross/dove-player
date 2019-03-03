import React, {Component} from 'react'
import {render} from 'react-dom'

import DovePlayer from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      src: 'http://columbidae.tv:9000/videos/test-folder/krash-pt1.mp4'
    }
  }

  componentDidMount(){
  }

  render() {
    return <div>
      <h1>dove-player Demo</h1>
      <DovePlayer width={"50%"} src={this.state.src} />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
