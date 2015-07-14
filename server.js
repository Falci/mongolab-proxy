var express = require('express'),
  util = require('util'),
  request = require('request'),

  API_KEY = process.env.MONGOLAB_API_KEY;

app = express()
  .set('port', (process.env.PORT || 5000))

  // fork me
  .get('/', function(req, res) {
    res.redirect('https://github.com/Falci/mongolab-proxy');
  })

  // proxy
  .use('/:database/:collection', function(req, res) {
    var url = util.format('https://api.mongolab.com/api/1/databases/%s/collections/%s?apiKey=%s', 
      req.params.database, 
      req.params.collection,
      API_KEY);

    req.pipe(request(url)).pipe(res);
  });

app.listen(app.get('port'), function(){
  console.log('Ready on', app.get('port'));
});