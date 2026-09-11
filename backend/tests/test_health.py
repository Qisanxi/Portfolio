"""Tests for /api/health — the pre-warm endpoint."""
import pytest


@pytest.mark.asyncio
async def test_health_returns_ok(client):
    """GET /api/health should return 200 with {status: ok}.

    This is the endpoint the frontend pings on page load to wake Render's
    sleeping backend. It must be fast and never require DB access.
    """
    res = await client.get('/api/health')
    assert res.status_code == 200
    data = res.json()
    assert data['status'] == 'ok'


@pytest.mark.asyncio
async def test_health_root_alias(client):
    """GET /health (no /api prefix) should also return 200.

    Render's default health check probes /health, not /api/health. We
    expose the same handler at the root level so Render's deploy doesn't
    show as 'unhealthy' even though the app is running fine.
    """
    res = await client.get('/health')
    assert res.status_code == 200
    assert res.json()['status'] == 'ok'


@pytest.mark.asyncio
async def test_health_not_rate_limited(client):
    """Hitting /api/health 20 times in a row should all return 200.

    The frontend fires this on every page load, so the rate limiter would
    need to be very high to be useful — and would just add noise to logs.
    The route has no @limiter.limit decorator; this test confirms that.
    """
    for _ in range(20):
        res = await client.get('/api/health')
        assert res.status_code == 200, 'Health check should not be rate-limited'
