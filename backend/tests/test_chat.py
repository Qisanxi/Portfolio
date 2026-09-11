"""Tests for /api/chat — request validation only (Gemini is mocked)."""
import pytest


@pytest.mark.asyncio
async def test_chat_returns_response(client, mock_gemini):
    """POST /api/chat with valid body should return a response string."""
    res = await client.post('/api/chat', json={
        'message': 'What projects has Sandeep built?',
        'history': [],
        'identity': 'recruiter',
    })
    assert res.status_code == 200
    data = res.json()
    assert 'response' in data
    assert isinstance(data['response'], str)
    assert len(data['response']) > 0


@pytest.mark.asyncio
async def test_chat_empty_message_rejected(client):
    """Empty message body should 422 (min_length=1 on the field)."""
    res = await client.post('/api/chat', json={
        'message': '',
        'history': [],
    })
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_chat_missing_message_rejected(client):
    """Missing message field should 422."""
    res = await client.post('/api/chat', json={'history': []})
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_chat_message_too_long_rejected(client):
    """Message longer than 2000 chars should 422 — protects Gemini quota."""
    res = await client.post('/api/chat', json={
        'message': 'x' * 2001,
        'history': [],
    })
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_chat_identity_baked_into_response(client, mock_gemini):
    """The mock returns 'identity=X' — confirm the identity field is plumbed
    through to the AI service.
    """
    res = await client.post('/api/chat', json={
        'message': 'hi',
        'history': [],
        'identity': 'student',
    })
    assert res.status_code == 200
    assert 'identity=student' in res.json()['response']
