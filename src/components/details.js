import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loadStatus: null, data: [] } ;
  }

  componentDidMount() {
    axios.get('http://3.120.96.16:3001/movies/' + this.props.id)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        this.setState({ loadStatus: error.response.status });
      })
  }

  render() {
    return (
      <div id='details-box'>
        <Helmet>
          <title>{ 'Details - ' + this.state.data.title }</title>
        </Helmet>
        { this.state.loadStatus === 404 ? <h1 style={ { color: '#ed493e' } }> Movie does not exist* </h1> : <h1>{ this.state.data.title } </h1> }
        <div>
          <label><b>Director:</b></label>
          <p>{ this.state.data.director }</p>
        </div>
        <div>
          <label><b>Rating:</b></label>
          <p>{ this.state.data.rating }</p>
        </div>
        <label><b>Description</b></label>
        <p>{ this.state.data.description }</p>
        <Link to={ '/edit/' + this.props.id }><button>Edit</button></Link>
      </div>
    )
  }
}

export default Details;
