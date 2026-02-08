import re
from dataclasses import dataclass
from typing import Dict, Tuple

from .models import Ticket


@dataclass(frozen=True)
class AnalysisResult:
    category: str
    priority: str
    summary: str
    suggested_reply: str


def _normalize(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "").strip()).lower()


def classify_category(subject: str, message: str) -> str:
    text = _normalize(subject + " " + message)

    rules: Tuple[Tuple[str, str], ...] = (
        ("refund", Ticket.Category.BILLING),
        ("invoice", Ticket.Category.BILLING),
        ("charged", Ticket.Category.BILLING),
        ("payment", Ticket.Category.BILLING),
        ("billing", Ticket.Category.BILLING),

        ("bug", Ticket.Category.BUG),
        ("error", Ticket.Category.BUG),
        ("crash", Ticket.Category.BUG),
        ("broken", Ticket.Category.BUG),
        ("doesn't work", Ticket.Category.BUG),
        ("does not work", Ticket.Category.BUG),

        ("feature request", Ticket.Category.FEATURE),
        ("feature", Ticket.Category.FEATURE),
        ("enhancement", Ticket.Category.FEATURE),
        ("would like", Ticket.Category.FEATURE),

        ("login", Ticket.Category.ACCOUNT),
        ("password", Ticket.Category.ACCOUNT),
        ("account", Ticket.Category.ACCOUNT),
        ("sign in", Ticket.Category.ACCOUNT),
        ("2fa", Ticket.Category.ACCOUNT),
    )

    for keyword, cat in rules:
        if keyword in text:
            return cat
    return Ticket.Category.OTHER


def classify_priority(subject: str, message: str) -> str:
    text = _normalize(subject + " " + message)

    high = (
        "urgent", "asap", "immediately", "can't access", "cannot access", "security", "data loss",
        "charged twice", "payment failed", "crash", "down", "outage",
    )
    medium = ("soon", "issue", "problem", "bug", "error", "not working", "doesn't work", "does not work")

    if any(k in text for k in high):
        return Ticket.Priority.HIGH
    if any(k in text for k in medium):
        return Ticket.Priority.MEDIUM
    return Ticket.Priority.LOW


def summarize(subject: str, message: str, max_len: int = 240) -> str:
    msg = re.sub(r"\s+", " ", (message or "").strip())
    if not msg:
        return (subject or "").strip()[:max_len]
    # first sentence-ish
    parts = re.split(r"(?<=[.!?])\s+", msg)
    base = parts[0] if parts else msg
    summary = base.strip()
    if len(summary) < 30 and len(parts) > 1:
        summary = (summary + " " + parts[1]).strip()
    summary = summary[:max_len].rstrip()
    if len(base) > max_len:
        summary += "…"
    return summary


def suggested_reply(category: str, priority: str, from_email: str) -> str:
    # Simple templates by category/priority
    if category == Ticket.Category.BILLING:
        body = "Thanks for reaching out about billing. Could you share your invoice number and the last 4 digits of the payment method so we can investigate?"
    elif category == Ticket.Category.BUG:
        body = "Thanks for reporting this issue. Could you tell us the steps to reproduce it, and include any error message or screenshot? We'll look into it right away."
    elif category == Ticket.Category.FEATURE:
        body = "Thanks for the suggestion! Could you share a bit more about your use case and what success looks like for you? We'll pass this to the product team."
    elif category == Ticket.Category.ACCOUNT:
        body = "Sorry you're having trouble with your account. Could you confirm the email on the account and any recent changes (password reset, 2FA, device change)? We'll help you regain access."
    else:
        body = "Thanks for contacting support. Could you provide any additional details (screenshots, steps taken, timestamps) so we can assist you faster?"

    if priority == Ticket.Priority.HIGH:
        prefix = "Thanks for flagging this as urgent. We're on it. "
    elif priority == Ticket.Priority.MEDIUM:
        prefix = "Thanks for the details. We'll take a look. "
    else:
        prefix = "Thanks for reaching out. "

    closing = "\n\nBest,\nSupport Team"
    return prefix + body + closing


def analyze_ticket(subject: str, message: str, from_email: str) -> AnalysisResult:
    category = classify_category(subject, message)
    priority = classify_priority(subject, message)
    summary = summarize(subject, message)
    reply = suggested_reply(category, priority, from_email)
    return AnalysisResult(category=category, priority=priority, summary=summary, suggested_reply=reply)
