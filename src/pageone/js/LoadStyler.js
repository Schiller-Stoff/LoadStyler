
// ------ example Imports -------
//jquery
import $ from 'jquery';
//bootstrap
import "bootstrap";


//----- Example Export ----
export default
class LoadStyler{

    constructor(toStyleLinks){

        // will only be assigned if needed (when _applyPreLoader is called - for ex. over applyLoaderTransition or applyPageTransition)
        this.preloader = undefined;

        // will only be assigned if needed (when applayLoadTransitionBlender is called)
        this.blender = undefined;

        // will only be assigned if needed (when styleAjaxLoads is called)
        this.ajaxloader = undefined;

        // will only be assigned if needed
        this.preCacheLoader = undefined;

        // select and remember selected pageLeave <a>
        this.pageLeaveLinks = this._retrievePageLinks(toStyleLinks);

        // ajax Load Register - for handling load order
        this.ajaxLoadRegister = [];

        // order counter for ajax animations
        this.ajax_orderCounter = 0;

        // ajax - Url
        this.ajax_url = undefined;

        // AjaxOnscroll Stacks - needed for scrollHandleContent
        //this._ajaxDownScrollStack = new Stack();
        //this._ajaxUpScrollStack = new Stack();

    }

    applyLoaderTransition(){
        //Loading of page (precash and preload) will be indicated by a loader;
        //no full stack page transition -- will only display the animated loader.
        //function calls _applyPreLoader() and _applyPreCashLoader()
        this._applyPreLoader();
        this._applyPreCashLoader();
    }

    applyPageTransition(){
        // adds a full page transition to the page
        // calls applyLoaderTransition (for the css animated loader)  and _applyLoadTransitionBlender
        // for the background-fading effect.

        this.applyLoaderTransition();
        this._applyLoadTransitionBlender();

    }

    styleAjaxLoadsSimple(){
        // Method uses the preloader to indicate the loading time
        // blends it in, in the centre of page
        // will style all ajax loads -- with the same style,

        let self = this; //jQuery "this"-saver

        $(document).ajaxStart(function(evt) {
            console.debug("LoadStyler: Ajax start detected...");
            // blending in animation here
            self.preloader.fadeIn();

        });

        $(document).ajaxComplete(function( event, xhr, settings ) {
            console.debug("LoadStyler: Ajax stop detected...");
            // blending out animation here
            self.preloader.fadeOut();
        });
    }

    styleAjaxLoads(objectArray){
        // awaits an array of objects as input: The objects must have the two properties 'source' and 'target'
        // source should define the source of the ajax - activaion for example the buttons --> elements with the assigned click event
        // target should define the parent container-element to where the ajax-container element should be loaded!
        // function applies an click-event listener to the source elements --> appends ajaxLoader to the end
        // of the target-parent and blends in the ajaxLoader as long as the ajax loads takes.
        // the relative position of the ajaxLoader is handled by the CSS.

        //Debug Info
        console.info("\n\n------ styleAjaxLoads()-----");
        console.info('The given parameter is:');
        console.info(objectArray);
        //


        let self = this;    //jquery saver


        self._selectAjaxLoader();


        objectArray.forEach(function (obj) {
            // Error Handling
            if(obj.target.length===0)return console.log('There is no Element in your target selection: ' + obj.target);
            if(obj.source.length===0)return console.log('There is no Element in your source selection: ' + obj.source);
            //

            obj.target.css({position:'relative'});                  // makes sure that the parent container of the element is set to relative!


            //obj.source = self._validateSelection(obj.source);       // this is necessary because of ajax --> jquery can't select a not existing elem, here it will select it if not already!

            obj.source.click(function () {

                console.info('\n\nClick event test');

                obj.target.append(self.ajaxloader);
                self.ajaxloader.fadeIn();

            });


        });

        $(document).ajaxComplete(function () {
            console.debug("LoadStyler: Ajax stop detected...");
            // blending out animation here
            self.ajaxloader.fadeOut();
        })

    }

    applyVisibleHeaderTransition(){
        //
        //
        //

        let self = this;



    }

    applyHeaderNavSlideOnload(){
        // sets the display value of the header and nav onload to 'none' --> and display them again via
        // animation. (
        //

        let header = $('header');

        let nav = $('nav');

        header.css('display','none');
        nav.css('display','none');

        nav.fadeIn(1500,'swing');

        header.slideDown(600,'swing');



    }

    _applyPreLoader(){

        // 'this'- container, because of jQuery -- polluted namespace
        // avoids conflicts
        let self = this;

        this._selectPreloader();

        // On load
        $(window).on('load', function() { // makes sure the whole site is loaded
            self.preloader.delay(350).fadeOut('slow');
            $('body').delay(350).css({'overflow':'visible'});
        });
    }

    _applyPreCashLoader(){
        // controls the animation and visibility of the PreCashLoader in the DOM
        // animations via jquery .fadeIn()
        // calls function _selectPrecacheLoader.

        let self = this;

        this._selectPrecacheLoader();

        this.pageLeaveLinks.click(function () {
            self.preCacheLoader.fadeIn();
        });

    }

    _applyLoadTransitionBlender(){
        // applies a black blender to the loading transition
        // prevents default of the a - elements in the nav!

        let self = this;

        this._selectBlender();

        self.blender.show();

        $(window).on('load', function() { // makes sure the whole site is loaded
            self.blender.delay(350).fadeOut('slow');
            $('body').delay(350).css({'overflow':'visible'});
        });

        self.pageLeaveLinks.click(function () {
            event.preventDefault();
            let url = $(this).attr('href');
            self.blender.fadeIn(300, function () {
                document.location.href = url;
            });
            return false;
        });

    }

    _selectPreloader(){
        // Checks if there is an element with the id 'LoadStyler_Preloader' in the DOM.
        // If yes it will return the selection, if not it will return the generated div
        // with the required id.
        // Further checks if position / zIndex for the element is at standard value --> if not applies custom css via jquery!

        let self = this;

        let preloaderCatcher = $('#LoadStyler_Preloader');

        // Check if there's already the preloader in the DOM.
        if(preloaderCatcher.length > 0){

            return self.preloader = preloaderCatcher;

        } else {

            let preloader = $('<div id="LoadStyler_Preloader"></div>');

            $('body').prepend(preloader);

            // apply custom styling if no css is applied
            if((preloader.css('z-index')=== 'auto')&&(preloader.css('position')!== 'fixed')){

                preloader.css({
                    border: '16px solid #f3f3f3',
                    borderRadius: '50%',
                    borderTop: '16px solid #3498db',
                    width: '120px',
                    height: '120px',
                    '-webkit-animation': 'spin 2s linear infinite',
                    animation: 'spin 2s linear infinite',
                    position: 'fixed',
                    margin: 'auto',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 101
                });
            }

            return self.preloader = preloader;


        }

    }

    _selectBlender(){
        // Checks if there is an element with the id #LoadStyler_Blender in the DOM.
        // If yes it will return the selection, if not it will return the generated div
        // with the required id.
        // Further checks if position / zIndex for the element is at standard value --> if not applies custom css via jquery!

        let self = this;

        let blender = $('#LoadStyler_Blender');

        if(blender.length > 0){
            return self.blender = blender;
        } else {

            blender = $('<div id="LoadStyler_Blender"></div>');

            $('body').prepend(blender);

            if((blender.css('z-index')=== 'auto')&&(blender.css('position')!== 'fixed')){

                blender.css({
                    position: 'fixed',      // blender wird immer mitgenommen!
                    zIndex: 100,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black',
                    opacity: 1,
                    display:'none'
                });
            }
            return self.blender = blender;
        }
    }

    _selectAjaxLoader(){
        // Checks if there is an element with the id #LoadStyler_AjaxLoader in the DOM.
        // If yes it will return the selection, if not it will return the generated div
        // with the required id.
        //  checks if zIndex for the element is at standard value --> if not applies custom css via jquery!

        let self = this;

        let ajaxLoader = $('#LoadStyler_AjaxLoader');

        if(ajaxLoader.length > 0){

            return self.ajaxloader = ajaxLoader;

        } else {

            ajaxLoader = $('<div id="LoadStyler_AjaxLoader"></div>');

            $('body').prepend(ajaxLoader);

            if((ajaxLoader.css('z-index')=== 'auto')){

                ajaxLoader.css({
                    border: '8px solid #f3f3f3',
                    borderRadius: '50%',
                    borderTop: '8px solid #3498db',
                    width: '60px',
                    height: '60px',
                    '-webkit-animation': 'spin 2s linear infinite',
                    animation: 'spin 2s linear infinite',
                    position: 'absolute',
                    margin: 'auto',
                    top: '45%',
                    left: '45%',
                    zIndex: 101,
                    display: 'none'
                });


            }

            return self.ajaxloader = ajaxLoader;
        }

    }

    _selectPrecacheLoader(){
        // Checks if there is an element with the id #LoadStyler_PrecacheLoader in the DOM.
        // If yes it will return the selection, if not it will return the generated div
        // with the required id.
        // Further checks if position / zIndex for the element is at standard value --> if not applies custom css via jquery!

        let self = this;

        let preCacheLoader = $('#LoadStyler_PrecacheLoader');

        // Check if there's already the preloaderCatcher in the DOM.
        if(preCacheLoader.length > 0){

            return self.preCacheLoader = preCacheLoader;

        } else {

            preCacheLoader = $('<div id="LoadStyler_PrecacheLoader"></div>');

            $('body').prepend(preCacheLoader);

            if((preCacheLoader.css('z-index')=== 'auto')&&(preCacheLoader.css('position')!== 'fixed')){

                preCacheLoader.css({
                    border: '16px solid #f3f3f3',
                    borderRadius: '50%',
                    borderTop: '16px solid #3498db',
                    width: '120px',
                    height: '120px',
                    '-webkit-animation': 'spin 2s linear infinite',
                    animation: 'spin 2s linear infinite',
                    position: 'fixed',
                    margin: 'auto',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 101
                });
            }

            return self.preCacheLoader = preCacheLoader;

        }

    }

    _calcBorderBottomPosition(element){
        // Calculates the position of the BottomBorder of the element.
        // Uses the jquery Methods height() and offset() ---> the numbers work relative
        // to the document.

        let elementHeight = element.height();
        let elementTopDistance = element.offset().top; //.offset returns an object with property lef and top
        let elemBottomBorderPos = elementHeight + elementTopDistance;

        return elemBottomBorderPos;
    }

    _retrievePageLinks(toStyleLinks){
        //
        //
        //

        if (toStyleLinks === undefined){

            return this._filterPageLeaveLinks();

        } else {

            return toStyleLinks;

        }


    }

    _filterPageLeaveLinks(){
        // tries to return the <a> tags that lead to pageLeave, filter
        // out for ex. dropdowns
        // checks for bootstrap typical classes like .dropdown and .dropdown-toggle
        // and Checks href-attribute has value longer then 1 and that no '#' is included --> and filters out

        let self = this;

        let pageLeaveAs = $('a').not($('.dropdown')).not($('.dropdown-toggle')).not(function () {

            // catches error if attr is not defined
            if($(this).attr('href')===undefined)return true;

            // when return = true then it is filtered out!
            if($(this).attr('href').length < 2 || ($(this).attr('href').indexOf('#') !== -1)){
                return true
            } else {
                return false
            }
        });

        return self.pageLeaveLinks = pageLeaveAs;

    }

}
