const fs = require('fs');
const http = require('http');
const {convertText} = require('./convertText')

const app = http.createServer();

app.listen(5050);

app.on('request', (req, res) => {
    console.log('En request gjordes');
    if(req.url === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err){
                console.log(err);
            } else {
                console.log(data)
                res.writeHead(200).end(data);
            }
        });
    } else if(req.method === 'POST' && req.url === '/text') {
        req.on('data', (data) => {
            console.log('Data: ', data);
            const resp = data.toString();
            console.log('Resp: ', resp);
            const convertedWord = convertText(resp);
            /*  Datan måste skickas tillbaka i et JSON-onjekt i string  */
            res.writeHead(200).end( JSON.stringify({text: convertedWord}) );
            //const obj = JSON.parse(resp);
            //console.log(obj, 'Hej');
            //console.log(obj.text);
            //res.end(obj.text);
        });
    } else {
        console.log('Waiting...')
    }
});