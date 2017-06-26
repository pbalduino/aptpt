InfiniteScroller = function(element, dataSource) {
  this._element = element;
  this._source = dataSource;
}

InfiniteScroller.prototype.loadData = function(callback) {
  var cols = this.getColumnsByScreenSize();

  for(var c = 0; c < cols; c++) {
    this._source.next().then(function(data) {
      callback(data);
    });
  }
}

InfiniteScroller.prototype.createDiv = function(className) {
  var element = document.createElement("div");
  element.classList.add(className);

  return element;
}

InfiniteScroller.prototype.cropText = function(text) {
  if(text.length > 20) {
    return text.substring(0, 20) + "...";
  } else if(text.trim() === ""){
    return "[No title]";
  } else {
    return text;
  }
}

InfiniteScroller.prototype.createCell = function(imageData) {
  var cell = this.createDiv("cell");

  var image = this.createDiv("image");

  var img = document.createElement("img");
  img.src = "https://c" + imageData.farm
    + ".staticflickr.com/" + imageData.server
    + "/" + imageData.id
    + "_" + imageData.secret
    + "_q.jpg";

  image.appendChild(img);

  var info = this.createDiv("info");

  var title = this.createDiv("title");
  title.innerHTML = this.cropText(imageData.title);

  var tagList = this.createDiv("tag-list");

  for (var t = 0; t < 3; t++) {
    var tag = this.createDiv("tag");
    tag.innerHTML = "Tag " + (t + 1);
    tagList.appendChild(tag);
  }

  info.appendChild(title);
  info.appendChild(tagList);

  cell.appendChild(image);
  cell.appendChild(info);

  this._element.appendChild(cell);
}

InfiniteScroller.prototype.getWindowWidth = function() {
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

InfiniteScroller.prototype.getColumnsByScreenSize = function() {
  var width = this.getWindowWidth();

  if(width < 800) {
    return 1;
  } else if(width <= 1200) {
    return 2;
  } else {
    return 3;
  }
}

InfiniteScroller.prototype.fillScreen = function() {
  var self = this;

  self._source.next().then(function(data) {
    for(var l = 0; l < 4; l++) {
      self.loadData(function(data){ self.createCell(data) });
    }
  });
}

InfiniteScroller.prototype.start = function() {
  var self = this;
  var element = self._element;

  element.addEventListener("scroll", function() {
    if(element.scrollTop + element.clientHeight >= element.scrollHeight) {
      self.loadData(function(data) { self.createCell(data) });
    }
  });

  self.fillScreen();
}
