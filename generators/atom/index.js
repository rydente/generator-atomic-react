'use strict';
let generator = require('yeoman-generator');
let { moveToAtomic } = require('../app/utils')

module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },

  writing: function() {

    // Build options
    let opts = {},
      generator = this

    if(this.options.stateless === true) {
      opts.stateless = true;
    }

    this.composeWith('react-webpack', {
      options: opts,
      args: [ this.name ]
    }, {
      local: require.resolve('generator-react-webpack/generators/component')
    })
    this.fs.commit([], () => {
      let cap = generator.name.charAt(0).toUpperCase() + generator.name.slice(1)
      moveToAtomic(cap, 'atom', generator)
    })
  }
});
