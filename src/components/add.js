import React from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errorStatus: null, finished: false, title: '', description: '', director: '', rating: 0, };
  }

  sendDataToServer(data) {
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
        this.setState({ errorStatus: error.response.status });
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
          <label><b>Title</b></label>
          <input type='text' value={ this.state.title } onChange={ (e) => {
            this.setState({ errorStatus: null, title: e.target.value });
          }}/>
          <p className={ (this.state.errorStatus === 400 && (this.state.title.length < 1 || this.state.title.length > 40)) ? 'validationTextVisible' : 'validationTextHidden' }>
            Title must be 1-40 characters*</p>
          <label><b>Director</b></label>
          <input type='text' value={ this.state.director } onChange={ (e) => {
            this.setState({ errorStatus: null, director: e.target.value });
          }}/>
          <p className={ (this.state.errorStatus === 400 && (this.state.director.length < 1 || this.state.director.length > 40)) ? 'validationTextVisible' : 'validationTextHidden' }>
            Director must be 1-40 characters*</p>
          <label><b>Rating</b></label>
          <input type="number"
            value={ this.state.rating }
            placeholder="0"
            step="0.1"
            onChange={ (e) => {
              this.setState({ errorStatus: null, rating: e.target.value });
            }}/>
            <p className={ (this.state.errorStatus === 400 && (this.state.rating < 0 || this.state.rating > 5)) ? 'validationTextVisible' : 'validationTextHidden' }>
              Rating must range from 0.0-5.0*</p>
          <label><b>Description</b></label>
          <textarea rows='6' value={ this.state.description } onChange={ (e) => {
            this.setState({ errorStatus: null, description: e.target.value });
          }}/>
          <p className={ (this.state.errorStatus === 400 && (this.state.description < 1 || this.state.description > 300)) ? 'validationTextVisible' : 'validationTextHidden' }>
            Description must be 1-300 characters*</p>
          <input className='submit-btn' type='submit' value='Submit'/>
        </form>
      </div>
    )
  }
}

export default Add;
