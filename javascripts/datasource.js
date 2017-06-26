var DataSource = function(url) {
  this._url = url;
  this._items = [];
  this._page = 0;
}

DataSource.prototype.getURL = function() {
  return this._url;
}

DataSource.prototype.next = function() {
  var self = this;

  if(self._items.length > 0) {
    return new Promise(function(res, rej) {
      res(self._items.splice(0, 1)[0]);
    });
  } else {
    self._page++;
    return fetch(self._url + "&page=" + self._page, {method: 'get'})
      .then(function(response) {
        return response.json();
      })
      .then(function(j) {
        self._items = j.photos.photo;
        return self.next();
      });
  }
}
