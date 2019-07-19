import React from 'react'
import ReactDom,{ render } from 'react-dom'
import './styles/index.scss'
import img from './statics/41298094_1769261209847679_5264124158081499136_n.jpg'

class App extends React.Component{
  render()
  {
    return (
      <div>
        <h1 className="title">Hello World!</h1>
        <img src={img} alt="img"/>
      </div>
    )

  }
}


render(<App/>,document.getElementById('root'))