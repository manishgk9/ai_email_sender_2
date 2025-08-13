from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List
import resend

import os

from utils.gimini import generate_email_from_prompt
from utils.email_sender import  send_email_smtp
resend.api_key = os.getenv('EMAIL_TOKEN')
router = APIRouter()

class GenerateRequest(BaseModel):
    prompt: str
    recipients: List[EmailStr] = []

class GenerateResponse(BaseModel):
    subject: str
    body: str

class SendRequest(BaseModel):
    subject: str
    body: str
    recipients: List[EmailStr]


# sending prompt ot gimini...
@router.post("/generate", response_model=GenerateResponse)
async def generate(req: GenerateRequest):
    try:
        resp = generate_email_from_prompt(req.prompt)
        return resp
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# sending email to someone
@router.post("/send")
async def send(req: SendRequest):
    try:
        await send_email_smtp(subject=req.subject, body=req.body, recipients=req.recipients)
        return {"ok": True, "message": "Sent"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/test")
def send_mail(req:SendRequest):
    try:
        params: resend.Emails.SendParams = {
        "from": 'Acme <onboarding@resend.dev>',
        "to": req.recipients,
        "subject": req.subject,
        "html": req.body,
        }
        email: resend.Email = resend.Emails.send(params)
        
        return {'status':'ok','email':'sent'}
    
    except Exception as e:
        return {'status':'failed','email':'not sent','error':e}