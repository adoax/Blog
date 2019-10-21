import React from "react";
import axios from "axios";

export default class AddArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      content: "",
      slug: "",
      options: [],
      items: [],
      loadign: false
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const item = {
      name: this.state.name,
      content: this.state.content,
      slug: this.state.slug,
      options: this.state.options
    };
    const axiosAwait = await axios
      .post(`https://127.0.0.1:8000/api/articles`, item)
      .then(res => console.log(res.data))
      .catch(res => {
        console.log(res);
        console.log(axiosAwait);
        console.log(item);
      });
  };

  componentDidMount() {
    axios.get(`https://127.0.0.1:8000/api/options`).then(res => {
      this.setState({
        items: res.data["hydra:member"],
        loading: true
      });
    });
  }

  render() {
    if (!this.state.loading) {
    return (
        <p>Chargement..</p>
    )} else {
      return (        
      <div>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Titre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            placeholder="Entrer le titre de l'article"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenue</label>
          <textarea
            className="form-control"
            id="content"
            placeholder="Contenue de l'article"
            onChange={this.handleChange}
            name="content"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="slug">Url de la page</label>
          <input
            type="text"
            className="form-control"
            name="slug"
            id="slug"
            placeholder="le-slug-doit-etre-comme-cette-exemple"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="options">Options : </label>
          <select name="options">
            {this.state.items.map(item => (
              <option value={[item.id]}> {[item.name]} </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
      
    )};
  }
}
