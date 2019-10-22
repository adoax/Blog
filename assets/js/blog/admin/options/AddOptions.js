import React from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from 'yup';
import Error from './../../Error'

export default class AddOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  handleChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const item = {
      name: this.state.name
    };
    const axiosAwait = await axios
      .post(`https://127.0.0.1:8000/api/options`, item)
      .then(res => console.log(res.data))
      .catch(res => {
        console.log(res);
        console.log(axiosAwait);
        console.log(item);
      });
  };

  render() {
    const validationSchema = Yup.object().shape({
      name: Yup.string().min(2, 'plus de 2..').max(25, 'moin voyont...').required("Besoin d'étre rempli")
    })

    return (
      <Formik initialValues={(name = "")} validationSchema={validationSchema}>
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Titre</label>
              <input
                type="text"
                className={touched.name && errors.name ? 'form-control is-invalid' : 'form-control'}
                name="name"
                id="name"
                placeholder="Entrer le titre de l'article"
                onChange={handleChange}
                value={values.name}
                onBlur={handleBlur}
              />
              <Error touched={touched.name} message={errors.name}/>
            </div>

            <div className="btn btn-success" type="submit">
              envoyer
            </div>
          </form>
        )}
      </Formik>
    );
  }
}
