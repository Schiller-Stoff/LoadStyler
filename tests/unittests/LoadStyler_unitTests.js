
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

    describe('this.pageLeaveLinks',function() {

      it('this.pageLeaveLinks: Internal class variable has expected value from instantiation',function() {

        const styler = new LoadStyler([]);

        let class_string = JSON.stringify(styler.pageLeaveLinks);
        let test_string = '[]';

        assert.equal(class_string, test_string);
      });

    });

    describe('_retrievePageLinks', function() {

      it('returns all links with no classes found on webpage', function() {

        let styler = new LoadStyler();

        let body = $('body');

        body.append($('<a></a>'));
        body.append($('<a></a>'));
        body.append($('<a></a>'));

        let links = $('a');

        styler._retrievePageLinks();

        let expectedLink_count = 3;
        let actuaclLinksInVariable_count = links.length;

        assert.equal(expectedLink_count,actuaclLinksInVariable_count);
      });

      it('if parameter is given it excatly returns that parameter (ignoring links on page)',function() {

        let styler = new LoadStyler();

        let body = $('body');

        body.append($('<a></a>'));
        body.append($('<a></a>'));
        body.append($('<a></a>'));

        let actualTestString = styler._retrievePageLinks('Test');
        let expectedString = 'Test';

        assert.equal(actualTestString,expectedString);

      });

    });

    describe('_filterPageLeaveLinks', function() {

      it('filters out all a-tags with href smaller than 2',function() {

        let styler = new LoadStyler();

        let body = $('body');

        body.append($('<a href="https://www.google.com"></a>'));
        body.append($('<a href="#"></a>'));
        body.append($('<a href="https://www.yahoo.com"></a>'));

        let filteredLink_count = styler._filterPageLeaveLinks().length;
        let expectedLink_count = 2;

        assert.equal(filteredLink_count,expectedLink_count);

      });

      it('filters out all a tags with href that point to ids on the same site', function() {

        let styler = new LoadStyler();

        let body = $('body');

        body.append($('<a href="#perfect"></a>'));
        body.append($('<a href="#niceTest"></a>'));
        body.append($('<a href="https://www.yahoo.com"></a>'));

        let filteredLink_count = styler._filterPageLeaveLinks().length;
        let expectedLink_count = 1;

        assert.equal(filteredLink_count,expectedLink_count);

      });

      it('filters out all a tags that have class "dropdown"',function() {

        let styler = new LoadStyler();

        let body = $('body');

        body.append($('<a href="www.google.com"></a>'));
        body.append($('<a href="www.yahoo.com" class="dropdown"></a>'));
        body.append($('<a href="www.facebook.com" class="dropdown"></a>'));

        let filteredLink_count = styler._filterPageLeaveLinks().length;
        let expectedLink_count = 1;

        assert.equal(filteredLink_count,expectedLink_count);

      });

      it('filters out all a tags with class = "drppdown-toggle"',function() {

        let styler = new LoadStyler();

        let body = $('body');

        body.append($('<a href="www.google.com"></a>'));
        body.append($('<a href="www.yahoo.com" class="dropdown-toggle"></a>'));
        body.append($('<a href="www.facebook.com" class="dropdown-toggle"></a>'));

        let filteredLink_count = styler._filterPageLeaveLinks().length;
        let expectedLink_count = 1;

        assert.equal(filteredLink_count,expectedLink_count);

      });

      it('filters out all a-tags without href attributes', function() {

        let styler = new LoadStyler();

        let body = $('body');

        body.append($('<a href="www.google.com"></a>'));
        body.append($('<a></a>'));
        body.append($('<a></a>'));

        let filteredLink_count = styler._filterPageLeaveLinks().length;
        let expectedLink_count = 1;

        assert.equal(filteredLink_count,expectedLink_count);

      });

      it('saves filtered links onto class variable', function() {

        let styler = new LoadStyler();

        let body = $('body');

        body.append($('<a href="www.google.com"></a>'));
        body.append($('<a></a>'));
        body.append($('<a></a>'));

        let filteredLink_count = styler._filterPageLeaveLinks().length;
        let expectedLink_count = styler.pageLeaveLinks.length;

        assert.equal(filteredLink_count,expectedLink_count);

      });

    });

  });

  describe('jquery dom manipulation tests', function() {

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

    describe('_applyLoadTransitionBlender',function() {

      it('makes blender visible immediately after function call',function() {

        let styler = new LoadStyler();

        styler._applyLoadTransitionBlender();

        let display_value = styler.blender.css('display');
        let expected_displayValue = 'block';

        assert.equal(display_value, expected_displayValue);

      });

      it('hides the blender after a second (after pageLoad event)',async function() {

        let styler = new LoadStyler();

        //creating small awaitable function
        async function wait(ms) {
          return new Promise(resolve => {
            setTimeout(resolve, ms);
          });
        }

        styler._applyLoadTransitionBlender();

        //trigger load event
        $(window).trigger('load');

        await wait(1000);

        let display_value = styler.blender.css('display');
        let expected_displayValue = 'none';

        assert.equal(display_value, expected_displayValue);


      });

      it.skip('displays the blender after click on pageLeaveLink', async function() {

        //small wait function
        async function wait(ms) {
          return new Promise(resolve => {
            setTimeout(resolve, ms);
          });
        }

        $('body').append($('<a href="https://google.com"></a>'));

        let styler = new LoadStyler();

        //call function
        styler._applyLoadTransitionBlender();

        $(window).trigger('load'); //load event hides the blender

        await wait(1000);

        $('a').click();      //need to give jquery the event data????

        let actualDisplayVal = $('#LoadStyler_Blender').css('display');
        let expDisplayVal = 'block';

        assert.equal(actualDisplayVal, expDisplayVal);


      });



    });

    describe('_applyPreCashLoader',function() {

      it('supplies an click event on links that fades in the preCashLoader afterwards',function() {

        $('body').append($('<a href="https://google.com"></a>'));

        let styler = new LoadStyler();

        styler._applyPreCashLoader();

        //hides the loader --> because no css applied = visible!
        styler.preCacheLoader.hide();

        $('a').click();

        let expDisplayVal = 'block';
        let actualDisplayVal = styler.preCacheLoader.css('display');

        assert.equal(expDisplayVal,actualDisplayVal);

      });

    });

    describe('_applyPreloader',function() {

      it('applies to the window onload event --> fadeOut of the preloader with animation',async function() {

        async function wait(ms) {
          return new Promise(resolve => {
            setTimeout(resolve, ms);
          });
        }


        //$('body').append($('<a href="https://google.com"></a>'));

        let styler = new LoadStyler();

        styler._applyPreLoader();

        $(window).trigger('load');

        await wait(1000);

        let expDisplayVal = 'none';
        let actualDisplayVal = styler.preloader.css('display');

        assert.equal(expDisplayVal,actualDisplayVal);

      });

    });

    describe('styleAjaxLoadsSimple', function() {

      it('adds to the ajax start-event: shows the preloader when an arbitrary ajax-load is called',function() {

        let styler = new LoadStyler();

        styler.styleAjaxLoadsSimple();

        //first hide the preloader
        styler.preloader.hide();

        $(document).trigger('ajaxStart');

        let expectedDisplayVal = 'block';
        let actualDisplayVal = styler.preloader.css('display');

        $(document).trigger('ajaxComplete');

        assert.equal(expectedDisplayVal,actualDisplayVal);

      });

      it('adds to the ajax-complete-event: hides the preloader with fadeout when triggered', async function() {

        async function wait(ms) {
          return new Promise(resolve => {
            setTimeout(resolve, ms);
          });
        }


        let styler = new LoadStyler();

        styler.styleAjaxLoadsSimple();

        //first show the preloader
        styler.preloader.show();

        $(document).trigger('ajaxComplete');

        //wait for the preloader to disappear
        await wait(500);

        let expectedDisplayVal = 'none';
        let actualDisplayVal = styler.preloader.css('display');

        assert.equal(expectedDisplayVal,actualDisplayVal);

      });


    });

    describe('styleAjaxLoads',function() {

      it('fades in ajaxLoader after click on given element',function() {

        let styler = new LoadStyler();

        let body = $('body');

        let src_btn = body.append($('<button id="source"></button>'));
        let trgt_div = body.append($('<div id="target"></div>'));

        styler.styleAjaxLoads([{source:src_btn,target:trgt_div}]);

        styler.ajaxloader.hide();

        src_btn.click();

        let expectedDisplayVal = 'block';
        let actualDisplayVal =  styler.ajaxloader.css('display');

        assert.equal(expectedDisplayVal,actualDisplayVal);

      });

      it('applies to ajaxComplete event --> fade out of the ajaxLoader',async function() {

        async function wait(ms) {
          return new Promise(resolve => {
            setTimeout(resolve, ms);
          });
        }

        let styler = new LoadStyler();

        let body = $('body');

        let src_btn = body.append($('<button id="source"></button>'));
        let trgt_div = body.append($('<div id="target"></div>'));

        styler.styleAjaxLoads([{source:src_btn,target:trgt_div}]);

        styler.ajaxloader.show();

        $(document).trigger('ajaxComplete');

        await wait(1000);

        let expectedDisplayVal = 'none';
        let actualDisplayVal =  styler.ajaxloader.css('display');
        assert.equal(expectedDisplayVal,actualDisplayVal);


      });

    });

  });

  describe('Throws handled error as expected', function() {

    describe('wrong input at instantiation',function() {

      it('leads to no error', function() {

        let styler = new LoadStyler([]);

        // try {
        //   styler.applyPageTransition();
        // } catch (e) {
        //   if(e.search('TypeError') !== -1){
        //     assert.ok();
        //   }
        //
        // }



      });


    });

    describe('applyLoaderTransition',function() {

      it('catches error if wrong argument was given at instantiation',function() {

        let styler = new LoadStyler([]);

        try {
          styler.applyLoaderTransition()
        } catch (e) {

          if(e.search('TypeError')!==-1){assert.ok()}
          else throw new Error('Unhandled error detected!' + e);
        }



      });

    });

    describe.skip('applyPageTransition',function() {

      it.skip('catches error if wrong argument was given at instantiation',function() {

      });


    });

    describe('styleAjaxLoadsSimple',function() {

      it('blends out preloader even when ajax fails', async function() {

        async function wait(ms) {
          return new Promise(resolve => {
            setTimeout(resolve, ms);
          });
        }

        let styler = new LoadStyler();

        styler.styleAjaxLoadsSimple();

        styler.preloader.show();

        $(document).trigger('ajaxComplete');  //if jquery ajax fails it will trigger ajaxComplete!

        await wait(1000);

        let expectedDisplayVal = 'none';
        let actualDisplayVal = styler.preloader.css('display');

        assert(expectedDisplayVal,actualDisplayVal);

      });

    });

    describe.skip('styleAjaxLoads',function() {

      it.skip('catches errir if ajax load fails', function() {



      });

    });

  });






});

