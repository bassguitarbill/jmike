app.directive("homePage", function() {
	return {
		restrict: 'E',
		templateUrl: 'home-page.html'
	}
});

app.directive("newsPage", function() {
	return {
		restrict: 'E',
		templateUrl: 'news-page.html'
	}
});

app.directive("contactPage", function() {
	return {
		restrict: 'E',
		templateUrl: 'contact-page.html'
	}
});
