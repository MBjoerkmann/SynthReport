# Deploying SynthReport to Google Cloud

Step-by-step guide for deploying the Docker stack (Django + Next.js + nginx + PostgreSQL) on a Google Cloud **e2-small** VM with Let's Encrypt SSL.

**Prerequisites:** A GCP project with billing enabled, `gcloud` CLI installed locally, a domain managed at simply.com (or any DNS provider).

---

## 1. Provision the VM

```bash
# Create the VM (Ubuntu 24.04 LTS, e2-small, 20 GB boot disk)
gcloud compute instances create synthreport \
  --zone=europe-north1-a \
  --machine-type=e2-small \
  --image-family=ubuntu-2404-lts-amd64 \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=20GB \
  --tags=http-server,https-server

# Open HTTP and HTTPS in the firewall
gcloud compute firewall-rules create allow-http \
  --allow=tcp:80 --target-tags=http-server --description="Allow HTTP"

gcloud compute firewall-rules create allow-https \
  --allow=tcp:443 --target-tags=https-server --description="Allow HTTPS"
```

Note the **external IP** from the output (or find it later with `gcloud compute instances describe synthreport --zone=europe-north1-a --format='get(networkInterfaces[0].accessConfigs[0].natIP)'`).

---

## 2. SSH into the VM and install dependencies

```bash
gcloud compute ssh synthreport --zone=europe-north1-a
```

Once connected:

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker Engine (official repo)
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Let your user run docker without sudo
sudo usermod -aG docker $USER
newgrp docker

# Install git
sudo apt install -y git
```

---

## 3. Clone the repo and configure

```bash
cd ~
git clone https://github.com/YOUR_USERNAME/SynthReport.git
cd SynthReport
```

### Root `.env`

```bash
cp .env.example .env
nano .env
```

Set these values:

```
POSTGRES_DB=synthreport
POSTGRES_USER=synthreport
POSTGRES_PASSWORD=<strong-random-password>

DOMAIN=your-domain.com
EMAIL=you@example.com
```

### `Backend/.env`

```bash
nano Backend/.env
```

```
SECRET_KEY=<generate-with: python3 -c "import secrets; print(secrets.token_urlsafe(50))">
DEBUG=False
ALLOWED_HOSTS=your-domain.com,localhost,backend
DJANGO_SECURE=True
CORS_ALLOW_ALL_ORIGINS=False
CORS_ALLOWED_ORIGINS=https://your-domain.com

FIRECRAWL_API_KEY=your-key
OPENAI_API_KEY=your-key
GEMINI_API_KEY=your-key

POSTGRES_DB=synthreport
POSTGRES_USER=synthreport
POSTGRES_PASSWORD=<same-password-as-root-env>
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

---

## 4. DNS setup at simply.com

Log in to simply.com and go to your domain's DNS settings. Add:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `<VM external IP>` | 3600 |
| A | www | `<VM external IP>` | 3600 |

Wait for propagation (usually a few minutes, can take up to an hour). Verify:

```bash
dig +short your-domain.com
# Should return your VM's external IP
```

---

## 5. Get SSL certificate and start

```bash
cd ~/SynthReport

# Bootstrap the Let's Encrypt certificate
sudo bash nginx/init-letsencrypt.sh

# Start all services
docker compose up -d
```

The init script will:
1. Download recommended TLS parameters
2. Create a temporary self-signed cert so nginx can start
3. Start nginx
4. Request a real cert from Let's Encrypt (via HTTP-01 challenge)
5. Reload nginx with the real cert

---

## 6. Post-deploy checks

```bash
# Create a Django superuser
docker compose exec backend python manage.py createsuperuser

# Verify the API
curl -I http://your-domain.com
# Expected: 301 redirect to https://your-domain.com

curl https://your-domain.com/api/
# Expected: {"message": "API is running"}

# Check certificate details
docker compose exec certbot certbot certificates
```

Visit `https://your-domain.com` in a browser — you should see the padlock icon and a valid Let's Encrypt certificate.

---

## 7. Maintenance

### Certificate renewal

Certbot runs automatically every 12 hours inside the `certbot` container. It only renews when the cert is within 30 days of expiry (Let's Encrypt certs last 90 days). No action needed.

To manually test renewal:

```bash
docker compose exec certbot certbot renew --dry-run
```

### Viewing logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f nginx
docker compose logs -f backend
docker compose logs -f certbot
```

### Deploying code updates

```bash
cd ~/SynthReport
git pull
docker compose build
docker compose up -d
```

### Database backups

```bash
# Dump
docker compose exec db pg_dump -U synthreport synthreport > backup_$(date +%Y%m%d).sql

# Restore
cat backup.sql | docker compose exec -T db psql -U synthreport synthreport
```

### Restarting services

```bash
docker compose restart          # all services
docker compose restart backend  # single service
```
