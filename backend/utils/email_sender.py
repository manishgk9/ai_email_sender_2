import os
from dotenv import load_dotenv
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
FROM_EMAIL = os.getenv("FROM_EMAIL", SMTP_USER)
FROM_NAME = os.getenv("FROM_NAME", "Ai Email Sender")

async def send_email_smtp(subject: str, body: str, recipients: list):
    if not SMTP_USER or not SMTP_PASS:
        raise RuntimeError("SMTP credentials not set")

    conf = ConnectionConfig(
    MAIL_USERNAME=SMTP_USER,
    MAIL_PASSWORD=SMTP_PASS,
    MAIL_FROM=SMTP_USER,
    MAIL_FROM_NAME=FROM_NAME,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT=SMTP_PORT,
    MAIL_STARTTLS=True,      
    MAIL_SSL_TLS=False,    
    USE_CREDENTIALS=True
)

    message = MessageSchema(
        subject=subject,
        recipients=recipients,
        body=body,
        subtype="html"
    )

    fm = FastMail(conf)
    await fm.send_message(message)
