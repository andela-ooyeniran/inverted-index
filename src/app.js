(() => {
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
          $scope.error = "File is not JSON";
        });
        return;
      }
      reader.onloadend = (event) => {
        this.readybooks = JSON.parse(event.target.result);
        $scope.check = newIndex.validateFile(this.readybooks);
        if ($scope.check[0] === false) {
          $scope.$apply(() => {
            $scope.error = $scope.check[1];
          });
            return;
        }
        $scope.$apply(() => {
          $scope.fileName.push(file.name);
          $scope.uploadedFiles[file.name] = this.readybooks;
        });
      };
      reader.readAsBinaryString(file);
    };

    $scope.createIndex = () => {
      newIndex.createIndex($scope.uploadedFiles[$scope.selectedFile], $scope.selectedFile);
      $scope.renderNumber = newIndex.docNumber[$scope.selectedFile];
      // get the particular document number of the file selected
      $scope.fileCreated.push($scope.selectedFile);
      $scope.getty = newIndex.getIndex($scope.selectedFile);
      $scope.result = $scope.getty;
    };

    $scope.searchIndex = () => {
      $scope.result = newIndex.searchIndex($scope.fileSearch, $scope.query);
    };
  });
})();
