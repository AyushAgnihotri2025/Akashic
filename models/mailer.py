import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from credentials import SENDER_MAIL, SENDER_MAIL_PASSWORD

server = smtplib.SMTP("smtp.gmail.com", 587)
server.ehlo()
server.starttls()
server.ehlo()

class Mailer:
    def __init__(self, sender=SENDER_MAIL, password=SENDER_MAIL_PASSWORD) -> None:
        self.sender = sender
        self.password = password
        
    def send(self, receiver, subject, html, quit=True):
        body = MIMEMultipart('alternative')
        body['Subject'] = subject
        body['From'] = self.sender
        body['To'] = receiver

        body.attach(MIMEText(html, 'html'))

        server.login(self.sender, self.password)
        server.sendmail(self.sender, receiver, body.as_string())

        return True

def mail(mailer, newDob, securityPIN, data):
    welcomeHTML = open(f"./templates/mails/{data['position'].lower()}/welcome.txt").read().format(
        data["name"]
    )
    mailer.send(data["email"], "Welcome to Akashic Institute of Technology 🎉", welcomeHTML)

    credentialsHTML = open("./templates/mails/credentials.txt").read().format(
        data["name"], data["position"], data["username"], newDob, securityPIN, data["position"].lower(), data["position"]
    )
    mailer.send(data["email"], f"Login credentials for Akashic {data['position']} Portal 🔐", credentialsHTML)

    return True