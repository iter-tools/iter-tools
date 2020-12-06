module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'Require iterator step objects to be { value, done } for speed',
    },
    fixable: 'code',
    schema: [], // no options
  },
  create: function (context) {
    return {
      ObjectExpression(node) {
        const { properties } = node;
        if (properties.length >= 2) {
          let foundDone = false;
          let foundValue = false;
          let i = 0;
          let valid = true;
          for (const prop of properties) {
            if (prop.key) {
              if (prop.key.name === 'value') {
                foundValue = true;
                valid = i === 0;
              }
              if (prop.key.name === 'done') {
                foundDone = true;
                valid = i === 1;
              }
            }
            i++;
          }

          if (foundDone && foundValue && !valid) {
            context.report(
              node,
              '{ value, done } must be the first keys in an iterator step object (in that order).',
            );
          }
        }
      },
    };
  },
};
