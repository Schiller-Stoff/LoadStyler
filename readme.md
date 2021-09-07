

# LoadStyler

JQuery based class to simplify the indication of loading processes on web-frontends like waiting for request - responses etc.


## Demos and Examples
- [Cantus Page transition effect](https://gams.uni-graz.at/context:cantus)
- [at different GAMS projects](http://gams.uni-graz.at/)


## How to use


-Use LoadStyler.js and LoadStyler.css

then add the required script and link-tag to your page:

```
<link rel="stylesheet" href="css/LoadStyler.css">
...
<script src="js/LoadStyler.js"></script>
<script src="js/exampleCalls.js">
```

then use the class in following scripts



### Straight Usage

e.g. in exampleCalls.js:

```
const styler = new LoadStyler();
styler.applyPageTransition();
```



### Usage via html elements - Increasing Load-Times

apply following elements with the ids to your page:

```
<div id="LoadStyler_Preloader"></div>
<div id="LoadStyler_Blender"></div>
<div id="LoadStyler_AjaxLoader"></div>
```

then call again:

```
const styler = new LoadStyler();
styler.applyPageTransition();
```


### Applying specific links for the page-transition


At instantiation declare the links which should call the transition effect

```
let links = $('nav a')
var styler = new LoadStyler(links);       //pagetransition only applied to <a>'s in the navigation

```


## Customization

mainly via css in LoadStyler.css


## Additional:

don't run with npm dev!

USE npm run build!

---> because: in dev jquery + bootstrap will be included in build not! (into the js)
