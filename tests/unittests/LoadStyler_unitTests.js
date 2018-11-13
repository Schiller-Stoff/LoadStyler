
//import LoadStyler from '../../src/pageone/js/LoadStyler.js';

//const Styler = new LoadStyler([]);

const LoadStyler = require('../../src/pageone/js/LoadStyler');  //TODO da stimmt was nicht!
const styler = new LoadStyler([]);
const assert = require('assert');



describe('Basic Mocha Tests for the LoadStyler', function() {
  
  before(function() {

    //const styler = new LoadStyler([]);  //giving an empty array otherwise it will throw a warning!

  });
  

  describe('Given Parameter leads to expected behaviour',function() {

    it('this.pageLeaveLinks: Internal class variable has expected value from above (an empty array)',function() {

      let class_string = JSON.stringify(styler.pageLeaveLinks);
      let test_string = '[]';

      assert.equal(class_string, test_string);

    });

    it('styleAjaxLoads: if array of objects is given.... ', function() {

    })

  });

  describe('Return value has expected type', function() {

  });

  describe('',function() {

  });

  describe('Throws error as expected', function() {

  });






});

