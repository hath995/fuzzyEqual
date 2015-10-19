[![Circle CI](https://circleci.com/gh/hath995/fuzzyEqual/tree/master.svg?style=shield)](https://circleci.com/gh/hath995/fuzzyEqual/tree/master)
[![codecov.io](https://codecov.io/github/hath995/fuzzyEqual/coverage.svg?branch=master)](https://codecov.io/github/hath995/fuzzyEqual?branch=master)
#Fuzzy-Equals
A function to deeply compare values and produce a naive percentage of similarity and other metrics to analyze the difference between them. The notion of equality in this library is defined as exact type, value, and structural equality. 

### Example
```JavaScript
var fuzzyEqual = require('fuzzy-equal');

var expectation = {
    a: 1,
    b: 2,
    c: ['a','b','c']
}

var reality = {
    a: 1,
    b: null,
    c: ['a','b','f','d']
}

var comparison = fuzzyEqual(expectation, reality);
/*
{ matching_types: true,
  property_count: 3,
  matching: 1,
  similarity: 0.3333333333333333,
  deep_equal: false,
  differing_properties: [],
  common_properties: { a: true, b: true, c: true },
  deep_differences:
   { b: { matching_types: false, similarity: 0, deep_equal: false },
     c:
      { matching_types: true,
        property_count: 4,
        matching: 2,
        similarity: 0.5,
        deep_equal: false } },
  left_only: [],
  right_only: [] }
*/
```

### Documentation
The function fuzzyEqual takes two arguments of any type. 

The result will be an object of the following shape. (Using TypeScript interface notation)
```Typescript
interface Comparison {
    matching_types: boolean,
    similarity: number,      //percentage of matching properties
    deep_equal: boolean,     //quick summary of equality
    property_count?: number, //total number of keys in an object, or length for an array
    matching?: number,       //number of deep equal properties between the two values
    differing_properties?: string[], //list of keys of properties that differed 
    common_properties?: {[index: string]: boolean},   //object containing keys of shared properties
    deep_differences?: {[index: string]: Comparison}, //the comparison object generated for each differing property
    left_only?: string[],    //keys which only appear in the left object
    right_only?: string[],    //keys which only appear in the right object
}
```
