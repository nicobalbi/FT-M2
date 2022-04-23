var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl)) resultSet.push(startEl)
  for (let i = 0; i < startEl.children.length; i++) {
    let result = traverseDomAndCollectElements(matchFunc, startEl.children[i])
    resultSet = [...resultSet, ...result]
  }
  return resultSet
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  switch (selector.charAt(0)) {
    case '#': return 'id'
    case '.': return 'class'
  }
  if (selector.includes('.')) return 'tag.class'
  return 'tag'
};

// NOTA SOBRE LA FUNa, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
    matchFunction = (el) => el.id && (el.id.toLowerCase() === selector.replace('#','').toLowerCase())
  } else if (selectorType === "class") {
    matchFunction = (el) => el.className && el.className.toLowerCase().split(' ').includes(selector.replace('.','').toLowerCase())
  } else if (selectorType === "tag.class") {
    matchFunction = (el) => el.tagName && el.className && (el.tagName.toLowerCase() === selector.split('.')[0].toLowerCase()) && el.className.toLowerCase().split(' ').includes(selector.split('.')[1].toLowerCase())
  } else if (selectorType === "tag") {
    matchFunction = (el) => el.tagName && (el.tagName.toLowerCase() === selector.toLowerCase())
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};

//#region selectorTypeMatcher
// describe("selectorTypeMatcher", function() {
//   it("debe retornar el tipo 'id' para un selector de id", function() {
    var type = selectorTypeMatcher('#pagetitle');
    console.log(type)//("id");
//   });

//   it("debe retornar el tipo 'class'  para un selector de clase", function() {
    var type = selectorTypeMatcher('.image');
    console.log(type)//("class");
//   });

//   it("debe retornar  el tipo 'tag.class' para un selector de tag.class", function() {
    var type = selectorTypeMatcher('img.thumbnail');
    console.log(type)//("tag.class");
//   });

//   it("debe retornar el tipo 'tag' para un selector de tag", function() {
    var type = selectorTypeMatcher('div');
    console.log(type)//("tag");
//   });
// });
//#endregion

//#region matchFunctionMaker
// describe("matchFunctionMaker", function() {

//   it("Debe retornar una funcion que matchie el ID que devuelve TRUE si el elemento matchea el ID", function() {
    var selector = "#price";
    var matcher = matchFunctionMaker(selector);
    var sampleDivEl = document.createElement("DIV")
    sampleDivEl.id = "price"; // el elemento tiene tres distintas clases en él
    console.log(matcher(sampleDivEl))//(true);
//   });

//   it("debe retoranar una función que devuelve FALSE si el elemento no matchea el ID", function() {
    var selector = "#price";
    var matcher = matchFunctionMaker(selector);
    var sampleDivEl = document.createElement("DIV");
    sampleDivEl.id = "logo"; // el elemento tiene tres distintas clases en él
    console.log(matcher(sampleDivEl))//(false);
//   });

//   it("Debería retornar una funcion que matchie la CLASS que devuelve TRUE si el elemento matchea la className", function() {
    var selector = ".heading";
    var matcher = matchFunctionMaker(selector);
    var sampleDivEl = document.createElement("DIV");
    sampleDivEl.className = "heading";
    console.log(matcher(sampleDivEl))//(true);
//   });

//   it("debería retornar una función que matchie la CLASS que devuelva TRUE si el elemento matche la classNAme, incluso cuando hay multiples clases en el elemento", function() {
    var selector = ".heading";
    var matcher = matchFunctionMaker(selector);
    var sampleEl = document.createElement("H1");
    sampleEl.className = "lead heading lightback"; // el elemento tiene tres distintas clases en él
    console.log(matcher(sampleEl))//(true);
//   });

//   it("deberia retornar una function que matchie la CLASS que devuelva FALSE si el elemento no matchie ningun className", function() {
    var selector = ".photo";
    var matcher = matchFunctionMaker(selector);
    var sampleEl = document.createElement("H1");
    sampleEl.className = "photos lightback abstract"; // el elemento tiene tres distintas clases en él
    console.log(matcher(sampleEl))//(false);
//   });

//   it("debería devolver un función que matchie el TAG que devuelva TRUE cuando el elemento matchea el tagName", function() {
    var selector = 'div';
    var matcher = matchFunctionMaker(selector);
    var sampleDivEl = document.createElement("div");
    console.log(matcher(sampleDivEl))//(true);
//   });

//   it("debería devolver un función que matchie el TAG.CLASS que devuelva TRUE cuando el elemento matchea el tagName AND Class", function() {
    var selector = "img.thumbnail";
    var matcher = matchFunctionMaker(selector);
    var sampleDivEl = document.createElement("img");
    sampleDivEl.className = "thumbnail lead lightback"; // el elemento tiene tres distintas clases
    console.log(matcher(sampleDivEl))//(true);
//   });

//   it("debería devolver un función que matchie el TAG.CLASS que devuelva FALSE si el elemento no matchea el tag", function() {
    var selector = "img.photo";
    var matcher = matchFunctionMaker(selector);
    var sampleEl = document.createElement("div");
    sampleEl.className = "photos lightback abstract"; // el elemento tiene tres distintas clases
    console.log(matcher(sampleEl))//(false);
//   });

//   it("debería devolver un función que matchie el TAG.CLASS que devuelva FALSE si el elemento no matchea el className", function() {
    var selector = "img.photo";
    var matcher = matchFunctionMaker(selector);
    var sampleEl = document.createElement("img");
    sampleEl.className = "photos lightback abstract"; // el elemento tiene tres distintas clases
    console.log(matcher(sampleEl))//(false);
//   });

// });
//#endregion

//#region funcion de selector $ 
// describe("funcion de selector $ ", function() {
  var elements;

//   it("debe seleccionar un elemento por tag name (el root en este caso)", function() {
    elements = $('body');
    console.log(elements[0].tagName.toLowerCase())//("body");
//   });

//   it("debería seleccionar un id", function() {
    elements = $('#pagetitle');
    console.log(elements.length)//(1);
//   });

//   it("deberia seleccionar el elmento correcto por id", function() {
    elements = $('#pagetitle');
    console.log(elements[0].innerHTML)//("My Photos");
//   });

//   it("debería seleccionar tag names", function() {
    elements = $('h2');
    console.log(elements.length)//(3);
//   });

//   it("debería seleccionar por clase", function() {
    elements = $('.photo');
    console.log(elements.length)//(4);
//   });

//   it("deberia seleccionar por clase incluyendo elementos con multiples clases", function() {
    elements = $('.lead');
    console.log(elements.length)//(3);
//   });

//   it("deberia seleccionar por tag name y className", function() {
    elements = $('h2.small');
    console.log(elements.length)//(2);
//   });

// });
//#endregion

//#region Credito Extra
// describe("Credito Extra", function () {
//   describe("Selector de Jerarquía", function (){
//     it("debe seleccionar los elementos correctos cuando el selector incluye a un child combinator (>)", function () {
        elements = $('div > img');
        console.log(elements.length)//(7);

        elements = $('body > img');
        console.log(elements.length)//(0);
//     });

//     it("debe seleccionar los elementos correctos cuando el selector incluye un descendant combinator (espacio en blanco)", function () {
        elements = $('body p');
        console.log(elements.length)//(2);

        elements = $('body img');
        console.log(elements.length)//(7);
//     });
//   });
// });
//#endregion