window.onload = function() {
  var photoUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&format=json&api_key=a4ae6131c95a2dc1b169b712a18cac28&nojsoncallback=1&per_page=5";
  var tagUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&format=json&api_key=a4ae6131c95a2dc1b169b712a18cac28&nojsoncallback=1";

  var element = document.getElementById("container");
  var source = new DataSource(photoUrl);
  var tagLoader = new TagLoader(tagUrl);

  var scroller = new InfiniteScroller(element, source, tagLoader);
  scroller.start();
};
