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
    expect(InvertedIndex.validateFile(emptyBook).status).toEqual(false);
  });
  it('Should have the getIndex method defined', () => {
    expect(newIndex.getIndex).toBeDefined();
  });
  it('Should return false for invalid file', () => {
    expect(InvertedIndex.validateFile(invalidBook).status).toEqual(false);
  });
  it('Should return true for valid file', () => {
    expect(InvertedIndex.validateFile(validbook).status).toEqual(true);
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
  it('Should return correct index of the search term', () => {
    expect(newIndex.searchIndex('alice, a', 'fileName')).toEqual({
      alice: [0],
      a: [0, 1]
    });
  });
  it('Should return correct index in an array search terms', () => {
    expect(newIndex.searchIndex('alice [hole]', 'fileName')).toEqual({
      alice: [0],
      hole: [0]
    });
  });

  it('Should return correct index if query is an array', () => {
    expect(newIndex.searchIndex(['alice', 'hole'], 'fileName')).toEqual({
      alice: [0],
      hole: [0]
    });
  });

  it('Should check if searchFIle is defined', () => {
    expect(newIndex.searchFile).toBeDefined();
  });
  it('Should return value for all files when no file is selected', () => {
    expect(newIndex.searchIndex('alice, a')).toEqual({
      fileName: { alice: [0],
        a: [0, 1]
      }
    });
  });
});
