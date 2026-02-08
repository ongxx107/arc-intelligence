from django.urls import path
from .views.tickets import *

urlpatterns = [
    path("tickets/", ticketsController, name="tickets"),
    path("tickets/<int:pk>/", ticketDetailController, name="ticketDetail"),
    path("tickets/<int:pk>/feedback/", ticketFeedbackController, name="ticketFeedback"),
    path("tickets/search/", ticketsSearchController, name="ticketsSearch"),
]
