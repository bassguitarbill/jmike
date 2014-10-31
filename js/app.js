var app = angular.module("jmikeApp", []);
	
tab = 'home';

app.directive("navTabs", function() {
	return {
		restrict: 'E',
		templateUrl: 'nav-tabs.html',
		controller: function() {
			this.isSet = function(checkTab) {
				return tab === checkTab;
			};

			this.setTab = function(activeTab) {
				tab = activeTab;
			};
		},
		controllerAs:'tab'
	}
});

app.filter("sanitize",['$sce', function($sce) {
	return function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	}
}]);
/* Article controller */

app.controller("articleLoader",function($scope, $http) {

	$scope.articleIndex = [];
	$scope.indexLoaded = false;
	$scope.articles = [];

	$scope.count = 1;

	indexPath = 'articles/index.json';
	$scope.onLoad = function(data) {
		$scope.indexLoaded = true;
		$scope.articleIndex = data.articles.sort().reverse();
		$scope.loadArticles($scope.count);
	}

	$scope.loadAnotherArticle = function() {
		$scope.count += 1;
		$scope.loadArticles($scope.count);
	}
	$scope.loadArticle = function(index){
		if(!$scope.articles[index]){
		console.log("index: " + index);
		$http.get('articles/'+$scope.articleIndex[index]).success(
			function(data){
//				leftToLoad--;
				console.log('loaded article ' + index);
				$scope.articles[index] = data;
				console.log($scope.articles);
//				if(leftToLoad <= 0)
//					articlesLoaded();
			}
		);
		}
	}
	
	$scope.loadArticles = function(count){
		console.log(count);
		for(var x=0; x<count && x<$scope.articleIndex.length; x++)
			$scope.loadArticle(x);
	}

	$http.get(indexPath).success($scope.onLoad);

});
