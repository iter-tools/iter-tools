const upper = /[A-Z]/;

module.exports = function rename(name, ASYNC) {
  const a = upper.test(name[0]) ? 'A' : 'a';
  return (
    ASYNC
      ? `${a}sync${name[0].toUpperCase()}${name.slice(1)}`
      : name
  );
};
