const router = require("express").Router();
const passport = require("passport");
const dotenv = require('dotenv');
const GoogleUser = require("../models/googleUserSchema");

dotenv.config();
const postmark = require("postmark");
const client = new postmark.ServerClient("bd97f144-faa2-4e72-a501-45c8596fcd7f");

router.get("/login/success", (req, res) => {
	if (req.user) {

		let email = req.user._json.email;
		let name = req.user._json.name;
		let googleId = req.user.id;

		GoogleUser.findOne({ email })
		.then((googleuser) => {

			if (googleuser) {
			console.log("already sign up");
			} else {
				GoogleUser.create({ name, email, googleId })
				.then((newGoogleUser) => {

					const emailDetails = {
						"From": "saas.demo@tensorgo.co",
						"To": req.user._json.email,                // keep req.user._json.email                
						"Subject": "Hello from Communify",
						"HtmlBody": "<strong>Hello</strong> dear Communify user.",
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

				// console.log("New user created:");
				// res.json(newGoogleUser);
				})
				.catch((createError) => {
				console.error("Error creating entry in MongoDB:", createError);
				});
			}
		})
		.catch((findError) => {
			console.error("Error finding user in MongoDB:", findError);
		});


		// ______________________
		// const emailDetails = {
		// 	"From": "saas.demo@tensorgo.co",
			// "To": "saas.demo@tensorgo.co",                // keep req.user._json.email                
		// 	"Subject": "Hello from Postmark",
		// 	"HtmlBody": "<strong>Hello</strong> dear Postmark user.",
		// 	"TextBody": "Hello from Postmark!",
		// 	"MessageStream": "outbound"
		//   };
		  
		//   // Send the email
		//   client.sendEmail(emailDetails)
		// 	.then(response => {
		// 	  console.log("Email sent successfully:", response);
		// 	})
		// 	.catch(error => {
		// 	  console.error("Error sending email:", error.message);
		// 	});


		// ____________________

		//console.log("user id", req.user.id);
		//console.log("user mail", req.user._json.email);
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: true, message: 'Error during logout' });
        }
        // Redirect after logout
        res.redirect(process.env.CLIENT_URL);
    });
});


module.exports = router;