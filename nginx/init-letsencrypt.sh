#!/bin/bash
# Bootstrap Let's Encrypt certificates for the first time.
#
# Solves the chicken-and-egg problem: nginx needs certs to start,
# but certbot needs nginx running to verify the domain.
#
# Usage: sudo bash nginx/init-letsencrypt.sh
# Run from the project root directory.

set -e

# Load DOMAIN and EMAIL from .env
if [ -f .env ]; then
    export $(grep -E '^(DOMAIN|EMAIL)=' .env | xargs)
fi

if [ -z "$DOMAIN" ]; then
    echo "Error: DOMAIN is not set. Add DOMAIN=your-domain.com to .env"
    exit 1
fi

if [ -z "$EMAIL" ]; then
    echo "Error: EMAIL is not set. Add EMAIL=you@example.com to .env"
    exit 1
fi

echo "==> Bootstrapping SSL for $DOMAIN"

rsa_key_size=4096

# 1. Download recommended TLS parameters into the certbot_conf volume
echo "==> Downloading recommended TLS parameters..."
docker compose run --rm --entrypoint "\
    sh -c \"mkdir -p /etc/letsencrypt && \
    wget -q -O /etc/letsencrypt/options-ssl-nginx.conf https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf && \
    wget -q -O /etc/letsencrypt/ssl-dhparams.pem https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem\"" certbot
echo "  Done."

# 2. Create dummy certificate so nginx can start
echo "==> Creating dummy certificate for $DOMAIN..."
docker compose run --rm --entrypoint "\
    sh -c \"mkdir -p /etc/letsencrypt/live/$DOMAIN && \
    openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout /etc/letsencrypt/live/$DOMAIN/privkey.pem \
    -out /etc/letsencrypt/live/$DOMAIN/fullchain.pem \
    -subj '/CN=localhost'\"" certbot
echo "  Done."

# 3. Start nginx
echo "==> Starting nginx..."
docker compose up --force-recreate -d nginx
echo "  Done."

# Wait a moment for nginx to be ready
sleep 5

# 4. Delete dummy certificate
echo "==> Deleting dummy certificate..."
docker compose run --rm --entrypoint "\
    sh -c \"rm -rf /etc/letsencrypt/live/$DOMAIN && \
    rm -rf /etc/letsencrypt/archive/$DOMAIN && \
    rm -rf /etc/letsencrypt/renewal/$DOMAIN.conf\"" certbot
echo "  Done."

# 5. Request real certificate from Let's Encrypt
echo "==> Requesting Let's Encrypt certificate for $DOMAIN..."
docker compose run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
    --email $EMAIL \
    --domain $DOMAIN \
    --domain www.$DOMAIN \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --no-eff-email \
    --force-renewal" certbot
echo "  Done."

# 6. Reload nginx to use the real certificate
echo "==> Reloading nginx..."
docker compose exec nginx nginx -s reload
echo "  Done."

echo ""
echo "==> SSL certificate installed successfully!"
echo "    Your site should now be available at https://$DOMAIN"
