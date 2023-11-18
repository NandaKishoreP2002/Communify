const { Router } = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const Joi = require('joi');
const { Types } = require("mongoose");
const postmark = require("postmark");
const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);

const userRouter = Router();

const { SECRET_JWT_CODE = "jafha71yeiqquy1#@!" } = process.env;

let verify=0;

userRouter.post("/register", async (req, res) => {
    // console.log("inside userRouter");
    try {
        let { name, email, password} = req.body

        // Input validation
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string()
                .min(8)
                .max(50)
                .required()
                .email(),
            password: Joi.string()
                .min(6)
                .required()
                .max(20)
                .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
                .messages({
                    "string.base": `"password" should be a type of 'text'`,
                    "string.pattern.base": `"password" should have one uppercase, lowercase, digit and special character`,
                    "string.min": `"password" should have min 6 characters`,
                    "string.max": `"password" should have max 20 characters`,
                    "any.required": `"password" is a required field`
                }),
        })

        const { error } = schema.validate({ name, email, password});
        if (error) {
            // console.log("validate error");
            res.status(400).json({ error: error.details[0].message });
        }
        else {
            const user = await User.findOne({ email });
            if (user) {
                // console.log("user already present")
                res.status(400).json({ error: "Email already in use" })
            }
            else {
                const token=email;
                const emailDetails = {
                    "From": "saas.demo@tensorgo.co",
                    "To": email,                // keep req.user._json.email
                    "Subject": "Hello from Communify",
					"HtmlBody": "<strong>Hello</strong> dear Communify user.",                
                    // "Subject": "Verify your email",
                    // "HtmlBody": "<a id='verificationLink' href=`http://localhost:8080/user/verify`>Verify Your Email</a> click the link.",
                    "TextBody": "Hello from Communify!",
                    "MessageStream": "outbound"
                };
                
                // Send the email
                client.sendEmail(emailDetails)
                    .then(response => {
                    console.log("Email sent successfully:", response);
                    })
                    .catch(error => {
                    console.error("Error sending email:", error.message);
                    });
                password = bcrypt.hashSync(password, 10);
                const user = await User.create({ name, email, password});
                res.json(user);
            }
        }
    } catch (error) {
        console.error(" error - ", error);
        res.status(400).json({ error });
    }
});



userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        // Input validation
        const schema = Joi.object({
            email: Joi.string()
                .min(8)
                .max(50)
                .required()
                .email(),
            password: Joi.string()
                .min(6)
                .required()
                .max(20)
                .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
                .messages({
                    "string.base": `"password" should be a type of 'text'`,
                    "string.pattern.base": `"password" should have one uppercase, lowercase, digit and special character`,
                    "string.min": `"password" should have min 6 characters`,
                    "string.max": `"password" should have max 20 characters`,
                    "any.required": `"password" is a required field`
                }),
        })

        const { error } = schema.validate({ email, password });
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        }
        else {
            const user = await User.findOne({ email });
            if (user) {
                // Check if password matches
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    // Generating and sending JWT token for authorization
                    const token = await jwt.sign({ email: user.email }, SECRET_JWT_CODE);
                    res.json({ user, token });
                } else {
                    res.status(400).json({ error: "password doesn't match" });
                }
            } else {
                res.status(400).json({ error: "User doesn't exist" });
            }
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

userRouter.get('/verify', (req, res) => {

    verify=1;


    // const { userId, token } = req.params;
  
    // Find the user in your database based on the userId
    // const user = users.find(u => u.id === userId);
  
    // if (!user) {
    //   return res.status(404).json({ error: 'User not found.' });
    // }
  
    // Check if the provided token matches the user's verification token
    // if (user.verificationToken === token) {
    //   // Mark the user as verified in your database
    //   user.isVerified = true;
  
    //   // Optionally, you can redirect the user to a success page
    //   res.redirect('/verification-success');
    // } else {
    //   // Token doesn't match, handle accordingly (e.g., show an error page)
    //   res.status(400).json({ error: 'Invalid verification token.' });
    // }
  });
  console.log("verify", verify)


module.exports = userRouter