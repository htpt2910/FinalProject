FROM python:3.10
WORKDIR /code
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
WORKDIR /code
COPY ./app /code/app
EXPOSE 8000
CMD uvicorn app.main:app --host=0.0.0.0 --port=$PORT