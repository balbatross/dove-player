import React, {Component} from 'react'
import {render} from 'react-dom'

import DovePlayer from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      src: '',
      demos: [
        {
          type: 'image',
          vr: false,
          src: 'https://instagram.fwlg2-1.fna.fbcdn.net/vp/fb86ccf334baeb52947520a323922a60/5D19C700/t51.2885-15/e35/53661103_2060683977565725_5760995960166473004_n.jpg?_nc_ht=instagram.fwlg2-1.fna.fbcdn.net'
        },
        {
          type: 'video', 
          vr: false, 
          src: 'http://columbidae.tv:9000/videos/test-folder/krash-pt1.mp4',
        },
        {
          type: 'video',
          vr: true,
          src: 'http://columbidae.tv:9000/videos/test-folder/all-me.mp4',
          camera: {
            x: 0,
            y: 0,
            z: 0,
          }
        },
        {
          type: 'image',
          vr: true,
          src: 'https://instagram.fwlg2-1.fna.fbcdn.net/vp/fb86ccf334baeb52947520a323922a60/5D19C700/t51.2885-15/e35/53661103_2060683977565725_5760995960166473004_n.jpg?_nc_ht=instagram.fwlg2-1.fna.fbcdn.net'
        }
      ]
    }
  }

  componentDidMount(){
  }

  render() {
    return <div>
      <h1>dove-player Demo</h1>
      <div className="demo-container" style={{display: 'flex', flexWrap: 'wrap'}}>
      {this.state.demos.map((x, i) => {
        return (
          <div key={i} style={{width: '600px', height: '300px'}}>
            <DovePlayer {...x} />
          </div>
        );
      })}
      </div>
    </div>
  }
}


render(<Demo/>, document.querySelector('#demo'))
