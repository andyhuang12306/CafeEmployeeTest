FROM python:3.10

WORKDIR /backend

COPY ./requirements.txt /backend/app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /backend/app/requirements.txt

COPY ./app /backend/app

CMD [ "fastapi", "run", "/backend/app/main.py" ]
