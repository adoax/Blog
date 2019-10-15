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

// import { HydraAdmin, ResourceGuesser } from "@api-platform/admin";

// export default () => (
//     <HydraAdmin entrypoint="https://127.0.0.1:8000/api">
//       <ResourceGuesser name="articles"/>
//       <ResourceGuesser name="categories"/>
//       <ResourceGuesser name="options"/>
//     </HydraAdmin>
//   );