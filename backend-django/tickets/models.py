from django.db import models

class Ticket(models.Model):
    class Category(models.TextChoices):
        BILLING = "Billing"
        BUG = "Bug"
        FEATURE = "Feature"
        ACCOUNT = "Account"
        OTHER = "Other"

    class Priority(models.TextChoices):
        LOW = "Low"
        MEDIUM = "Medium"
        HIGH = "High"

    subject = models.CharField(max_length=255)
    from_email = models.EmailField()
    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    category = models.CharField(max_length=20, choices=Category.choices, default=Category.OTHER)
    priority = models.CharField(max_length=10, choices=Priority.choices, default=Priority.LOW)

    summary = models.TextField(blank=True)
    suggested_reply = models.TextField(blank=True)

    # Agent feedback on suggestion usefulness
    feedback_accepted = models.BooleanField(null=True, blank=True)
    feedback_comment = models.TextField(blank=True, default="")
    feedback_at = models.DateTimeField(null=True, blank=True)
