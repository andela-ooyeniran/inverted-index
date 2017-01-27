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
