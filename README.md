# City Guide

- Discovery of points of interest in France
- Interactive map navigation
- User reviews
- Administrator management

## Architecture

![image](https://github.com/Amandinelpe/City-Guide/assets/105013857/5aa0d39b-e21e-476d-8a9d-1f0f005fada8)

## DB

### MCD
![mcd](https://github.com/Amandinelpe/City-Guide/assets/105013857/da5c5442-81ab-4dc9-adb1-31394b2c1f2f)

### MLD
![mld](https://github.com/Amandinelpe/City-Guide/assets/105013857/a10fbbd1-8f83-4984-a2b5-fbaf3fd7190d)

### MPD
![mpd](https://github.com/Amandinelpe/City-Guide/assets/105013857/db254df9-c691-4211-b6a3-c84e1a2cb688)

# Setup

## Environement variables

```
cd app # (do the same with server and e2e-tests folders after copying .env like below)
cp .env.example .env
```

And then change variables inside `.env` to match your own environment.
If you ever want to add an environment variable, please add it to `.env.example`.

# Getting started

[Install Docker](https://www.docker.com/products/docker-desktop/) and then :

```sh
npm run dev
```

# First deploy on a Debian 10 - Docker VPS

## 1. Install git

Once you have a SSH prompt on your VPS :

```sh
sudo apt install git-all -y
```

## 2. Clone the repo and cd into it

```sh
mkdir apps && cd apps && git clone https://github.com/Amandinelpe/City-Guide.git && cd City-Guide
```

## 3. Install Docker (no need for Debian 10 with Docker pre-installation)

```sh
sh scripts/install_docker.sh
```

## 4. Configure environment variables

### 4.1 Backend

```sh
cd server && cp .env.sample .env && nano .env
```

Change the JWT secret and adjust other environment variables, then save and close the file.

### 4.2 Backend

```sh
cd app && cp .env.sample .env && nano .env
```

Adjust environment variables, then save and close the file.

## 5. Start the whole app

```sh
npm run start
```

## 6. Init the DB

Exec the migration script :

```sh
docker compose exec city-guide-backend npm run typeorm:run-migration
```

## 7. Install Caddy

```sh
sh scripts/install_caddy.sh
```

## 8. Configure Caddy

```sh
sudo nano /etc/caddy/Caddyfile
```

Like so:

```txt
# frontend
cityguide.duckdns.org {
    reverse_proxy localhost:3000
}

# backend
api-cityguide.duckdns.org {
    reverse_proxy localhost:4001
}
```

Once the config saved, reload Caddy :

```sh
systemctl reload caddy
```

Test that everything works by going to https://cityguide.duckdns.com.
You're done !
