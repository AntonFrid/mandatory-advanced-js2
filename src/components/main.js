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
      })
      .catch((error) => {
        console.log(error);
      })
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
          .catch((error) => {
            console.log(error.response.status);
          })
      })
      .catch((error) => {
        console.log(error.response.status);
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
               <td className='button-td'>
                <Link to={ '/details/' + id }><button>Details</button></Link>
                <Link to={ '/edit/' + id }><button>Edit</button></Link>
                <button onClick={ () => { this.removeMovie(id) } }>Remove</button>
               </td>
            </tr>
         )
      })
   }

  render() {
    return (
      <div id='main-box'>
        <Helmet>
          <title>Main</title>
        </Helmet>
        <div id="input-main-box">
          <label>Search by title: </label>
          <input type="text" onChange={ (e) => {
            this.setState({ titleInput: e.target.value })
          } }/>
          <label>Search by director:</label>
          <input type="text" onChange={ (e) => {
            this.setState({ directorInput: e.target.value })
          } }/>
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Director</th>
              <th>Rating</th>
              <th>Buttons</th>
            </tr>
          </thead>
          <tbody>
            { this.renderTableData() }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Main;
