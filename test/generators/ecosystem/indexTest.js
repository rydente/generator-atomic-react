'use strict';
let path = require('path');
let assert = require('yeoman-assert');
let helpers = require('yeoman-test');

describe('atomic-react:ecosystem', () => {
  const generatorEcosystem = path.join(__dirname, '../../../generators/ecosystem');

  /**
   * Return a newly generated action with given name
   * @param {String} name
   * @param {Function} callback
   */
  function createGeneratedEcosystem(name, callback) {

    helpers.run(generatorEcosystem)
      .withArguments([name])
      .on('end', callback);
  }

  describe('When creating a new action', () => {

    it('should create the ecosystem file', (done) => {
      createGeneratedEcosystem('TestEcosystem', () => {
        assert.file(['src/components/ecosystems/TestEcosystem.js']);
        done();
      });
    });

    it('should have the proper class Name', (done) => {
      createGeneratedEcosystem('TestEcosystem', () => {
        assert.fileContent('src/components/ecosystems/TestEcosystem.js', 'class TestEcosystem');
        done();
      });
    });

    it('should have the proper prefix', (done) => {
      createGeneratedEcosystem('TestEcosystem', () => {
        assert.fileContent('src/components/ecosystems/TestEcosystem.js', '../components/ecosystems/Main');
        done();
      });
    });

    it('should have prop types attached', (done) => {
      createGeneratedEcosystem('TestEcosystem', () => {
        assert.fileContent('src/components/ecosystems/TestEcosystem.js', 'TestEcosystem.propTypes');
        done();
      });
    });

    it('should export itself', (done) => {
      createGeneratedEcosystem('TestEcosystem', () => {
        assert.fileContent('src/components/ecosystems/TestEcosystem.js', '(TestEcosystem);');
        done();
      });
    });
  });

  describe('When creating a new name spaced ecosystem', () => {

    it('should create the ecosystem file', (done) => {
      createGeneratedEcosystem('name/space/TestEcosystem', () => {
        assert.file(['src/components/ecosystems/name/space/TestEcosystem.js']);
        done();
      });
    });

    it('should have the proper class Name', (done) => {
      createGeneratedEcosystem('name/space/TestEcosystem', () => {
        assert.fileContent('src/components/ecosystems/name/space/TestEcosystem.js', 'class TestEcosystem');
        done();
      });
    });

    it('should have prop types attached', (done) => {
      createGeneratedEcosystem('name/space/TestEcosystem', () => {
        assert.fileContent('src/components/ecosystems/name/space/TestEcosystem.js', 'TestEcosystem.propTypes');
        done();
      });
    });

    it('should have the proper prefix', (done) => {
      createGeneratedEcosystem('name/space/TestEcosystem', () => {
        assert.fileContent('src/components/ecosystems/name/space/TestEcosystem.js', '../../../components/ecosystems/Main');
        done();
      });
    });

    it('should export itself', (done) => {
      createGeneratedEcosystem('name/space/TestEcosystem', () => {
        assert.fileContent('src/components/ecosystems/name/space/TestEcosystem.js', '(TestEcosystem);');
        done();
      });
    });
  });
});
