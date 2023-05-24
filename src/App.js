import { useState } from "react";
import ajvSchemaMeta from "./ajv-meta-data/ajv-schema-meta";
import SchemaPropertiesForm from "./components/SchemaPropertiesForm";

function App() {
  const [ajvSchemas, setAjvSchemas] = useState([]);
  const buildSchema = (schemaName, properties) => {
    const schemaIdx = ajvSchemas.findIndex(({ name }) => name === schemaName);
    let schemasArr = [...ajvSchemas];
    if (schemaIdx >= 0) {
      schemasArr = [
        ...schemasArr.splice(0, schemaIdx),
        ...schemasArr.splice(schemaIdx, schemasArr.length),
      ];
    }
    const ajvSchema = {
      name: schemaName,
      schema: { ...ajvSchemaMeta, properties },
    };
    setAjvSchemas([...schemasArr, ajvSchema]);
  };
  return (
    <div>
      <SchemaPropertiesForm buildSchema={buildSchema} />
      <textarea
        rows={45}
        cols={100}
        value={JSON.stringify(ajvSchemas, null, "\t")}
      ></textarea>
    </div>
  );
}

export default App;
