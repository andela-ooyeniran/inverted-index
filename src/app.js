  /* global angular InvertedIndex document FileReader*/
/* eslint no-undef: "error"*/
  const app = angular.module('Index', []);
  app.controller('IndexCtrl', ($scope) => {
    const newIndex = new InvertedIndex();
    $scope.fileName = [];
    $scope.fileCreated = [];
    $scope.uploadedFiles = {};
    $scope.upload = true;
    $scope.myValue = false;
    $scope.error = '';

    $scope.documents = [];
    $scope.details = {};
    $scope.docNo = newIndex.docCount;

    document.getElementById('myjsonfile').addEventListener('change', (e) => {
      const fileDoc = e.target.files;
      for (let x = 0; x < fileDoc.length; x += 1) {
        $scope.uploader(fileDoc[x]);
      }
    });
    document.getElementById('drop-select').addEventListener('change', () => {
      $scope.myValue = true;
    });

    $scope.uploader = (file) => {
      const reader = new FileReader();
      if (!file.name.match(/\.json$/)) {
        $scope.$apply(() => {
          $scope.error = 'Invalid File type retry with a JSON file ';
        });
        return;
      }
      reader.onloadend = (event) => {
        const readybooks = JSON.parse(event.target.result);
        $scope.check = InvertedIndex.validateFile(readybooks);
        if ($scope.check[0] === false) {
          $scope.$apply(() => {
            $scope.error = $scope.check[1];
          });
          return;
        }
        $scope.$apply(() => {
          $scope.fileName.push(file.name);
          $scope.uploadedFiles[file.name] = readybooks;
        });
      };
      reader.readAsBinaryString(file);
    };

    $scope.createIndex = () => {
      newIndex.createIndex($scope.uploadedFiles[$scope.selectedFile], $scope.selectedFile);
      $scope.renderNumber = newIndex.docNumber[$scope.selectedFile];
      $scope.fileCreated.push($scope.selectedFile);
      $scope.getFile = newIndex.getIndex($scope.selectedFile);
      $scope.result = $scope.getFile;
    };

    $scope.searchIndex = () => {
      if ($scope.fileSearch === 'Allfiles') {
        $scope.multipleSearchTable = true;
        $scope.searchQuery = $scope.query;
        $scope.searchResults = newIndex.searchIndex('Allfiles', $scope.searchQuery);
      } else {
        $scope.singleSearchTable = true;
        $scope.multipleSearchTable = false;
        $scope.searchQuery = $scope.query;
        $scope.result = newIndex.searchIndex($scope.fileSearch, $scope.searchQuery);
      }
    };
  });

