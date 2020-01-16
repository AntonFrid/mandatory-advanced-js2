import React from 'react';
import { Redirect, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '', description: '', director: '', rating: 0, };
  }

  componentDidMount() {
    const axios = require('axios');

    axios.get('http://3.120.96.16:3001/movies/' + this.props.id)
      .then((response) => {
        let data = response.data;

        this.setState({
          title: data.title,
          description: data.description,
          director: data.director,
          rating: data.rating
        });
      })
      .catch((error) => {
        console.log(error.response.status);
      })
  }

  sendDataToServer(data) {
    const axios = require('axios');

    axios.put('http://3.120.96.16:3001/movies/' + this.props.id, {
      title: this.state.title,
      description: this.state.description,
      director: this.state.director,
      rating: this.state.rating
    })
      .then(() => {
        this.props.match.history.goBack();
      })
      .catch((error) => {
        console.log(error.response.status);
      })
  }

  render() {
    return (
      <div className='add-edit-box'>
      <Helmet>
        <title>{ 'Edit - ' + this.state.title }</title>
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

export default Edit;
