

# LoadStyler


## How to use

first add the required script and link-tag to your page:

```
<link rel="stylesheet" href="css/LoadStyler.css">
...
<script src="js/LoadStyler.js"></script>
<script src="js/exampleCalls.js">
```

then use the class in following scripts

example Usage in exampleCalls.js:

```
const styler = new LoadStyler();
styler.applyPageTransition();
```



## Additional:

don't run with npm dev!

USE npm run build!

---> because: in dev jquery + bootstrap will be included in build not! (into the js)