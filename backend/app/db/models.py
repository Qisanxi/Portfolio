from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.db.session import Base

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class SubscribedVisitor(Base):
    """Visitors who self-identified in the chat onboarding and optionally
    left an email. Used to send 'new milestone added' notifications.

    The `subscribed` flag lets a visitor opt out without deleting their row
    (so we keep aggregate analytics like total visitor count).
    """
    __tablename__ = "subscribed_visitors"

    id = Column(Integer, primary_key=True, index=True)
    identity = Column(String(20), nullable=False)         # recruiter | student | friend
    name = Column(String(100), nullable=True)              # optional
    email = Column(String(255), nullable=True, index=True) # optional, unique if provided
    subscribed = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())