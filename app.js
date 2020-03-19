const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 80 });
var clientMap = {}
wss.on('connection', function connection(ws) {
    console.log(`new client ${ws}`);
    ws.on('message', function incoming(message) {
        var decoded = Buffer.from(message, 'base64').toString()
        var msg = JSON.parse(decoded)
        switch (msg.type) {
            case 'new_msg':
                var clients = clientMap[msg.to]
                if (clients) {
                     clients.forEach(function each(client) {
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            var data = Buffer.from(decoded).toString('base64')
                            client.send(data)
                        }
                    });
                }
                break;
            case 'reg':
                var clients = clientMap[msg.userid] || []
                clients.push(ws)
                clientMap[msg.userid] = clients
                console.log(`Register new client for user ${msg.userid}`);
                break;
            default:
                break;
        }
    });
});