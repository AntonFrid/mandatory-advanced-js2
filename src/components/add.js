import React from 'react';
import { Redirect, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = { finished: false, title: '', description: '', director: '', rating: 0, };
  }

  sendDataToServer(data) {
    const axios = require('axios');

    axios.post('http://3.120.96.16:3001/movies', {
      title: this.state.title,
      description: this.state.description,
      director: this.state.director,
      rating: this.state.rating
    })
      .then(() => {
        this.setState({
          title: '', description: '', director: '', rating: 0,
          finished: true
        });
      })
      .catch((error) => {
        console.log(error.response.status);
      })
  }

  render() {
    if(this.state.finished){
      return <Redirect to='/' />;
    }
    return (
      <div className='add-edit-box'>
        <Helmet>
          <title>Add</title>
        </Helmet>
        <form onSubmit={ (e) => {
          e.preventDefault();
          this.sendDataToServer(this.state.data);
        }}>
          <label>Title</label>
          <input type='text' value={ this.state.title } onChange={ (e) => {
            this.setState({ title: e.target.value });
          }}/>
          <label>Director</label>
          <input type='text' value={ this.state.director } onChange={ (e) => {
            this.setState({ director: e.target.value });
          }}/>
          <label>Rating</label>
          <input type="number"
            value={ this.state.rating }
            placeholder="0"
            step="0.1"
            min="0.0"
            max="5.0"
            onChange={ (e) => {
              this.setState({ rating: e.target.value });
            }}/>
          <label>Description</label>
          <textarea rows='6' value={ this.state.description } onChange={ (e) => {
            this.setState({ description: e.target.value });
          }}/>
          <input className='submit-btn' type='submit' value='Submit'/>
        </form>
      </div>
    )
  }
}

export default Add;
