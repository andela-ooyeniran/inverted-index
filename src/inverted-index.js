/*  eslint-disable no-unused-vars*/
/* jshint esnext: true */
/**
 * InvertedIndex class with constructor
 * @class
 */
class InvertedIndex {
  /**
   * class constructor
   * @constructor
   */
  constructor() {
    this.file = {};
    this.index = {};
    this.docNumber = {};
  }

  /**
   *
   *
   * @param {any} fileContent
   * @param {any} fileName
   * @returns {string} returns createIndex
   * @memberOf InvertedIndex
   */
  createIndex(fileContent, fileName) {
    this.docCount = [];
    fileContent.forEach((bookContent, docIndex) => {
      this.docCount.push(parseInt(docIndex, 10));
      this.combinedWord = (`${bookContent.title} ${bookContent.text}`).toLowerCase();
      const token = InvertedIndex.tokenize(this.combinedWord);
      const remove = new Set(token);
      const getUnique = Array.from(remove);
      this.mapWords(getUnique, docIndex);
    });
    this.file[fileName] = this.index;
    this.docNumber[fileName] = this.docCount;
    this.index = {};
  }
  /**
   *
   *
   * @static
   * @param {any} words
   * @returns {string} returns tokenize words
   *
   * @memberOf InvertedIndex
   */
  static tokenize(words) {
    const tokenizedWords = words.match(/\w+/g);
    return tokenizedWords;
  }
  /**
   *
   *
   * @param {any} texts
   * @param {any} docID
   * @returns {string} returns mappred words
   * @memberOf InvertedIndex
   */
  mapWords(texts, docID) {
    texts.forEach((text) => {
      if (text in this.index) {
        this.index[text].push(docID + 1);
      } else {
        this.index[text] = [docID + 1];
      }
    });
  }
  /**
   *
   *
   * @param {any} fileName
   * @return{Object} index - That maps words to locations(documents)
   *
   * @memberOf InvertedIndex
   */
  getIndex(fileName) {
    return this.file[fileName];
  }
  /**
   *
   *
   * @param {any} fileName
   * @param {any} query
   * @return{Object} searchResults - Maps searched words to document locations
   *
   * @memberOf InvertedIndex
   */
  searchIndex(fileName, query) {
    this.searchResult = {};
    this.searchTerms = query.toLowerCase().match(/\w+/g);
    this.searchTerms.forEach((term) => {
      if (term in this.file[fileName]) {
        this.searchResult[term] = this.file[fileName][term];
      }
    });
    return this.searchResult;
  }

  /**
   *
   *
   * @param {any} fileContent
   * @returns {String} returns validated file
   *
   * @memberOf InvertedIndex
   */
  validateFile(fileContent) {
    if (typeof fileContent !== 'object' || fileContent.length === 0) {
      return [false, 'File is empty please a new file'];
    }

    try {
      this.jsonFile = fileContent;
      let check = true;
      this.jsonFile.forEach((key) => {
        if (key.title === undefined || key.text === undefined) {
          check = false;
        }
      });
      if (!check) {
        return [false, 'Invalid File Content'];
      }
      return [true, 'File Uploaded Successfully'];
    } catch (err) {
      if (err instanceof SyntaxError) {
        return [false, 'syntax error'];
      }
      return [false, 'Invalid File Content'];
    }
  }
}

