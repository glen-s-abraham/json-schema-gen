import { useState } from "react";
import ajvSchemaMeta from "./ajv-meta-data/ajv-schema-meta";
import SchemaPropertiesForm from "./components/SchemaPropertiesForm";

function App(){
   const [ajvSchemas,setAjvSchemas]=useState([]);
   const buildSchema = (schemaName,properties)=>{
    const ajvSchema = {name:schemaName,schema:{...ajvSchemaMeta,properties}};
    setAjvSchemas([...ajvSchemas,ajvSchema]);
   } 
   return(<div>
       <textarea value={JSON.stringify(ajvSchemas)}></textarea>
       <SchemaPropertiesForm buildSchema={buildSchema}/>
   </div>) 
}   

export default App;