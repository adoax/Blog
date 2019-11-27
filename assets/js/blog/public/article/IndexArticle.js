import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class IndexArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false
    };
  }

  componentDidMount() {
    axios.get(`/api/articles`).then(res => {
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
        <div className="container">
            <a href="/admin/article/new" className="btn btn-primary col-6">Ajouter </a>
          <div className="row">
            {items.map(item => (
              <div className="col-3">
                <div className="card text-white bg-primary mb-3">
                  <div className="cardheader">
                    {item.imageArticle[0] ? (
                      <div>
                        {item.imageArticle.slice(0, 1).map(image => (
                          <img
                            src={
                              "./media/cache/thumbs/images/articles/" +
                              image.url
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
                    <p className="font-weight-bold">{item.name}</p>
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
                    <Link
                      to={"/" + item.id}
                      className="btn btn-block btn-success"
                    >
                      Voir plus{" "}
                    </Link>
                    <a href={"/admin/article/" + item.id + "/edit"} className="btn btn-danger">Editer</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}
