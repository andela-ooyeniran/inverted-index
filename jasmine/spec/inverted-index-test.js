/* global InvertedIndex*/
/* eslint no-undef: "error"*/
const newIndex = new InvertedIndex();
const validbook = require('../books.json');
const emptyBook = require('../empty-book.json');

newIndex.createIndex(validbook, 'fileName');
// this is test suite
describe('Read book data', () => {
  it('Should return false for empty json file', () => {
    expect(InvertedIndex.validateFile(emptyBook)[0]).toEqual(false);
  });
  it('Should have the getIndex method defined', () => {
    expect(newIndex.getIndex).toBeDefined();
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
