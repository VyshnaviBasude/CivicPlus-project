Event Management System
A simple React-based application for managing events. Users can view a list of events, add new events, view detailed information for each event, and delete events.

Features
View Events: See a list of events with details like title, description, start date, and end date.
Add New Event: Create a new event by filling out a form with a title, description, and dates.
View Event Details: Click to view more information about an event in a popup modal.
Delete Event: Remove events from the list with a confirmation.


Technologies Used
React: Frontend framework.
Ant Design: UI components.
Axios: HTTP client for API requests.


Getting Started

Extract the zip folder or Clone the Git repository

Set up environment variables: Create a .env file in the root and add:

REACT_APP_BASE_URL=<Your_API_Base_URL>
REACT_APP_CLIENT_ID=<Your_Client_ID>
REACT_APP_CLIENT_SECRET=<Your_Client_Secret>
REACT_APP_AUTH_URL=<Your_Auth_URL>


Run the application:
npm i --force
npm start

Open http://localhost:3000 in your browser.
