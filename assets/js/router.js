import React from "react";


import { Switch, Route } from "react-router-dom";
import IndexArticle from "./blog/public/article/IndexArticle";
import ShowArticle from "./blog/public/article/ShowArticle";
// import Admin from "./ArticleAdmin";
import AddOptions from "./blog/admin/options/AddOptions";
// import AddArticle from "./blog/admin/article/AddArticle";

export default function ArticleRoute() {
  return (
    <Switch>
      <Route exact  path="/" component={IndexArticle}/>
      <Route  path="/show/:id" component={ShowArticle} />
      <Route  path="/add" component={AddOptions} />
    </Switch>
  );
}
