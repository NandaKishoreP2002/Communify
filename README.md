# Communify

Developed an application 'Communify' using MongoDb, Express Js, React Js, Node Js and Postmark app.

Created login page, signup page for user login and registration.
Additionally added Google OAuth for users to login and signup easily.

Integrated with Postmark app.

Once the user signup for the first time, a welcome mail will be sent to that particular registered email with the help of Postmark app.

After the user logged in, it redirects to home page that contains the user details, communication history, and an option to compose a mail with the help of Postmark app.

The user can send mail to any user through this platform.

The user can also see the communication history as well including sent and
received emails.


Seperately maintained Frontend and Backend and created endpoints to handle them

For Frontend: Add your Backend url in the environment variables as REACT_APP_API_URL
Perform npm i to install all dependenciess
Go to the root directory and perform npm start to start the Frontend.


For Backend: Add your Google CLIENT_ID, CLIENT_SECRET
Frontend url as CLIENT_URL, Mongodb password as password, and 
your postmark api token as POSTMARK_API_TOKEN

Perform npm i to install all dependencies.
Perform npm start to start the Backend.
