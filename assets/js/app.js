import React from "react";
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://127.0.0.1:8000/api/articles")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result["hydra:member"]
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="row">
          {items.map(item => (
            <div className="col-3">
              <div className="card text-white bg-primary mb-3">
                <div className="cardheader">
                  {console.log(item.images[0])}
                  {item.images[0] ? (
                    <div>
                      {item.images.slice(0, 1).map(image => (
                        <img
                          src={"./images/articles/" + image.url}
                          className="img-fluid"
                        ></img>
                      ))}
                    </div>
                  ) : (
                    <div> <img src="https://via.placeholder.com/360x230" class="img-fluid"></img> </div>
                  )}
                </div>
                <div className="card-body">
                  Ville:
                  {item.options
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
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}


 ReactDOM.render(<App />, document.getElementById('root'));