import React from "react";
import axios from "axios";
import Select from "react-select";
import { Formik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Error from "./../../Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      content: "",
      slug: "",
      options: [],
      items: [],
      loadign: false,
      issou: []
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleArray = options => {
    this.setState({ options }, () =>
      console.log(`Option selected:`, this.state.options.map(opt => opt.name))
    );
  };

  handleSubmit = async event => {
    event.preventDefault();

    const item = {
      name: this.state.name,
      content: this.state.content,
      slug: this.state.slug,
      options: this.state.options.map(opt => "/api/options/" + opt.id)
    };
    const axiosAwait = await axios
      .put(`https://127.0.0.1:8000/api/articles`, item)
      .then(res => console.log(res))
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
    axios.get(`https://127.0.0.1:8000/api/articles/27`).then(res => {
      this.setState({
        issou: res.data
      });
    });
  }

  render() {
    toast.configure();
    const validationSchema = Yup.object().shape({
      name: Yup.string()
        .min(2, "plus de 2..")
        .max(25, "moin voyont...")
        .required("Besoin d'étre rempli"),
      content: Yup.string()
        .min(10, "doit faire plus de 10 carractér")
        .required("Obligatoire"),
      slug: Yup.string()
        .trim("Doit-resembler-a-ceci")
        .required("Oblogatoire")
    });

    if (!this.state.loading) {
      return <p>Chargement..</p>;
    } else {
      return (
        <Formik
          initialValues={{
            name: "",
            content: "",
            slug: "",
            options: []
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);

            setTimeout(() => {
              const item = {
                name: values.name,
                content: values.content,
                slug: values.slug,
                options: this.state.options.map(opt => "/api/options/" + opt.id)
                //.map(opt => "/api/options/" + opt.id)
              };
              const axiosAwait = axios
                .get(`https://127.0.0.1:8000/api/articles/27`, item)
                .then(res => {
                  console.log(res.data)
                })
                .catch(res => {
                  console.log(res);
                  console.log(axiosAwait);
                  console.log(item);
                });
            }, 400);
            toast.success("Article Ajouter");
            window.location.replace("/react")
            resetForm();

            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Titre</label>
                <input
                  type="text"
                  className={
                    touched.name && errors.name
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="name"
                  id="name"
                  placeholder="Entrer le titre de l'article"
                  onChange={handleChange}
                  value={values.name, this.state.issou.name}
                  onBlur={handleBlur}
                />
                <Error touched={touched.name} message={errors.name} />
              </div>
              <div className="form-group">
                <label htmlFor="content">Contenue</label>
                <textarea
                  className={
                    touched.content && errors.content
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="content"
                  placeholder="Contenue de l'article"
                  onChange={handleChange}
                  name="content"
                  value={values.content, this.state.issou.content}
                  
                  onBlur={handleBlur}
                ></textarea>
                <Error touched={touched.content} message={errors.content} />
              </div>
              <div className="form-group">
                <label htmlFor="slug">Url de la page</label>
                <input
                  type="text"
                  className={
                    touched.slug && errors.slug
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="slug"
                  id="slug"
                  placeholder="le-slug-doit-etre-comme-cette-exemple"
                  onChange={handleChange}
                  value={values.slug, this.state.issou.slug}
                  onBlur={handleBlur}
                />
                <Error touched={touched.slug} message={errors.slug} />
              </div>
              <div className="from-control">
                <label htmlFor="options">Options : </label>
                <Select
                  value={this.state.options}
                  onChange={this.handleArray}
                  options={this.state.items}
                  isMulti
                  onBlur={handleBlur}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      );
    }
  }
}
