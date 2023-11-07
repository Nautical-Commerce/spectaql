const Handlebars = require('handlebars');

// Helper to log the structure of an argument and its type
Handlebars.registerHelper('logStructure', function (context) {
  // Log the entire context object
  console.log('Context:', context);
  
  // Log specific parts of the context object
  if (context.name) {
    console.log('Name:', context.name);
  }
  
  if (context.type) {
    console.log('Type:', context.type);
    
    // Log properties of the type if it is an object with fields
    if (context.type.fields) {
      console.log('Type Fields:', context.type.fields);
    }
    
    // Or log properties if it's an object with input fields
    if (context.type.inputFields) {
      console.log('Input Fields:', context.type.inputFields);
    }
  }
  
  // This helper doesn't alter the output, it's purely for logging
  return '';
});
