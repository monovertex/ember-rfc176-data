const mappings = require('../mappings');

const modulesReducer = (accumulator, { module, replacement, deprecated }) => {
  if (deprecated) return accumulator;
  const resolvedModule =
    replacement && replacement.module ? replacement.module : module;
  accumulator.add(resolvedModule);
  return accumulator;
};

const modules = mappings.reduce(modulesReducer, new Set());

[...modules]
  .sort((a, b) => a.localeCompare(b))
  .forEach(module => console.log(`'${module}',`));
