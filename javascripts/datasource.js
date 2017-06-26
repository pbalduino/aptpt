var DataSource = function(url) {
  this._url = url;
  this._items = [];
  this._wait = false;
  this._page = 0;
}

DataSource.prototype.getURL = function() {
  return this._url;
}

DataSource.prototype.next = function() {
  var self = this;

  console.log("fetching", self._items);

  if(self._items.length > 0) {
    console.log('not empty');
    return new Promise(function(res, rej) {
      res(self._items.splice(0, 1)[0]);
    });
  } else {
    self._page++;
    return fetch(self._url + "&page=" + self._page, {method: 'get'})
      .then(function(response) {
        self._wait = false;
        return response.json();
      })
      .then(function(j) {
        self._items = j.photos.photo;
        return self.next();
      });
  }
}
