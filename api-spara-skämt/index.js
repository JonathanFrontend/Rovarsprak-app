const http = require('http');
const fs = require('fs/promises');
const jokesJson = require('./jokes.json');
const jokes = jokesJson;

const app = http.createServer();
app.listen(4000);

app.on('request', (req, res)=> {
    console.log('Ett request hände')
    console.log(req.url)

    if (req.method === 'GET') {
        //const data = await fs.readFile('./jokes.txt');
        //const jokesArr = await data.toString().split('\n');
        switch(req.url){
            case '/jokes':
                res.writeHead(200).end(JSON.stringify(jokes));
                break;
            case '/random':
                //const randomJoke = jokesArr[Math.floor(Math.random()*jokesArr.length)];
                res.writeHead(200).end(JSON.stringify(jokes[Math.floor(Math.random()*jokes.length)]));
                break;
            default :
                res.writeHead(404).send('404 failed');
                
        }
    } else if (req.method === 'POST') {
        switch(req.url){
            case '/jokes':
                req.on('data', (data) => {
                    const resp = data.toString();
                    const obj = JSON.parse(resp);
                    jokes.push(obj);
                    res.writeHead(200).end(`Postade ${obj.joke}`)
                    console.log(jokes);
                })
                break;
            default :
                res.writeHead(404).send('404 failed');
                
    }}
});
