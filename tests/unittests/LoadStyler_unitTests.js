
//import LoadStyler from '../../src/pageone/js/LoadStyler.js'; ---> ES6 import statements don't work!!!

const LoadStyler = require('../../src/pageone/js/LoadStyler');  //TODO da stimmt was nicht!
const assert = require('assert');

//applying JSDOM
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

//adding jquery
global.jquery = require('jquery');
global.$ = global.jquery;

//const $ = global.jquery = require('jquery')(window);


describe('Basic Mocha Tests for the LoadStyler', function() {
  
  before(function() {

    //const styler = new LoadStyler([]);  //giving an empty array otherwise it will throw a warning!

  });
  

  describe('Given Parameter leads to expected behaviour',function() {

    it('this.pageLeaveLinks: Internal class variable has expected value from above (an empty array)',function() {

      const styler = new LoadStyler();

      let class_string = JSON.stringify(styler.pageLeaveLinks);
      let test_string = '[]';

      assert.equal(class_string, test_string);

      //$('body').append($('<div id="nice"></div>'));

      //console.log(document);
      //console.log(document.body);
      //console.log($('#nice').attr('id'));

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

