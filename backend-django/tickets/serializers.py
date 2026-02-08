from rest_framework import serializers
from .models import Ticket


class TicketCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ("id", "subject", "from_email", "message", "created_at", "category", "priority", "summary", "suggested_reply",
                  "feedback_accepted", "feedback_comment", "feedback_at")
        read_only_fields = ("id", "created_at", "category", "priority", "summary", "suggested_reply",
                            "feedback_accepted", "feedback_comment", "feedback_at")


class TicketListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ("id", "subject", "category", "priority", "created_at")


class TicketDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ("id", "subject", "from_email", "message", "created_at", "category", "priority", "summary", "suggested_reply",
                  "feedback_accepted", "feedback_comment", "feedback_at")


class TicketFeedbackSerializer(serializers.Serializer):
    accepted = serializers.BooleanField()
    comment = serializers.CharField(required=False, allow_blank=True, max_length=2000)
