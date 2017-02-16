/*  eslint-disable no-unused-vars*/
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
    this.files = {};
    this.index = {};
    this.docNumber = {};
  }

  /**
   *
   * @method createIndex
   * @param {Object} fileContent
   * @param {String} fileName
   * @returns {Object[]} returns createIndex
   * @memberOf InvertedIndex
   */
  createIndex(fileContent, fileName) {
    this.docCount = [];
    fileContent.forEach((bookContent, docIndex) => {
      this.docCount.push(docIndex);
      const combinedWord = (`${bookContent.title} ${bookContent.text}`).toLowerCase();
      const tokens = InvertedIndex.tokenize(combinedWord);
      const remove = new Set(tokens);
      const getUnique = Array.from(remove);
      this.mapWords(getUnique, docIndex);
    });
    this.files[fileName] = this.index;
    this.docNumber[fileName] = this.docCount;
    this.index = {};
  }

  /**
   *
   * @method mapWords
   * @param {String} texts
   * @param {number} docID
   * @returns {string} returns mapped words
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
   * @method statictokenize
   * @static
   * @param {Object[]} words
   * @returns {string} returns tokenize words
   *
   * @memberOf InvertedIndex
   */
  static tokenize(words) {
    return words.match(/\w+/g);
  }

  /**
   *
   * @method getIndex
   * @param {String} fileName
   * @return{Object} index - That maps words to locations(documents)
   *
   * @memberOf InvertedIndex
   */
  getIndex(fileName) {
    return this.files[fileName];
  }

  /**
   *
   * @method getIndex
   * @param {String} fileName
   * @param {String} query
   * @return{Object} searchResults
   *
   * @memberOf InvertedIndex
   */
  searchIndex(fileName, query) {
    let searchResult = {};
    const searchTerms = query.toLowerCase().match(/\w+/g);
    if (fileName === 'Allfiles') {
      Object.keys(this.files).forEach((indexName) => {
        searchResult[indexName] = this.searchFile(indexName, searchTerms);
      });
    } else {
      searchResult = this.searchFile(fileName, searchTerms);
    }
    return searchResult;
  }

   /**
   *
   * @method searchFile
   * @param {String} fileName
   * @param {String} searchTerms
   * @return{Object} searchResults - Maps searched words to document locations
   *
   * @memberOf InvertedIndex
   */
  searchFile(fileName, searchTerms) {
    const result = {};
    const index = this.getIndex(fileName);
    searchTerms.forEach((term) => {
      if (index[term]) {
        result[term] = index[term];
      }
    });
    return result;
  }

  /**
   *
   * @method validateFile
   * @param {Object} fileContent
   * @returns {String} returns validated file
   *
   * @memberOf InvertedIndex
   */
  static validateFile(fileContent) {
    if (typeof fileContent !== 'object' || fileContent.length === 0) {
      return [false, 'File is empty retry with a valid JSON file'];
    }
    const jsonFile = fileContent;
    let check = true;
    jsonFile.forEach((document) => {
      if (!document.title || !document.text) {
        check = false;
      }
    });
    if (!check) {
      return [false, 'Invalid File Content'];
    }
    return [true, 'File Uploaded Successfully'];
  }
}
