"""Tests for /api/contact — contact form submissions."""
import pytest


@pytest.mark.asyncio
async def test_contact_valid_submission(client):
    """POST /api/contact with all fields should return 200."""
    res = await client.post('/api/contact', json={
        'name': 'Jane Doe',
        'email': 'jane@example.com',
        'message': 'Hi Sandeep, interested in your profile.',
    })
    assert res.status_code == 200
    assert res.json()['success'] is True


@pytest.mark.asyncio
async def test_contact_missing_fields_rejected(client):
    """Each field is required — missing any should 422."""
    res = await client.post('/api/contact', json={
        'name': 'Jane',
        'email': 'jane@example.com',
        # missing message
    })
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_contact_invalid_email_rejected(client):
    """Email must be valid — 'not-an-email' should 422."""
    res = await client.post('/api/contact', json={
        'name': 'Jane',
        'email': 'not-an-email',
        'message': 'hi',
    })
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_contact_empty_name_rejected(client):
    """Whitespace-only name should 400 (the route has an explicit check)."""
    res = await client.post('/api/contact', json={
        'name': '   ',
        'email': 'jane@example.com',
        'message': 'hi',
    })
    # Pydantic accepts '   ' as a valid string, but the route strips and rejects
    assert res.status_code == 400


@pytest.mark.asyncio
async def test_contact_empty_message_rejected(client):
    """Whitespace-only message should 400."""
    res = await client.post('/api/contact', json={
        'name': 'Jane',
        'email': 'jane@example.com',
        'message': '   ',
    })
    assert res.status_code == 400
