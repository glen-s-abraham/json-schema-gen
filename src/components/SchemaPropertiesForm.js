import { useState } from "react";
import ajvDataTypes from "../ajv-meta-data/ajv-data-types";

function SchemaPropertiesForm({buildSchema}) {
  const [properties, setProperties] = useState([]);
  const [propertyField, setPropertyField] = useState();
  const [schemaName, setSchemaName] = useState();
  const [propertyType, setPropertyType] = useState(ajvDataTypes[0]);

  const handlePropertyAddition = (evt) => {
    evt.preventDefault();
    const propertySet = {};
    propertySet[propertyField] = { type: propertyType };
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
  const handlePropertyDelete=(index)=>{
    const updatedProperties = [...properties.splice(0,index),...properties.splice(index,properties.length-1)]
    setProperties(updatedProperties);
  }
  const handleSchemaNameChange=(evt)=>{
      setSchemaName(evt.target.value);
  }
  const handleSaveProperties=()=>{
      setProperties([]);
      setSchemaName('')
      buildSchema(schemaName,properties)
  }

  const renderedOptions = ajvDataTypes.map((type) => <option key={type}>{type}</option>);
  const renderedProperties = properties.map((p, i) => {
    const property = Object.keys(p)[0];
    return <li key={i}>{property}:{p[property].type} <button onClick={()=>handlePropertyDelete(i)}>X</button></li>;
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
        <button type="submit">Add Property</button>
      </form>
      <ul>
          {renderedProperties}
      </ul>
      <button type="submit" onClick={handleSaveProperties}>Save schema</button>
    </div>
  );
}

export default SchemaPropertiesForm;
