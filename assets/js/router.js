import React from "react";
import { Switch, Route } from "react-router-dom";
import ArticleAxios from "./blog/ArticleAxios";
import ShowArticle from "./blog/showArticle";

export default function ArticleRoute() {
  return (
    <Switch>
      <Route exact  path="/" component={ArticleAxios}/>
      <Route  path="/show/:id" component={ShowArticle} />
    </Switch>
  );
}
