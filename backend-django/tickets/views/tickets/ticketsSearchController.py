import logging
import traceback

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

from tickets.models import Ticket
from tickets.serializers import TicketListSerializer

from haystack import Pipeline
from haystack.components.retrievers import InMemoryBM25Retriever
from haystack.dataclasses import Document
from haystack.document_stores.in_memory import InMemoryDocumentStore

logger = logging.getLogger(__name__)

@swagger_auto_schema(method="GET", operation_description="BM25 search tickets. Query params: q, category, priority, top_k")
@api_view(["GET"])
def ticketsSearchController(request, **kwargs):
    """
    GET /api/tickets/search/?q=...&category=...&priority=...&top_k=...
    """
    try:
        q = (request.query_params.get("q") or "").strip()
        if not q:
            return Response(
                {"success": True, "data": []},
                status=status.HTTP_200_OK,
            )

        top_k_raw = request.query_params.get("top_k") or "20"
        try:
            top_k = max(1, min(int(top_k_raw), 100))
        except Exception:
            top_k = 20

        qs = Ticket.objects.all().order_by("-created_at")
        priorities = request.query_params.getlist("priority")
        if priorities:
            qs = qs.filter(priority__in=priorities)
            
        categories = request.query_params.getlist("category")
        if categories:
            qs = qs.filter(category__in=categories)

        tickets = list(qs)

        # Build BM25 documents (choose what you want BM25 to match on)
        documents = []
        for t in tickets:
            content = "\n".join(
                [
                    f"subject: {t.subject or ''}",
                    f"from: {t.from_email or ''}",
                    f"message: {t.message or ''}",
                    f"summary: {t.summary or ''}",
                ]
            ).strip()

            documents.append(Document(id=str(t.id), content=content))

        if not documents:
            return Response({"success": True, "data": []}, status=status.HTTP_200_OK)

        doc_store = InMemoryDocumentStore(embedding_similarity_function="cosine")
        doc_store.write_documents(documents)

        retriever = InMemoryBM25Retriever(document_store=doc_store, top_k=top_k)

        pipeline = Pipeline()
        pipeline.add_component("keyword_retriever", retriever)

        result = pipeline.run({"keyword_retriever": {"query": q, "top_k": top_k}})
        
        docs = result["keyword_retriever"]["documents"]

        ordered_ids = [d.id for d in docs if getattr(d, "id", None)]
        if not ordered_ids:
            return Response({"success": True, "data": []}, status=status.HTTP_200_OK)
        ordered_ids_int = [int(x) for x in ordered_ids]

        by_id = Ticket.objects.in_bulk(ordered_ids_int)
        ordered_tickets = [by_id[i] for i in ordered_ids_int if i in by_id]

        data = TicketListSerializer(ordered_tickets, many=True).data
        return Response({"success": True, "data": data}, status=status.HTTP_200_OK)

    except Exception as e:
        logger.error(traceback.format_exc())
        return Response(
            {"success": False, "message": str(e)},
            status=status.HTTP_400_BAD_REQUEST,
        )
