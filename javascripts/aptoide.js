window.onload = function() {
  var element = document.getElementById("container");
  var source = new DataSource("https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&format=json&api_key=a4ae6131c95a2dc1b169b712a18cac28&nojsoncallback=1&per_page=5");

  var scroller = new InfiniteScroller(element, source);
  scroller.start();
};
