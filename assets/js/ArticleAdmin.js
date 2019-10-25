import React from "react";
import {
  HydraAdmin,
  ResourceGuesser,
  ListGuesser,
  FieldGuesser,
  ShowGuesser,
  EditGuesser,
  CreateGuesser,
  InputGuesser
} from "@api-platform/admin";
import {
  Datagrid,
  TextField,
  ChipField,
  SingleFieldList,
  ReferenceArrayField,
  ReferenceArrayInput,
  SelectArrayInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  LongTextInput,
  ImageInput,
  ImageField,
  ArrayInput,
  SimpleFormIterator,
  TextInput,
  SimpleForm,
  edit
} from "react-admin";
import addUploadFeature from "./addUploadFeature";

//Permet de recuperer uniquement c'est vue, pour l'affichage de la liste
const ArticleList = props => (
  <ListGuesser {...props}>
    <FieldGuesser source="name" />
    <FieldGuesser source="slug" />
    <FieldGuesser source="extraitContent" />

    <ReferenceField reference="categories" source="category" linkType={false}>
      <ChipField source="name" />
    </ReferenceField>

    <ReferenceArrayField reference="options" source="options">
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

    <ReferenceField reference="categories" source="category" linkType={false}>
      <ChipField source="name" />
    </ReferenceField>

    <ReferenceArrayField
      reference="options"
      source="options"
      label="Les options"
    >
      <SingleFieldList>
        <ChipField source="name" />
      </SingleFieldList>
    </ReferenceArrayField>

    <FieldGuesser source="img" addLabel={true} />
    <ImageField source="img" src="src" addLabel={true} />
  </ShowGuesser>
);

const ArticleEdit = props => (
  <EditGuesser {...props}>
    <InputGuesser source="name" />
    <InputGuesser source="slug" />
    <InputGuesser source="content" />

    <ReferenceInput source="category" reference="categories">
      <SelectInput optionText="name" />
    </ReferenceInput>

    <ReferenceArrayInput source="options" reference="options" label="Option">
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>

    <ImageInput source="img" label="Related pictures" accept="image/*" multiple>
      <ImageField source="src" title="title" />
    </ImageInput>
  </EditGuesser>
);

const ArticleCreacte = props => (
  <CreateGuesser {...props}>
    <TextInput source="name" />
    <TextInput source="slug" />
    <LongTextInput source="content" />

    <ReferenceInput source="category" reference="categories">
      <SelectInput optionText="name" />
    </ReferenceInput>

    <ReferenceArrayInput source="options" reference="options" label="Option">
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>

    <ImageInput source="img" label="Related pictures" accept="image/*" multiple>
      <ImageField source="src" title="title" />
    </ImageInput>
  </CreateGuesser>
);

const ImageCreate = props => (
  <CreateGuesser {...props}>
    <InputGuesser source="url" />
    <InputGuesser source="caption" />

    <ReferenceInput source="article" reference="articles">
      <SelectInput optionText="id" />
    </ReferenceInput>
  </CreateGuesser>
);

const uploadCapableDataProvider = addUploadFeature(process.env.API_URL)

export default () => (
  <HydraAdmin entrypoint={process.env.API_URL}>
    <ResourceGuesser
      name="articles"
      list={ArticleList}
      show={ArticleShow}
      edit={ArticleEdit}
      create={ArticleCreacte}
    />
    <ResourceGuesser name="options" />
    <ResourceGuesser name="categories" />
    <ResourceGuesser name="images" create={ImageCreate} />
  </HydraAdmin>
);
