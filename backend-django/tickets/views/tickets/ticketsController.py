import logging
import traceback

from django.db import transaction

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema

from tickets.analysis import analyze_ticket
from tickets.models import Ticket
from tickets.serializers import (
    TicketCreateSerializer,
    TicketListSerializer,
    TicketDetailSerializer,
)


logger = logging.getLogger(__name__)


@swagger_auto_schema(method="GET", operation_description="List tickets. Supports filtering by category and priority via query params.")
@swagger_auto_schema(method="POST", operation_description="Create a ticket and run analysis (category, priority, summary, suggested reply).")
@api_view(["GET", "POST"])
def ticketsController(request, **kwargs):
    """\
    GET  /api/tickets/?category=&priority=
    POST /api/tickets/
    """
    try:
        if request.method == "GET":
            qs = Ticket.objects.all().order_by("-created_at")
            priorities = request.query_params.getlist("priority")
            if priorities:
                qs = qs.filter(priority__in=priorities)
                
            categories = request.query_params.getlist("category")
            if categories:
                qs = qs.filter(category__in=categories)

            data = TicketListSerializer(qs, many=True).data
            return Response({"success": True, "data": data}, status=status.HTTP_200_OK)

        if request.method == "POST":
            serializer = TicketCreateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            with transaction.atomic():
                ticket = Ticket.objects.create(
                    subject=serializer.validated_data["subject"],
                    from_email=serializer.validated_data["from_email"],
                    message=serializer.validated_data["message"],
                )

                analysis = analyze_ticket(ticket.subject, ticket.message, ticket.from_email)
                ticket.category = analysis.category
                ticket.priority = analysis.priority
                ticket.summary = analysis.summary
                ticket.suggested_reply = analysis.suggested_reply
                ticket.save(update_fields=["category", "priority", "summary", "suggested_reply"])

            return Response(
                {"success": True, "data": TicketDetailSerializer(ticket).data},
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {"success": False, "message": "HTTP method is invalid."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    except Exception as e:
        logger.error(traceback.format_exc())
        return Response(
            {"success": False, "message": str(e)},
            status=status.HTTP_400_BAD_REQUEST,
        )
