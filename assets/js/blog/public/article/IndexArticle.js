import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

export default class IndexArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false
    };
  }

  componentDidMount() {
    axios
      .get(`https://127.0.0.1:8000/api/articles`)
      .then(res => {
        this.setState({
          items: res.data["hydra:member"],
          loading: true
        });
      });
  }

  render() {
    const { items, loading } = this.state;
    if (!loading) {
      return <p>Chargement des articles ..</p>;
    } else {
      return (
        <div className="row">
          <Link to="/article/add" className="btn btn-danger col-6">Add Artilce</Link>
          <Link to="/option/add" className="btn btn-danger col-6">Add Option</Link>
          <Link to="/article/edit/27" className="btn btn-danger col-6">Add Option</Link>
          {items.map(item => (
            <div className="col-3">
              <div className="card text-white bg-primary mb-3">
                <div className="cardheader">
                  {item.imageArticle[0] ? (
                    <div>
                      {item.imageArticle.slice(0, 1).map(image => (
                        <img
                          src={
                            "./media/cache/thumbs/images/articles/" + image.url
                          }
                          className="img-fluid"
                          ></img>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <img
                        src="https://via.placeholder.com/360x230"
                        className="img-fluid"
                      ></img>{" "}
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <p className="font-weight-bold">{item.name}</p >
                  Ville:
                  {item.nameOption
                    .map(option => <span> {option.name}</span>)
                    .reduce(
                      (acc, x) =>
                      acc === null ? (
                          x
                          ) : (
                          <>
                            {acc}, {x}
                          </>
                        ),
                        null
                        )}
                  <p className="card-text">{item.extraitContent}</p>
                   <Link to={"/show/" + item.id} className="btn btn-block btn-success">Voir plus </Link> 
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}
