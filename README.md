# ws_server

## Setup
### Install nodejs ([full instructions](https://github.com/nodesource/distributions/blob/master/README.md)):
```bash
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs
```
### Pull ws server
```bash
git clone https://github.com/speshiou/ws_server.git
```
### Install dependencies
```bash
npm run setup
```
### Start ws server
```bash
node app.js
```
## Maintenance
Update nodejs
```
apt-get update nodejs
```
Update npm
```
npm update npm -g
```
Update ws server
```
git pull --rebase
systemctl restart ws_server
```
## Run as Service
Create `ws_server.service` file with the following content:
```bash
[Unit]
Description=WebSocket Server

[Service]
ExecStart=/usr/bin/node /path/to/ws_server/app.js
Restart=always
User=root
Group=nogroup
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/path/to/ws_server

[Install]
WantedBy=multi-user.target
```
Copy `ws_server.service` into `/etc/systemd/system`, and use the following commands to manage the service:
```bash
# Start service
systemctl start ws_server
# Enable the service to run on boot
systemctl enable ws_server
# Check if the service started successfully
journalctl -u ws_server
# Reload service configurations
systemctl daemon-reload
# Show the service status and the output from the service
systemctl status ws_server
```
