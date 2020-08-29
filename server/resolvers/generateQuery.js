const generateUpdateText = (table, args) => {
  // let finalText = ``;
  const text = `UPDATE ${table} SET `;
  const arrayOfArgs = Object.keys(args);
  let i = 0;
  for (i; i < arrayOfArgs.length - 1; i++) {
    /* If the user wanted to update a field, add to text string. If they did not
          want to update a certain field we recieve an empty string, so we remove this 
          argument from our list of args, decrementing i to account for the missing arg. */
    if (args[arrayOfArgs[i]] !== '') {
      text += `${arrayOfArgs[i]}=$${i + 1}`;
      text += `, `;
    } else arrayOfArgs.splice(i--, 1);
  }
  // account for extra comma at end of argument list
  const finalText =
    text[text.length - 2] === ',' ? text.slice(0, text.length - 2) : text;
  finalText += ` WHERE _id=$${i + 1} RETURNING *`;

  return finalText;
};

module.exports = { generateUpdateText };
