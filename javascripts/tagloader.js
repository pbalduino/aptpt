function TagLoader(url) {
  this._url = url;
}

TagLoader.prototype.getTags = function(id) {
  return fetch(this._url + "&photo_id=" + id)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      return new Promise(function(resolve, reject) {
        resolve(json.photo.tags.tag);
      });
    });
}
