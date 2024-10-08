from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings


def send_password_reset_email(email, reset_url):
    subject = 'Password Reset Request'
    html_message = render_to_string(
        'password_reset_email.html', {'reset_url': reset_url})

    plain_message = strip_tags(html_message)
    from_email = settings.EMAIL_HOST_USER

    send_mail(
        subject=subject,
        message=plain_message,
        from_email=from_email,
        recipient_list=[email],
        html_message=html_message,
        fail_silently=False,
    )
