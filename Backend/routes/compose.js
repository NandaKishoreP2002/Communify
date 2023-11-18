const { Router } = require("express")
const jwt = require("jsonwebtoken");
const Mail = require("../models/mailSchema");
const Joi = require('joi');
const { Types } = require("mongoose");
const postmark = require("postmark");
const client = new postmark.ServerClient("bd97f144-faa2-4e72-a501-45c8596fcd7f");

const emailRouter = Router();

const { SECRET_JWT_CODE = "jafha71yeiqquy1#@!" } = process.env;



emailRouter.post("/sendemail", async (req, res) => {
    try {
        let { from, to, subject, message} = req.body

        // Input validation
        const schema = Joi.object({
            to: Joi.string()
                .min(8)
                .max(50)
                .required()
                .email(),
        })

        const { error } = schema.validate({ to});
        if (error) {
            console.log("validate error in email");
            res.status(400).json({ error: error.details[0].message });
        }
        else {
            const emailDetails = {
                "From": "saas.demo@tensorgo.co",
                "To": to,                // keep req.user._json.email                
                "Subject": subject,
                "HtmlBody": message,
                "TextBody": "Hello from Communify!",
                "MessageStream": "outbound"
            };
            
            // Send the email
            client.sendEmail(emailDetails)
                .then(response => {
                    const newMail = new Mail({
                        from: 'saas.demo@tensorgo.co',
                        to: to,
                        subject: subject,
                        message: message,
                        mailtype: 'sent',
                      });
                      
                      // Save the newMail instance to the database
                      newMail.save()
                        .then((result) => {
                          console.log('Mail saved successfully:', result);
                        })
                        .catch((error) => {
                          console.error('Error saving mail:', error);
                        })
                    res.json(response)
                console.log("Email sent successfully:", response);
                })
                .catch(error => {
                console.error("Error sending email:", error.message);
                });
        }
    } catch (error) {
        console.error(" error - ", error);
        res.status(400).json({ error });
    }
});


module.exports = emailRouter