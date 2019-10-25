import React from "react";
import {
  dataProvider as baseDataProvider,
  HydraAdmin,
  ResourceGuesser
} from "@api-platform/admin";
import addUploadFeature from "./addUploadFeature";
import {
  ArticleCreacte,
  ArticleEdit,
  ArticleList,
  ArticleShow
} from "./AdminArticle";

const dataProvider = baseDataProvider(process.env.API_URL);
const uploadCapableDataProvider = addUploadFeature(dataProvider);

export default () => (
  <HydraAdmin
    entrypoint={process.env.API_URL}
    dataProvider={uploadCapableDataProvider}
  >
    <ResourceGuesser
      name="articles"
      list={ArticleList}
      show={ArticleShow}
      edit={ArticleEdit}
      create={ArticleCreacte}
    />
    <ResourceGuesser name="options" />
    <ResourceGuesser name="categories" />
    <ResourceGuesser name="images"/>
  </HydraAdmin>
);
