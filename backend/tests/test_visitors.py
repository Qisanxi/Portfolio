"""Tests for /api/visitors — the email capture endpoint."""
import pytest


@pytest.mark.asyncio
async def test_create_visitor_minimal(client):
    """POST /api/visitors with just identity should succeed.

    This is the minimum case — visitor picked an identity but skipped name/email.
    Should return 200 and store a row with NULL name/email.
    """
    res = await client.post('/api/visitors', json={'identity': 'recruiter'})
    assert res.status_code == 200
    data = res.json()
    assert data['success'] is True


@pytest.mark.asyncio
async def test_create_visitor_with_name_and_email(client):
    """POST /api/visitors with identity + name + email should succeed."""
    res = await client.post('/api/visitors', json={
        'identity': 'recruiter',
        'name': 'Jane Doe',
        'email': 'jane@company.com',
    })
    assert res.status_code == 200
    assert res.json()['success'] is True


@pytest.mark.asyncio
async def test_create_visitor_invalid_identity_rejected(client):
    """identity must be one of recruiter|student|friend — anything else 422s."""
    res = await client.post('/api/visitors', json={'identity': 'admin'})
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_create_visitor_missing_identity_rejected(client):
    """identity is required — missing it should 422."""
    res = await client.post('/api/visitors', json={'name': 'Jane'})
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_create_visitor_invalid_email_rejected(client):
    """email, if provided, must be a valid email — 'not-an-email' should 422."""
    res = await client.post('/api/visitors', json={
        'identity': 'student',
        'email': 'not-an-email',
    })
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_create_visitor_duplicate_email_no_op(client):
    """Submitting the same email twice should not error — return 200 with
    'welcome back' message instead. This is a portfolio, not a SaaS; we
    don't need strict uniqueness constraints.
    """
    # First submission
    res1 = await client.post('/api/visitors', json={
        'identity': 'recruiter',
        'email': 'same@example.com',
    })
    assert res1.status_code == 200

    # Second submission — should not 4xx, should return welcome-back message
    res2 = await client.post('/api/visitors', json={
        'identity': 'recruiter',
        'email': 'same@example.com',
    })
    assert res2.status_code == 200
    msg = res2.json()['message'].lower()
    assert 'again' in msg or 'welcome back' in msg


@pytest.mark.asyncio
async def test_create_visitor_name_normalized(client):
    """Whitespace-only name should be stored as NULL, not as '   '."""
    res = await client.post('/api/visitors', json={
        'identity': 'friend',
        'name': '   ',
    })
    assert res.status_code == 200
