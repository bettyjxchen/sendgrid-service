'use strict'

const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId
const sgMail = require('@sendgrid/mail')     
//sendgrid API

module.exports = {
    sendRegistrationEmailConfirmation: _sendRegistrationEmailConfirmation,
}

function _sendRegistrationEmailConfirmation(toEmail, fullName, id, key) {
    //compose elements of email
    let body = _formRegistrationEmailBody(id, key)
    let fromEmail = {'email': process.env.SENDGRID_FROM_EMAIL}
    let subject = `Clicktool Email Confirmation for ${fullName}`
    //send email
    return _sendEmail(toEmail, fromEmail, subject, body.text, body.html, fullName)
}

function _formRegistrationEmailBody(id, key) {
    const origin = process.env.SENDGRID_EMAIL_ORIGIN
    //form original activation link
    let url = `${origin}/auth/users/${id}/confirm-email/${key}`

    let body = {
        text: `Please click this link to register your account.
        ${url}
        If the link does not work, you can copy/paste it into your browser's address bar.`,

        html: `<p class="m-b-5" style="margin: 0;margin-bottom: 5px !important;color: #a8acb1 !important;font-family: Helvetica, Arial, sans-serif;font-weight: normal;padding: 0;text-align: left;line-height: 19px;font-size: 12px;">
        Please click this link to register your account.
        </p>
        </td>
        </tr>
        <tr style="padding: 0;vertical-align: top;text-align: left;">
            <td class="panel" style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 10px !important;vertical-align: top;text-align: left;color: #a8acb1 !important;font-family: Helvetica, Arial, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 12px;background: #1b2024;border: none;border-collapse: collapse !important;">
         <a href="${url}" style="color: #00acac;text-decoration: none;">${url}</a>
         </td>
         </tr>
         <tr style="padding: 0;vertical-align: top;text-align: left;">
             <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0 0 15px 0;vertical-align: top;text-align: left;color: #a8acb1 !important;font-family: Helvetica, Arial, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 12px;border-collapse: collapse !important;">
        <p class="m-b-5" style="margin: 0;margin-bottom: 5px !important;color: #a8acb1 !important;font-family: Helvetica, Arial, sans-serif;font-weight: normal;padding: 0;text-align: left;line-height: 19px;font-size: 12px;">
        If the link does not work, you can copy/paste it into your browser's address bar.
        </p>
        </td>
        </tr>`
    }
    return body
}

function _sendEmail(toEmail, fromEmail, subject, text, html, fullName) {
    //sendgrid email object
    let email = {
        to: toEmail,
        from: fromEmail,
        bcc: process.env.SENDGRID_BCC_EMAIL,
        subject: subject,
        text: text,
        html: html,
        // templateId: process.env.SENDGRID_TEMPLATE,
        substitutions: { "fullName": fullName }
    }

console.log(email)
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    sgMail.setSubstitutionWrappers('==', '==')
    return sgMail.send(email)
        .catch(err => console.log(err.toString()))
}



