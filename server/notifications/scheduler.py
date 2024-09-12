from apscheduler.schedulers.background import BackgroundScheduler
from datetime import timedelta
from django.utils import timezone
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django.conf import settings
from django.template.loader import render_to_string
from email.mime.image import MIMEImage

from events.models import Event
from rsvp.models import Registration
from .models import Notification


def send_event_reminder(event, user):
    subject = f"Reminder: {event.title}"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [user.email]
    event_local_time = timezone.localtime(event.date_time)

    html_content = render_to_string('reminder.html', {
        'event_title': event.title,
        'username': user.username,
        'event_date_time': event_local_time.strftime('%Y-%m-%d %H:%M'),
        'event_location': event.location,
        'event_description': event.description,
        'current_year': timezone.now().year,
        'cid': 'event_image_cid',
        'event_id': event.id
    })

    # Create notification record
    notification = Notification.objects.create(
        user=user,
        event=event,
        subject=subject,
        message=html_content,
        status='PENDING'
    )

    # Send the email
    try:
        email = EmailMultiAlternatives(subject, strip_tags(
            html_content), from_email, recipient_list)
        email.attach_alternative(html_content, "text/html")

        if event.feature_image:
            with open(event.feature_image.path, 'rb') as img:
                mime_image = MIMEImage(img.read())
                # Set Content-ID for the image
                mime_image.add_header('Content-ID', '<event_image_cid>')
                email.attach(mime_image)

        email.send()

        notification.status = 'SENT'
        notification.sent_at = timezone.now()
    except Exception as e:
        print(f"Error sending email: {e}")
        notification.status = 'FAILED'

    notification.save()


def check_for_event_reminders():
    today = timezone.localtime(timezone.now())
    tomorrow = today + timedelta(days=1)
    events = Event.objects.filter(date_time__date=tomorrow.date())

    for event in events:
        registrations = Registration.objects.filter(event=event)

        for registration in registrations:
            send_event_reminder(event, registration.user)


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(check_for_event_reminders, 'cron', hour=10, minute=30)
    scheduler.start()
