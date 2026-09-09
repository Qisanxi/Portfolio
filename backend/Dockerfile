FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# PORT env var is injected by AWS App Runner — falls back to 8000 for local Docker.
# App Runner's load balancer injects X-Forwarded-For from a trusted internal
# network, so Slowapi's get_remote_address will see the real visitor IP
# automatically — no --proxy-headers or --forwarded-allow-ips flags needed.
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
