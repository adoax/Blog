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
  ImageInput,
  ImageField,
  ArrayInput,
  SimpleFormIterator,
  TextInput,
  SimpleForm
} from "react-admin";

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

    <ReferenceInput source="category" reference="categories">
      <SelectInput optionText="name" />
    </ReferenceInput>

    <ReferenceArrayInput source="options" reference="options" label="Option">
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>

    <div>
      <p>Modifier/Ajouter un article avec une/des image(s)</p>
      <a href={"/admin/article/" + props.id.match(/(\d+)/)[0] + "/edit"}>
        Cliquer ici
      </a>
    </div>
  </EditGuesser>
);

const ArticleCreacte = props => (
  <CreateGuesser {...props}>
    <InputGuesser source="name" />
    <InputGuesser source="slug" />
    <InputGuesser source="content" />

    <ReferenceInput source="category" reference="categories">
      <SelectInput optionText="name" />
    </ReferenceInput>

    <ReferenceArrayInput source="options" reference="options" label="Option">
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>

    <ArrayInput source="images">
      <SimpleFormIterator>
        <ReferenceInput label="image" source="image" reference="images">
          
        </ReferenceInput>
      </SimpleFormIterator>
    </ArrayInput>
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
    <ResourceGuesser name="images" 
    create={ImageCreate}/>
  </HydraAdmin>
);
