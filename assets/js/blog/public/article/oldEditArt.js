import React from "react";
import axios from "axios";

export default class AddOptions extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: ''
    }
};
  handleChange = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  handleSubmit = async  (event) => {
    event.preventDefault();

    const item = {
      name: this.state.name
    };
const axiosAwait = await
    axios
      .post(`https://127.0.0.1:8000/api/options`,  item )
      .then(res => console.log(res.data))
      .catch(res => {
        console.log(res)
        console.log(axiosAwait)
        console.log(item)
      })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Titre</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              placeholder="Entrer le titre de l'article"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
