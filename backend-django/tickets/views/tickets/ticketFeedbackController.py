import logging
import traceback

from django.utils import timezone

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema

from tickets.models import Ticket
from tickets.serializers import TicketDetailSerializer, TicketFeedbackSerializer


logger = logging.getLogger(__name__)


@swagger_auto_schema(method="POST", operation_description="Submit agent feedback for suggested reply (accept/reject).")
@api_view(["POST"])
def ticketFeedbackController(request, pk: int, **kwargs):
    """POST /api/tickets/<id>/feedback/"""
    if request.method != "POST":
        return Response(
            {"success": False, "message": "HTTP method is invalid."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        ticket = Ticket.objects.get(pk=pk)
    except Ticket.DoesNotExist:
        return Response(
            {"success": False, "message": "Ticket not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    try:
        serializer = TicketFeedbackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ticket.feedback_accepted = serializer.validated_data["accepted"]
        ticket.feedback_comment = serializer.validated_data.get("comment", "")
        ticket.feedback_at = timezone.now()
        ticket.save(update_fields=["feedback_accepted", "feedback_comment", "feedback_at"])

        return Response(
            {"success": True, "data": TicketDetailSerializer(ticket).data},
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        logger.error(traceback.format_exc())
        return Response(
            {"success": False, "message": str(e)},
            status=status.HTTP_400_BAD_REQUEST,
        )
