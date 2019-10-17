import React from "react";
import {
  HydraAdmin,
  ResourceGuesser,
  ListGuesser,
  FieldGuesser,
  ShowGuesser,
  EditGuesser,
  InputGuesser
} from "@api-platform/admin";
import {
  Datagrid,
  TextField,
  ChipField,
  SingleFieldList,
  ReferenceArrayField,
  ReferenceArrayInput,
  SelectArrayInput
} from "react-admin";

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

    <ReferenceArrayField
      reference="options"
      source="options"
      label="Les options"
    >
      <SingleFieldList>
        <ChipField source="name" />
      </SingleFieldList>
    </ReferenceArrayField>
  </ListGuesser>
);
const ArticleShow = props => (
  <ShowGuesser {...props}>
    <FieldGuesser source="name" addLabel={true} />
    <FieldGuesser source="slug" addLabel={true} />
    <FieldGuesser source="content" addLabel={true} />
    <FieldGuesser source="num" addLabel={true} />
    <ReferenceArrayField
      reference="options"
      source="options"
      label="Les options"
    >
      <SingleFieldList>
        <ChipField source="name" />
      </SingleFieldList>
    </ReferenceArrayField>

    <ReferenceArrayField reference="images" source="images" label="Les images">
      <Datagrid>
        <TextField source="url" />
        <TextField source="caption" />
      </Datagrid>
    </ReferenceArrayField>
  </ShowGuesser>
);

const ArticleEdit = props => (
  <EditGuesser {...props}>
    <InputGuesser source="name" />
    <InputGuesser source="slug" />
    <InputGuesser source="content" />

    <ReferenceArrayInput source="options" reference="options" label="Option">
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>
    <div>
      <p>Modifier/Ajouter un article avec une/des image(s)</p>
      <a href={"/admin/article/" + props.id.match(/(\d+)/)[0] + "/edit"}>Cliquer ici</a>
      {console.log(props.id.match(/(\d+)/)[0])}
    </div>
  </EditGuesser>
);

export default () => (
  <HydraAdmin entrypoint={process.env.API_URL}>
    <ResourceGuesser
      name="articles"
      list={ArticleList}
      show={ArticleShow}
      edit={ArticleEdit}
    />
    <ResourceGuesser name="options" />
    <ResourceGuesser name="images" />
  </HydraAdmin>
);
