import logging
import traceback

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema

from tickets.models import Ticket
from tickets.serializers import TicketDetailSerializer


logger = logging.getLogger(__name__)


@swagger_auto_schema(method="GET", operation_description="Retrieve a ticket by id.")
@api_view(["GET"])
def ticketDetailController(request, pk: int, **kwargs):
    """GET /api/tickets/<id>/"""
    if request.method != "GET":
        return Response(
            {"success": False, "message": "HTTP method is invalid."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        ticket = Ticket.objects.get(pk=pk)
        return Response(
            {"success": True, "data": TicketDetailSerializer(ticket).data},
            status=status.HTTP_200_OK,
        )
    except Ticket.DoesNotExist:
        return Response(
            {"success": False, "message": "Ticket not found."},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        logger.error(traceback.format_exc())
        return Response(
            {"success": False, "message": str(e)},
            status=status.HTTP_400_BAD_REQUEST,
        )
