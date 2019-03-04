import React, {Component} from 'react'
import {render} from 'react-dom'

import DovePlayer from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      src: 'http://columbidae.tv:9000/videos/test-folder/krash-pt1.mp4',
      x: 0,
      y: 0,
      z: 0
    }
  }

  componentDidMount(){
  }

  render() {
    return <div>
      <h1>dove-player Demo</h1>
      <DovePlayer width={"50%"} src={this.state.src} camera={{x: this.state.x, y: this.state.y, z: this.state.z}} />
      <div>
        <input type="number" placeholder="X" value={this.state.x} onChange={(e) => this.setState({x: e.target.value})}/> 
        <input type="number" placeholder="Y" value={this.state.y} onChange={(e) => this.setState({y: e.target.value})}/>
        <input type="number" placeholder="Z" value={this.state.z} onChange={(e) => this.setState({z: e.target.value})}/>
      </div>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
