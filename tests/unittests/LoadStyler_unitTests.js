
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
  
  beforeEach(function() {

    //makes sure that window reloads after each test!
    $('body').html('');
    //console.log('hi!');

  });
  

  describe('Given Parameter leads to expected behaviour',function() {

    it('this.pageLeaveLinks: Internal class variable has expected value from instantiation',function() {

      const styler = new LoadStyler([]);

      let class_string = JSON.stringify(styler.pageLeaveLinks);
      let test_string = '[]';

      assert.equal(class_string, test_string);
    });

    it('styleAjaxLoads: if array of objects is given.... ', function() {

    })

  });

  describe('jquery tests', function() {

    describe('_selectPreloader',function() {

      it('adds required element to DOM with id="LoadStyler_Preloader", if elements not added',function() {

        const styler = new LoadStyler();

        styler._selectPreloader();

        let elem_count = $('#LoadStyler_Preloader').length;

        assert.equal(elem_count,1);

      });

      it('saves required elem into the classvariable',function() {

        const styler = new LoadStyler();

        styler._selectPreloader();

        let expected_id = 'LoadStyler_Preloader';
        let savedPreloader_id = styler.preloader.attr('id');

        assert.equal('LoadStyler_Preloader', savedPreloader_id);

      });

      it('does not add the needed element if already present in the dom', function() {

        const styler = new LoadStyler();

        $('body').prepend($('<div id="LoadStyler_Preloader"></div>'));

        styler._selectPreloader();

        let divsInBody_count = $('div').length;
        let expected_divsInBody = 1;

        assert.equal(divsInBody_count,expected_divsInBody);

      });

    });

    describe('_selectBlender',function() {

      it('selects and saves elem into class variable', function() {

        let styler = new LoadStyler();

        $('body').append($('<div id="LoadStyler_Blender"></div>'));

        styler._selectBlender();

        let id_ofHtmlElem = $('#LoadStyler_Blender').attr('id');

        let id_ofClassVariable = styler.blender.attr('id');

        assert.equal(id_ofClassVariable,id_ofHtmlElem);

      });

      it('creates needed element if not present in DOM',function() {

        let styler = new LoadStyler();

        styler._selectBlender();

        let id_ofSelectedElem = $('#LoadStyler_Blender').attr('id');

        let expectedId = 'LoadStyler_Blender';

        assert.equal(id_ofSelectedElem,expectedId);

      });

      it('does not create the needed elem a second time if already present in dom', function() {

        let styler = new LoadStyler();

        $('body').append($('<div id="LoadStyler_Blender"></div>'));

        styler._selectBlender();

        let actualDivCount = $('div').length;
        let expected_divCount = 1;

        assert.equal(actualDivCount,expected_divCount);

      });

      it('creates another element if the id of the static html is missspelled',function() {

        let styler = new LoadStyler();

        $('body').append($('<div id="9LoadStyler_Blender"></div>'));

        styler._selectBlender();

        let actualDivCount = $('div').length;
        let expected_divCount = 2;

        assert.equal(actualDivCount,expected_divCount);

      });

    });

    describe('_selectAjaxLoader',function() {

      it('selects and saves elem into class variable',function() {

        let styler = new LoadStyler();

        styler._selectAjaxLoader();

        let id_ofHtmlElem = $('#LoadStyler_AjaxLoader').attr('id');

        let id_ofClassVariable = styler.ajaxloader.attr('id');

        assert.equal(id_ofClassVariable,id_ofHtmlElem);


      });

      it('creates the element needed if not present in the dom', function() {

        let styler = new  LoadStyler();

        styler._selectAjaxLoader();

        let id_ofHtmlElem = $('#LoadStyler_AjaxLoader').attr('id');
        let expectedId = 'LoadStyler_AjaxLoader';

        assert.equal(id_ofHtmlElem,expectedId);


      });

      it('does not create another elem, if already present in dom',function() {

        let styler = new LoadStyler();

        $('body').append($('<div id="LoadStyler_AjaxLoader"></div>'));

        styler._selectAjaxLoader();

        let expectedDivCount = 1;
        let actualDivCount = $('div').length;

        assert.equal(expectedDivCount,actualDivCount);

      });
    });

    describe('_selectPrecacheLoader',function() {

      it('selects and saves elem into class variable', function() {

        let styler = new LoadStyler();

        $('body').append($('<div id="LoadStyler_PrecacheLoader"></div>'));

        styler._selectPrecacheLoader();

        let id_ofHtmlElem = $('#LoadStyler_PrecacheLoader').attr('id');

        let id_ofClassVariable = styler.preCacheLoader.attr('id');

        assert.equal(id_ofClassVariable,id_ofHtmlElem);

      });

      it('creates the element needed if not present in the dom', function() {

        let styler = new  LoadStyler();

        styler._selectPrecacheLoader();

        let id_ofHtmlElem = $('#LoadStyler_PrecacheLoader').attr('id');
        let expectedId = 'LoadStyler_PrecacheLoader';

        assert.equal(id_ofHtmlElem,expectedId);
      });

      it('does not create another elem, if already present in dom',function() {

        let styler = new LoadStyler();

        $('body').append($('<div id="LoadStyler_PrecacheLoader"></div>'));

        styler._selectPrecacheLoader();

        let expectedDivCount = 1;
        let actualDivCount = $('div').length;

        assert.equal(expectedDivCount,actualDivCount);

      });

    });

  });




  describe('',function() {

  });

  describe('Throws error as expected', function() {

  });






});

