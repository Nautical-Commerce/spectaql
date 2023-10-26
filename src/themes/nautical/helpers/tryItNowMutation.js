var Handlebars = require('handlebars')


module.exports = function (mutation, variables, value) {
  
//  console.log("Debug: ", mutation, variables); // Debug line. Remove after testing.

  const serverUrl = 'https://api-showcase.nauticalcommerce.com/graphql/';
//  const variablesQuery = variables ? `&variables=${encodeURIComponent(variables)}` : ""

  var url = `${serverUrl}?query=${encodeURIComponent(mutation)}`;
  return new Handlebars.SafeString(`<a href="${url}" target="_blank">Try it now</a>\n`);
} 

//import Handlebars from 'handlebars';
//import generateQuery from '../../../spectaql/generate-graphql-example-data'
// import { introspectionArgsToVariables } from '../../../lib/common';

//module.exports = function () {
//    const { query, variables } = generateQuery  
//    const serverUrl = 'https://api-showcase.nauticalcommerce.com/graphql/';
//    if (!query) {
//      return '';
//    }
//    const variablesQuery = variables ? `&variables=${encodeURIComponent(variables)}` : "";
//    const url = `${serverUrl}?query=${encodeURIComponent(query)}${variablesQuery}`;
    
//    return new Handlebars.SafeString(`<a href="${url}" target="_blank">Try it now</a>\n`);
//  }