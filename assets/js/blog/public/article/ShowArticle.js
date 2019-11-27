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
      .get(`http://127.0.0.1:8000/api/articles/${this.props.match.params.id}`)
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
      return <div className="container">Chargement de l'artilce...</div>;
    } else {
      return (
        <div className="container">
          <h1 className="mx-auto my-5">{items.name}</h1>
          <div className="row ">
            {this.props.match.params.react}
            <div className="col-12">
              {items.nameOption.map(option => (
                <span className="badge badge-primary m-1"> {option.name} </span>
              ))}
            </div>

            {items.imageArticle.map(image => (
              <div className="col-6">
                <img
                  src={__dirname + "images/articles/" + image.url}
                  className="img-fluid"
                />
              </div>
            ))}
            <div className="col-12">
              <p>{items.content}</p>
            </div>
              <hr/>
              <div className="col">
                {items.commentText.map(comment => (
                  <p>{comment.content}</p>
                ))}
              </div>
          </div>
        </div>
      );
    }
  }
}
