import React from "react";
import {
  ListGuesser,
  FieldGuesser,
  ShowGuesser,
  EditGuesser,
  CreateGuesser
} from "@api-platform/admin";
import {
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
  TextInput
} from "react-admin";
import { minLength, required,regex } from "react-admin";

const validateRequired = [required('Champ obligatoire'), minLength(2, 'doit avoir un minimun de 2 caractéres')]
const validateContent = [required('Champ obligatoire'), minLength(5, 'doit avoir un minimun de 5 caractéres')]
const ValidateSlug = [required('Champ obligatoire'), regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'le-slug-doit-etre-representer-comme-ceci')]

export const ArticleList = props => (
  <ListGuesser {...props}>
    <FieldGuesser source="name"/>
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

export const ArticleShow = props => (
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

    <ImageField source="img" src="src" addLabel={true} />
  </ShowGuesser>
);

export const ArticleEdit = props => (
  <EditGuesser {...props}>
    <TextInput source="name"  />
    <TextInput source="slug" />
    <LongTextInput source="content" />

    <ReferenceInput source="category" reference="categories">
      <SelectInput optionText="name" />
    </ReferenceInput>

    <ReferenceArrayInput source="options" reference="options" label="Option">
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>

    <ImageInput
      source="img"
      label="Related pictures"
      accept="image/*"
      multiple={true}
    >
      <ImageField source="src" title="title" />
    </ImageInput>
  </EditGuesser>
);

export const ArticleCreacte = props => (
  <CreateGuesser {...props}>
    <TextInput source="name" validate={validateRequired}/>
    <TextInput source="slug"  validate={ValidateSlug} />
    <LongTextInput source="content" validate={validateContent} />

    <ReferenceInput source="category" reference="categories">
      <SelectInput optionText="name" />
    </ReferenceInput>

    <ReferenceArrayInput source="options" reference="options" label="Option">
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>

    <ImageInput
      source="img"
      label="Related pictures"
      accept="image/*"
      multiple={true}
    >
      <ImageField source="src" title="title" />
    </ImageInput>
  </CreateGuesser>
);
