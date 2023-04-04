https://www.howtogeek.com/devops/how-to-create-and-use-self-signed-ssl-on-nginx/

```bash
sudo apt-get install openssl

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx.key -out /etc/ssl/certs/nginx.crt

fill in the Common Name with the server address
```

```bash
# Just for development. Use 4096 instead when security is important.
sudo openssl dhparam -out /etc/nginx/dhparam.pem 256
```

```bash

```

