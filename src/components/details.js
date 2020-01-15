import React from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] } ;
  }

  componentDidMount() {
    const axios = require('axios');

    axios.get('http://3.120.96.16:3001/movies/' + this.props.id)
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data });
      })
  }

  render() {
    return (
      <>
        <Helmet>
          <title>{ 'Details - ' + this.state.data.title }</title>
        </Helmet>
        <h1>{ this.state.data.title }</h1>
        <p>{ this.state.data.director }</p>
        <p>{ this.state.data.rating }</p>
        <p>{ this.state.data.description }</p>
        <Link to={ '/edit/' + this.props.id }><button>Edit</button></Link>
      </>
    )
  }
}

export default Details;