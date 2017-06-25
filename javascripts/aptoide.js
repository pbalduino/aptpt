var InfiniteScroll = function() {

}

var createDiv = function(className) {
  var element = document.createElement("div");
  element.classList.add(className);

  return element;
}

var createCell = function(imageData) {
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
  img.src = "https://c1.staticflickr.com/3/2166/5813557536_51804db305_q.jpg";

  image.appendChild(img);

  var info = createDiv("info");

  var title = createDiv("title");
  title.innerHTML = "Any picture title";

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

var element = document.getElementById("container");

var fillScreen = function() {
  console.log(element.clientWidth, element.scrollWidth, getWindowWidth());
  // var cols = getColumnsByScreenSize();

  var cols = getColumnsByScreenSize();
  while(element.scrollHeight <= element.clientHeight) {
    for(var c = 0; c < cols; c++) {
      createCell();
    }
  }
}

element.addEventListener("scroll", function() {
  if(element.scrollTop + element.clientHeight >= element.scrollHeight) {
    var cols = getColumnsByScreenSize();
    for(var c = 0; c < cols; c++) {
      createCell();
    }    
  }
});

element.addEventListener("resize", function(event) {
  console.log(event);
})

window.onload = fillScreen;

window.onresize = function(event) {
  console.log(event);
}
