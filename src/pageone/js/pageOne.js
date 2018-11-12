
// ------ example Imports -------
//jquery
import $ from 'jquery';
//bootstrap
import "bootstrap";


//----- Example Export ----
export default
class PageOne{

  constructor(){
  }

  testMe(){

    console.info('\n\n --- Init TestCall ---- ');
    console.log('TestCall: This is the mainPage!');
    // example jquery usage
    console.log('TestPrint of the jQuery object...');
    console.log($);

    //test bootstrap call
    console.log('Will return true if bootstrap is loaded:');
    console.log((typeof $.fn.popover)==='function');
    console.log('--- TestCall end ---\n\n');
  }
}
