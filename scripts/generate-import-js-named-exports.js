const mappings = require('../mappings');

const modules = {};

mappings.forEach(info => {
  const {
    deprecated,
    module,
    export: exportedName,
    replacement: {
      module: replacementModule,
      export: replacementExportedName,
    } = {},
  } = info;
  if (deprecated) return;

  const resolvedModule = replacementModule || module;
  const resolvedExportedName = replacementExportedName || exportedName;
  if (resolvedExportedName === 'default') return;

  modules[resolvedModule] = modules[resolvedModule] || new Set();
  modules[resolvedModule].add(resolvedExportedName);
});

Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([module, namedExports]) => {
    console.log(`'${module}': [`);
    [...namedExports]
      .sort((a, b) => a.localeCompare(b))
      .forEach(module => console.log(`    '${module}',`));
    console.log('],');
  });
