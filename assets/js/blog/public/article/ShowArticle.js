import React from "react";
import axios from "axios";

export default class ShowArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false
    };
  }

  componentDidMount() {
    axios
      .get(`https://127.0.0.1:8000/api/articles/${this.props.match.params.id}`)
      .then(result => {
        this.setState({
          items: result.data,
          loading: true
        });
      });
  }

  render() {
    const { items, loading } = this.state;
    if (!loading) {
      return <div>Chargement...</div>;
    } else {
      return (
        <div className="row">
          {this.props.match.params.react}
          <div>
            {items.images.map(image => (
              <img
                src={__dirname + "images/articles/" + image.url}
                className="img-fluid"
              />
            ))}
          </div>
          <p>{items.content}</p>
          <p>{items.name}</p>
        </div>
      );
    }
  }
}