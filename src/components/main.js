import React from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [], titleInput: '', directorInput: '' } ;

    this.renderTableData = this.renderTableData.bind(this);
  }

  componentDidMount() {
    axios.get('http://3.120.96.16:3001/movies')
      .then((response) => {
        this.setState({ data: response.data });
      });
  }

  componentWillUnmount() {
  }

  removeMovie(id) {
    axios.delete('http://3.120.96.16:3001/movies/' + id)
      .then(() => {
        axios.get('http://3.120.96.16:3001/movies')
          .then((response) => {
            this.setState({ data: response.data });
          })
      })
  }

  renderTableData() {
      return this.state.data.filter(data => {
        let titleFiltered = data.title.toLowerCase().includes(this.state.titleInput.toLowerCase());
        let directorFiltered = data.director.toLowerCase().includes(this.state.directorInput.toLowerCase());

        if(directorFiltered && titleFiltered){
          return true;
        }
      })
        .map((movies, index) => {
         const { id, title, director, rating } = movies;
         return (
            <tr key={ id }>
               <td>{ title }</td>
               <td>{ director }</td>
               <td>{ rating }</td>
               <td><Link to={ '/details/' + id }><button>Details</button></Link></td>
               <td><Link to={ '/edit/' + id }><button>Edit</button></Link></td>
               <td><button onClick={ () => { this.removeMovie(id) } }>Remove</button></td>
            </tr>
         )
      })
   }

  render() {
    return (
      <>
      <Helmet>
        <title>Main</title>
      </Helmet>
        <input type="text" onChange={ (e) => {
          this.setState({ titleInput: e.target.value })
        } }/>
        <input type="text" onChange={ (e) => {
          this.setState({ directorInput: e.target.value })
        } }/>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Director</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            { this.renderTableData() }
          </tbody>
        </table>
      </>
    )
  }
}

export default Main;
