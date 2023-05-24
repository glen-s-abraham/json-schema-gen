import { useState } from "react";
import ajvDataTypes from "../ajv-meta-data/ajv-data-types";

function SchemaPropertiesForm({ buildSchema, savedSchemas }) {
  const [properties, setProperties] = useState([]);
  const [propertyField, setPropertyField] = useState();
  const [schemaName, setSchemaName] = useState();
  const [propertyType, setPropertyType] = useState(ajvDataTypes[0]);
  const [nestedSchema, setNestedSchema] = useState(
    savedSchemas.length > 0 ? savedSchemas[0].schema : {}
  );

  const handlePropertyAddition = (evt) => {
    evt.preventDefault();
    const propertySet = {};
    if (propertyType === "nestedSchema") {
        propertySet[propertyField] = nestedSchema; 
    } else {
      propertySet[propertyField] = { type: propertyType };
    }
    setProperties([...properties, propertySet]);
    setPropertyField("");
    setPropertyType(ajvDataTypes[0]);
  };
  const handlePropertyFieldChange = (evt) => {
    setPropertyField(evt.target.value);
  };
  const handlePropertyTypeChange = (evt) => {
    setPropertyType(evt.target.value);
  };
  const handlePropertyDelete = (index) => {
    const updatedProperties = [
      ...properties.splice(0, index),
      ...properties.splice(index, properties.length - 1),
    ];
    setProperties(updatedProperties);
  };
  const handleSchemaNameChange = (evt) => {
    setSchemaName(evt.target.value);
  };
  const handleSaveProperties = () => {
    setProperties([]);
    setSchemaName("");
    buildSchema(schemaName, properties);
  };
  const handleSavedSchemaSelect = (evt) => {
    const { schema } = savedSchemas.find(
      ({ name }) => name === evt.target.value
    );
    console.log(schema);
    setNestedSchema(schema);
  };

  const renderedOptions = [...ajvDataTypes, "nestedSchema"].map((type) => (
    <option key={type}>{type}</option>
  ));

  const renderedSavedSchema = savedSchemas.map(({ name }) => (
    <option key={name}>{name}</option>
  ));
  const renderedProperties = properties.map((p, i) => {
    const property = Object.keys(p)[0];
    return (
      <li key={i}>
        {property}:
        {typeof p[property].type === "string"
          ? p[property].type
          : JSON.stringify(p[property].type)}{" "}
        <button onClick={() => handlePropertyDelete(i)}>X</button>
      </li>
    );
  });
  return (
    <div>
      <form onSubmit={handlePropertyAddition}>
        SchemaName:{" "}
        <input
          type="text"
          id="schemaName"
          value={schemaName}
          onChange={handleSchemaNameChange}
        />
        Property:{" "}
        <input
          type="text"
          id="propertyField"
          value={propertyField}
          onChange={handlePropertyFieldChange}
        />
        Type:{" "}
        <select onChange={handlePropertyTypeChange}>{renderedOptions}</select>
        SavedSchema:{" "}
        <select onChange={handleSavedSchemaSelect}>
          {renderedSavedSchema}
        </select>
        <button type="submit">Add Property</button>
      </form>
      <ul>{renderedProperties}</ul>
      <button type="submit" onClick={handleSaveProperties}>
        Save schema
      </button>
    </div>
  );
}

export default SchemaPropertiesForm;
