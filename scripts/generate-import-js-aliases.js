const mappings = require('../mappings');

const aliases = {};

mappings.forEach(info => {
  const {
    module,
    export: exportedName,
    localName,
    replacement,
    deprecated,
  } = info;
  if (exportedName !== 'default' || !localName || deprecated) return;
  const resolvedModule =
    replacement && replacement.module ? replacement.module : module;
  aliases[localName] = resolvedModule;
});

Object.entries(aliases)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([name, module]) => console.log(`'${name}': '${module}',`));
