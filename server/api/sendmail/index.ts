export default class Email {
    send = (data) => {
        let helper = require('sendgrid').mail;
        let fromEmail = new helper.Email(data.from);
        let toEmail = new helper.Email(data.to);
        let subject = data.subject;
        let content = new helper.Content('text/plain', data.text);
        let mail = new helper.Mail(fromEmail, subject, toEmail, content);

        let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        let request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });

        sg.API(request, function (error, response) {
            if (error) {
                console.log('Email Error...', response.body);
            }
        });
    }
}