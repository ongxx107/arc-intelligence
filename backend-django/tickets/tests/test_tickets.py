from django.urls import reverse
from rest_framework.test import APITestCase

from tickets.models import Ticket
from tickets.analysis import analyze_ticket


class TicketUnitTests(APITestCase):
    def test_analysis_output_valid(self):
        res = analyze_ticket("Refund request", "I was charged twice, please refund.", "a@gmail.com")
        self.assertIn(res.category, [c for c, _ in Ticket.Category.choices])
        self.assertIn(res.priority, [p for p, _ in Ticket.Priority.choices])
        self.assertTrue(res.summary)
        self.assertTrue(res.suggested_reply)

    def test_ticket_creation_via_api(self):
        payload = {
            "subject": "App crashes on launch",
            "from_email": "user@gmail.com",
            "message": "The app crashes immediately after I open it. Urgent!"
        }
        resp = self.client.post("/api/tickets/", payload, format="json")
        self.assertEqual(resp.status_code, 201)
        body = resp.json()
        self.assertTrue(body.get("success"))
        data = body["data"]
        self.assertEqual(data["subject"], payload["subject"])
        self.assertEqual(data["from_email"], payload["from_email"])
        self.assertEqual(data["category"], Ticket.Category.BUG)
        self.assertEqual(data["priority"], Ticket.Priority.HIGH)
        self.assertTrue(data["summary"])
        self.assertTrue(data["suggested_reply"])


class TicketFeedbackTests(APITestCase):
    def test_feedback_persistence(self):
        t = Ticket.objects.create(subject="Billing issue", from_email="u@gmail.com", message="charged twice")
        # simulate analysis persisted
        t.category = Ticket.Category.BILLING
        t.priority = Ticket.Priority.HIGH
        t.summary = "charged twice"
        t.suggested_reply = "..."
        t.save()

        resp = self.client.post(f"/api/tickets/{t.id}/feedback/", {"accepted": False, "comment": "Not relevant"}, format="json")
        self.assertEqual(resp.status_code, 200)
        t.refresh_from_db()
        self.assertEqual(t.feedback_accepted, False)
        self.assertEqual(t.feedback_comment, "Not relevant")
        self.assertIsNotNone(t.feedback_at)


class TicketIntegrationFlowTests(APITestCase):
    def test_end_to_end_flow(self):
        # create
        payload = {"subject": "Can't login", "from_email": "x@gmail.com", "message": "I cannot access my account, password reset fails."}
        create = self.client.post("/api/tickets/", payload, format="json")
        self.assertEqual(create.status_code, 201)
        ticket_id = create.json()["data"]["id"]

        # list
        lst = self.client.get("/api/tickets/")
        self.assertEqual(lst.status_code, 200)
        lst_body = lst.json()
        self.assertTrue(lst_body.get("success"))
        self.assertTrue(any(t["id"] == ticket_id for t in lst_body["data"]))

        # retrieve
        detail = self.client.get(f"/api/tickets/{ticket_id}/")
        self.assertEqual(detail.status_code, 200)
        detail_body = detail.json()
        self.assertTrue(detail_body.get("success"))
        self.assertEqual(detail_body["data"]["id"], ticket_id)

        # feedback
        fb = self.client.post(f"/api/tickets/{ticket_id}/feedback/", {"accepted": True}, format="json")
        self.assertEqual(fb.status_code, 200)
        fb_body = fb.json()
        self.assertTrue(fb_body.get("success"))
        self.assertEqual(fb_body["data"]["feedback_accepted"], True)
