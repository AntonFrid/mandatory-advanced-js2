import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadStatus: null,
      sendStatus: null,
      title: '',
      description: '',
      director: '',
      rating: 0,
     };
  }

  componentDidMount() {
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
        this.setState({ loadStatus: error.response.status });
      })
  }

  sendDataToServer(data) {
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
        this.setState({ sendStatus: error.response.status });
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
          <label><b>Title</b></label>
          <input type='text' value={ this.state.title } onChange={ (e) => {
            this.setState({ sendStatus: null, title: e.target.value });
          }}/>
          { this.state.loadStatus === 404 ? <p className='validationTextVisible'>
            Movie does not exist*</p> :
          <p className={ (this.state.sendStatus === 400 && (this.state.title.length < 1 || this.state.title.length > 40)) ? 'validationTextVisible' : 'validationTextHidden' }>
            Title must be 1-40 characters* </p> }
          <label><b>Director</b></label>
          <input type='text' value={ this.state.director } onChange={ (e) => {
            this.setState({ sendStatus: null, director: e.target.value });
          }}/>
          <p className={ (this.state.sendStatus === 400 && (this.state.director.length < 1 || this.state.director.length > 40)) ? 'validationTextVisible' : 'validationTextHidden' }>
            Director must be 1-40 characters*</p>
          <label><b>Rating</b></label>
          <input type="number"
            value={ this.state.rating }
            placeholder="0"
            step="0.1"
            onChange={ (e) => {
              this.setState({ sendStatus: null, rating: e.target.value });
            }}/>
          <p className={ (this.state.sendStatus === 400 && (this.state.rating < 0 || this.state.rating > 5)) ? 'validationTextVisible' : 'validationTextHidden' }>
            Rating must range from 0.0-5.0*</p>
          <label><b>Description</b></label>
          <textarea rows='6' value={ this.state.description } onChange={ (e) => {
            this.setState({ sendStatus: null, description: e.target.value });
          }}/>
          <p className={ (this.state.sendStatus === 400 && (this.state.description < 1 || this.state.description > 300)) ? 'validationTextVisible' : 'validationTextHidden' }>
            Description must be 1-300 characters*</p>
          <input className='submit-btn' type='submit' value='Submit'/>
        </form>
      </div>
    )
  }
}

export default Edit;
