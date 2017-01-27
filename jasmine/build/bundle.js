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
const newIndex = new InvertedIndex();
const validbook = require('../books.json');
const emptyBook = require('../empty-book.json');
// const invalidBook = require('../no-title-books.json');
// const nocontent = require('../empty.json');
newIndex.createIndex(validbook, 'fileName');
// this is test suite
describe('Read book data', () => {
  it('Should return false for empty json file', () => {
    expect(newIndex.validateFile(emptyBook)[0]).toEqual(false);
  });
});

describe('Populate Index', () => {
  it('Should ensure that index is created once the file has been read', () => {
    expect(newIndex.createIndex).toBeDefined();
  });
  it('Should maps the string keys to the correct objects', () => {
    expect(newIndex.getIndex).toBeDefined();
  });
  it('Should maps the string keys to the correct objects', () => {
    newIndex.createIndex(validbook, 'fileName');
    expect(newIndex.getIndex('fileName').alice).toEqual([1]);
  });
});

describe('Search Index', () => {
  newIndex.createIndex(validbook, 'fileName');
  it('Should return correct index of the search term', () => {
    expect(newIndex.searchIndex('fileName', 'alice, a')).toEqual({
      alice: [1],
      a: [1, 2]
    });
  });
  newIndex.createIndex(validbook, 'fileName');
  it('Should return correct index in an array search terms', () => {
    expect(newIndex.searchIndex('fileName', 'alice, [hole,[a]]')).toEqual({
      alice: [1],
      hole: [1],
      a: [1, 2]
    });
  });
});

},{"../books.json":1,"../empty-book.json":2}]},{},[3])