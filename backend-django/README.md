# Smart Support Inbox (Django REST Backend)

Backend for the **Smart Support Inbox** coding challenge: store inbound support tickets, generate deterministic analysis (category, priority, summary, suggested reply), and allow agents to submit feedback (accept/reject).  

## Features

- Create support tickets (subject, sender email, message body)
- Automatic analysis on creation:
  - `category`: Billing | Bug | Feature | Account | Other
  - `priority`: Low | Medium | High
  - `summary`: simple heuristic summary
  - `suggested_reply`: template-based response
- List tickets with filtering by `category` and `priority`
- Retrieve ticket detail
- Submit feedback (`accepted`: true/false + optional comment)
- Swagger / OpenAPI docs via `drf-yasg`
- Unit + integration tests

## API

Base path: `/api/`

```json
{ "success": true, "data": { ... } }
```

List endpoints return `data` as an array.

### Create ticket

`POST /api/tickets/`

Body:
```json
{
  "subject": "Can't login",
  "from_email": "user@example.com",
  "message": "I forgot my password and now I can't access my account."
}
```

### List tickets (with filters)

`GET /api/tickets/?category=Account&priority=High`

### Retrieve ticket

`GET /api/tickets/<id>/`

### Submit feedback

`POST /api/tickets/<id>/feedback/`

Body:
```json
{ "accepted": true, "comment": "Good suggestion" }
```

### Response shape

Responses are wrapped:

```json
{ "success": true, "data": { /* ... */ } }
```

### API docs

- Swagger UI: `/swagger/`
- ReDoc: `/redoc/`

## Setup (local)

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py makemigrations tickets
python manage.py migrate
python manage.py runserver 5000
```

## Run tests

```bash
python manage.py test
```

## Key design decisions

- **Deterministic analysis**: keyword/rule-based logic in `tickets/analysis.py` for predictable tests and easy extension.
- **Single Ticket model**: feedback stored on the `Ticket` as nullable fields (simple and sufficient for the challenge).
- **Validation**:
  - DRF serializers validate inputs (required fields, email format).
  - Analysis outputs are constrained by `choices` fields and covered by tests.
- **Key Design decision**:
  - BM25 search (Haystack) for triage: retrieval-only search box to find similar past tickets. Although it is not full RAG, but it improves agent workflow with minimal complexity.

## Known limitations

- No authentication/authorization.
- Filtering supports exact string matches for `category` and `priority`.
