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

app.controller("articleLoader",function($scope) {

	$scope.articleIndex = [];
	$scope.indexLoaded = false;
	$scope.articles = [];

	indexPath = 'articles/index.json';
	$scope.onLoad = function(data) {
		$scope.indexLoaded = true;
		$scope.articleIndex = data.articles.sort().reverse();
		$scope.loadArticles();
	}
	
	$scope.loadArticles = function(){
		var leftToLoad = $scope.articleIndex.length;
		function loadArticle(index){
			$.get('articles/'+$scope.articleIndex[index],
				function(data){
					leftToLoad--;
					$scope.articles[index] = data;
					if(leftToLoad <= 0)
						articlesLoaded();
				}
			);
		}
		for(var x=0; x<$scope.articleIndex.length; x++)
			loadArticle(x);
	}

	function articlesLoaded(){
		console.log('Done loading articles!');
	}

	$.get(indexPath,$scope.onLoad);

});
