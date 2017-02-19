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
    const index = {};
    const docCount = [];

    fileContent.forEach((bookContent, docIndex) => {
      docCount.push(docIndex);
      const textWords = bookContent.text.toLowerCase();
      const tokens = InvertedIndex.tokenize(textWords);
      const remove = new Set(tokens);
      const getUnique = Array.from(remove);
      getUnique.forEach((text) => {
        if (text in index) {
          index[text].push(docIndex);
        } else {
          index[text] = [docIndex];
        }
      });
    });

    this.files[fileName] = index;
    this.docNumber[fileName] = docCount;
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
   * @method searchIndex
   * @param {String} query
   * @param {String} fileName
   * @return{Object} searchResults
   *
   * @memberOf InvertedIndex
   */
  searchIndex(query, fileName) {
    let searchResult = {};
    let searchTerms = query;

    if (typeof query === 'string') {
      searchTerms = query.toLowerCase().match(/\w+/g);
    }

    fileName = fileName || 'Allfiles';
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
   * @returns {Object} returns validated file
   *
   * @memberOf InvertedIndex
   */
  static validateFile(fileContent) {
    if (typeof fileContent !== 'object' || fileContent.length === 0) {
      return {
        status: false,
        msg: 'File is empty retry with a valid JSON file'
      };
    }
    const jsonFile = fileContent;
    let check = true;
    jsonFile.forEach((document) => {
      if (!document.title || !document.text) {
        check = false;
      }
    });
    if (!check) {
      return {
        status: false,
        msg: 'Invalid File Content'
      };
    }
    return {
      status: true,
      msg: 'File Uploaded Successfully'
    };
  }
}
