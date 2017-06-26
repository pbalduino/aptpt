var DataSource = function(url) {
  this._url = url;
  this._photos = [];
  this._wait = false;
  this._page = 0;
}

DataSource.prototype.getURL = function() {
  return this._url;
}

DataSource.prototype.getPhotos = function() {
  return this._photos;
}

DataSource.prototype.setPhotos = function(photos) {
  this._photos.items = photos;
}

DataSource.prototype.next = function() {
  var self = this;

  console.log("fetching", self._photos);

  if(self._photos.length > 0) {
    console.log('not empty');
    return new Promise(function(res, rej) {
      console.log('pr', self._photos);
      res(self._photos.splice(0, 1)[0]);
    });
  } else {
    self._page++;
    return fetch(self._url + "&page=" + self._page, {method: 'get'})
      .then(function(response) {
        self._wait = false;
        return response.json();
      })
      .then(function(j) {
        self._photos = j.photos.photo;
        return self.next();
      });
  }
}

var loadData = function(callback) {
  var cols = getColumnsByScreenSize();

  for(var c = 0; c < cols; c++) {
    source.next().then(function(data) {
      console.log("data", data);
      callback(data);
    });
  }
}

var source = new DataSource("https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&format=json&api_key=a4ae6131c95a2dc1b169b712a18cac28&nojsoncallback=1&per_page=5");
console.log("source", source);
var element = document.getElementById("container");

var createDiv = function(className) {
  var element = document.createElement("div");
  element.classList.add(className);

  return element;
}

var cropText = function(text) {
  if(text.length > 20) {
    return text.substring(0, 20) + "...";
  } else if(text.trim() === ""){
    return "[No title]";
  } else {
    return text;
  }
}

var createCell = function(imageData) {
  console.log(imageData);

  var cell = createDiv("cell");

  var image = createDiv("image");

  var img = document.createElement("img");
  img.src = "https://c" + imageData.farm
    + ".staticflickr.com/" + imageData.server
    + "/" + imageData.id
    + "_" + imageData.secret
    + "_q.jpg";

  image.appendChild(img);

  var info = createDiv("info");

  var title = createDiv("title");
  title.innerHTML = cropText(imageData.title);

  var tagList = createDiv("tag-list");

  for (var t = 0; t < 3; t++) {
    var tag = createDiv("tag");
    tag.innerHTML = "Tag " + (t + 1);
    tagList.appendChild(tag);
  }

  info.appendChild(title);
  info.appendChild(tagList);

  cell.appendChild(image);
  cell.appendChild(info);

  element.appendChild(cell);
}

var getWindowWidth = function() {
  if (self.innerWidth) {
    return self.innerWidth;
  }

  if (document.documentElement && document.documentElement.clientWidth) {
    return document.documentElement.clientWidth;
  }

  if (document.body) {
    return document.body.clientWidth;
  }
}

var getColumnsByScreenSize = function() {
  var width = getWindowWidth();

  if(width < 800) {
    return 1;
  } else if(width <= 1200) {
    return 2;
  } else {
    return 3;
  }
}

var fillScreen = function() {
  source.next().then(function(data) {
    for(var l = 0; l < 4; l++) {
      loadData(createCell);
    }
  });
}

element.addEventListener("scroll", function() {
  if(element.scrollTop + element.clientHeight >= element.scrollHeight) {
    loadData(createCell);
  }
});

window.onload = fillScreen;
