FROM python:3.12-slim
RUN apt-get update && apt-get upgrade -y && apt-get install -y supervisor
COPY backend/requirements.txt /root/backend/requirements.txt
RUN pip install -r /root/backend/requirements.txt
COPY backend /root/backend
COPY frontend /root/frontend
EXPOSE 5000
EXPOSE 8000
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD ["/usr/bin/supervisord"]
