const fs = require('fs');

fs.readFile('./ad_list.txt', { encoding: 'utf-8' }, (err, ad_list_txt) => {
  var hosts = ad_list_txt
    .split('\n')
    .map(l => l.trim().split(' '))
    .map(r => r[1]);
  var http_host = hosts.map(h => `${h}`).sort();
  var str_http_host = JSON.stringify(http_host, null, 2);

  fs.writeFile('./ad_list.json', str_http_host, { encoding: 'utf-8' }, err => {
    if (err) console.error(err);

    console.log('done');
  });
});
