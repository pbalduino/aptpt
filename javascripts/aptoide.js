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
  /*
  <div class="cell">
    <div class="image">
      <img src="https://c1.staticflickr.com/3/2166/5813557536_51804db305_q.jpg" />
    </div>
    <div class="info">
      <div class="title">
        Any picture title
      </div>
      <div class="tag-list">
        <div class="tag">tag 1</div>
        <div class="tag">tag 2</div>
        <div class="tag">tag 3</div>
      </div>
    </div>
  </div>
  */

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
  console.log(element.scrollHeight, element.clientHeight);
  for(var l = 0; l < 4; l++) {
    loadData(createCell);
  }
}

var loadData = function(callback) {
  console.log("----");
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&format=json&api_key=a4ae6131c95a2dc1b169b712a18cac28&nojsoncallback=1&per_page=5');

  xhr.onload = function() {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var photos = data.photos;
      var cols = getColumnsByScreenSize();
      var len = photos.photo.length;

      for(var c = 0; c < cols && c < len; c++) {
        callback(photos.photo[c]);
      }

    } else {
      console.error(xhr);
    }
  };
  xhr.send();
}

element.addEventListener("scroll", function() {
  if(element.scrollTop + element.clientHeight >= element.scrollHeight) {
    loadData(createCell);
  }
});

window.onload = fillScreen;

window.onresize = function(event) {
  console.log(event);
}
