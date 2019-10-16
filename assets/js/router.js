import React from "react";
// import { Switch, Route } from "react-router-dom";
// import IndexArticle from "./blog/public/article/IndexArticle";
// import ShowArticle from "./blog/public/article/ShowArticle";


// export default function ArticleRoute() {
//   return (
//     <Switch>
//       <Route exact  path="/" component={IndexArticle}/>
//       <Route  path="/show/:id" component={ShowArticle} />
//     </Switch>
//   );
// }

import { HydraAdmin } from "@api-platform/admin";
console.log(process.env.API_URL)
export default () => (
  <HydraAdmin entrypoint={process.env.API_URL}></HydraAdmin>
);
