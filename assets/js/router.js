import React from "react";
import {
  HydraAdmin,
  ResourceGuesser,
  ListGuesser,
  FieldGuesser,
  ShowGuesser
} from "@api-platform/admin";
import { ArrayField, Datagrid, ImageField, TextField } from "react-admin";

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

//Permet de recuperer uniquement c'est vue, pour l'affichage de la liste
const ArticleList = props => (
  <ListGuesser {...props}>
    <FieldGuesser source="name" />
    <FieldGuesser source="slug" />
    <FieldGuesser source="extraitContent" />
    <FieldGuesser source="images" />
    <FieldGuesser source="options" />
  </ListGuesser>
);

const ArticleShow = props => (
  <ShowGuesser {...props}>
    <FieldGuesser source="name" addLabel={true} />
    <FieldGuesser source="slug" addLabel={true} />
    <FieldGuesser source="content" addLabel={true} />
    <FieldGuesser source="options" addLabel={true} />
    <ArrayField source="images">
      <Datagrid>
        <TextField source="url" />
        <TextField source="caption" />
      </Datagrid>
    </ArrayField>
  </ShowGuesser>
);

export default () => (
  <HydraAdmin entrypoint={process.env.API_URL}>
    <ResourceGuesser name="articles" list={ArticleList} show={ArticleShow} />
    <ResourceGuesser name="options" />
  </HydraAdmin>
);
