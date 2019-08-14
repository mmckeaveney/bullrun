FROM python:3.7-alpine

ENV ALPHA_VANTAGE_API_KEY=DZ7YZZGUAWDZ4K0C

RUN pip install poetry

WORKDIR /app

COPY poetry.lock pyproject.toml /app/

RUN apk add --no-cache --virtual .build-deps gcc musl-dev libffi-dev openssl-dev python3-dev

RUN poetry install --no-interaction

COPY . /app

CMD ["poetry", "run", "python", "app/__init__.py"]
