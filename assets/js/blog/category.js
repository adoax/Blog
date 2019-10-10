import React from "react";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://127.0.0.1:8000/api/categories")
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
                <p>{item.name} </p>

                </div>
              </div>
          ))}
        </div>
      );
    }
  }
}


export default Category;