'use strict';
const fs = require('fs');
const path = require('path');

/* For regular JS files */
//const esprima = require('esprima');
//const escodegen = require('escodegen');

/* For files with JSX syntax */
const esprimaFb = require('esprima-fb');
const escodegenJsx = require('escodegen-wallaby');

const read = function(path) {
  const data = fs.readFileSync(path, 'utf8');
  const options = {
    sourceType: 'module',
    range: true,
    tokens: true,
    comment: true
  };

  return esprimaFb.parse(data, options);
};

const write = function(path, tree) {
  tree = escodegenJsx.attachComments(tree, tree.comments, tree.tokens);
  const options = { comment: true, format: { indent: { style: '  ' } } };
  const code = escodegenJsx.generate(tree, options) + '\n';
  fs.writeFileSync(path, code, 'utf8');
};

const getDestinationPath = function(name, type, suffix) {
  const prefix = path.join('src', type, name);
  const portablePrefix = path.sep === '/' ? prefix : prefix.split(path.sep).join('/');
  return [portablePrefix, suffix].join('.');
};

const getRelativePath = function(name, type, suffix) {
  const filePath = path.join('..', type, name);
  const portableFilePath = path.sep === '/' ? filePath : filePath.split(path.sep).join('/');
  return [portableFilePath, suffix].join('.');
};

const getBaseName = function(path) {
  const items = path.split('/');
  return items[items.length - 1];
};

const moveToAtomic = (component, type, generator, hasSuffix = true) => {
  let fs = generator.fs,
    [original, atomic, test, hypothesis, oldFashioned, modern] = [
      `src/components/${component}${hasSuffix ? 'Component' : ''}.js`,
      `src/components/${type}s/${component}.js`,
      `test/components/${component}${hasSuffix ? 'Component' : ''}Test.js`,
      `test/components/${type}s/${component}Test.js`,
      `src/styles/${component}.css`,
      `src/styles/${type}s/${component}.css`
    ].map(s => generator.destinationPath(s)),
    fixFile = path => replaceWithAtomic(fs, component, type, path)
  fs.move(original, atomic)
  fs.move(test, hypothesis)
  if (hasSuffix) {
    fs.move(oldFashioned, modern)
    fixFile(atomic)
    fixFile(hypothesis)
  }
}

const replaceWithAtomic = (fs, component, type, path) => {
  fs.write(path,
    fs.read(path)
      .replace(new RegExp(`${component}Component`, 'g'), component)
      .replace(new RegExp(`(components|styles)/+(?=${component})`, 'g'), `$1/${type}s/`))
}

module.exports = {
  read: read,
  write: write,
  getDestinationPath: getDestinationPath,
  getBaseName: getBaseName,
  getRelativePath: getRelativePath,
  moveToAtomic: moveToAtomic
}
