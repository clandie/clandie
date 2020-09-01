const generateUpdateText = (table, args) => {
  const text = `UPDATE ${table} SET `;
  const arrayOfArgs = Object.keys(args);
  let i = 0;
  // last arg is id, iterate through second to last element
  for (i; i < arrayOfArgs.length - 1; i++) {
    text += `${arrayOfArgs[i]}=$${i + 1}`;
    text += i !== arrayOfArgs.length - 2 ? `, ` : ' ';
  }
  text += `WHERE _id=$${i + 1} RETURNING *`;

  return text;
};

// const generateUpdateParams = (paramsUnfiltered) => {
//   const params = [];
//   for (let i = 0; i < paramsUnfiltered.length; i++) {
//     params.push(paramsUnfiltered[i]);
//   }
//   return params;
// };

module.exports = { generateUpdateText };
