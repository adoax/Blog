import React from "react";
import axios from "axios";

export default class CreateArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: "",
      content: "",
      slug: "",
      options: []
    };
  }

  handleSubmit (e) {
    e.preventDefault();
    const article = {
        name: this.props.name,
        content: this.props.content,
        slug: 'je-suis-un-slug',
        option: this.state.options
    }
    axios.post('https://127.0.0.1:8000/api/articles', article)
    .then(res => console.log(res.data))
    .catch(err => { console.log(err)})
}

  render() {
         return (
         <div>
           <form>
            <div className="form-group">
              <label for="exampleInputEmail1">Titre</label>
              <input type="name" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Entrer le titre de l'article" value={this.name}/>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
    </form>
  </div>
    ) };
  }

