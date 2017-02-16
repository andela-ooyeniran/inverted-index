(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],2:[function(require,module,exports){
module.exports=[]

},{}],3:[function(require,module,exports){
module.exports=[{
    "name": "my name is Oyeniran Otoloye",
    "hint": "Alice falls into a rabbit hole and enters a world full of imagination."
  },
  {
    "name": "my eat food everyday",
    "hint": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],4:[function(require,module,exports){
/* global InvertedIndex*/
/* eslint no-undef: "error"*/
const newIndex = new InvertedIndex();
const validbook = require('../books.json');
const emptyBook = require('../empty-book.json');
const invalidBook = require('../no-title-books.json');

newIndex.createIndex(validbook, 'fileName');
// this is test suite
describe('Read book data', () => {
  it('Should return false for empty json file', () => {
    expect(InvertedIndex.validateFile(emptyBook)[0]).toEqual(false);
  });
  it('Should have the getIndex method defined', () => {
    expect(newIndex.getIndex).toBeDefined();
  });
  it('Should return false for invalid file', () => {
    expect(InvertedIndex.validateFile(invalidBook)[0]).toEqual(false);
  });
  it('Should return true for valid file', () => {
    expect(InvertedIndex.validateFile(validbook)[0]).toEqual(true);
  });
});

describe('Populate Index', () => {
  it('Should ensure that index is created once the file has been read', () => {
    expect(newIndex.getIndex('fileName')).toBeDefined();
  });
  it('Should maps the string keys to the correct objects', () => {
    expect(newIndex.getIndex('fileName').alice).toEqual([0]);
    expect(newIndex.getIndex('fileName').elf).toEqual([1]);
  });
});

describe('Search Index', () => {
  newIndex.createIndex(validbook, 'fileName');
  it('Should return correct index of the search term', () => {
    expect(newIndex.searchIndex('fileName', 'alice, a')).toEqual({
      alice: [0],
      a: [0, 1]
    });
  });
  newIndex.createIndex(validbook, 'fileName');
  it('Should return correct index in an array search terms', () => {
    expect(newIndex.searchIndex('fileName', 'alice, [hole,[a]]')).toEqual({
      alice: [0],
      hole: [0],
      a: [0, 1]
    });
  });
});





},{"../books.json":1,"../empty-book.json":2,"../no-title-books.json":3}]},{},[4])