# Kira - Collaborative Tool

## Introduction
Kira is a collaborative tool similar to Jira, built using the MERN (MongoDB, Express, React, Node.js) stack. It facilitates seamless project management for teams, with three distinct user roles: Engineering Manager, Product Manager, and Team Member.

### User Roles:
1. Engineering Manager: Responsible for creating teams, assigning Product Managers to them, and adding new team members to teams.
2. Product Manager: Can view all tickets assigned to their team, create new tickets, and assign them to team members.
3. Team Member: Can view all tickets assigned to them, update their status, and collaborate with their team.

## Project Structure
The project is organized into two main folders: `backend` and `my-app`.

### backend
The backend folder contains the server-side code for Kira. To run the backend, navigate to the `backend` folder and type `npm run dev`.

### my-app
The `my-app` folder contains the frontend code, built using React. To run the frontend, navigate to the `my-app` folder and type `npm start`.

## Getting Started
Follow the steps below to set up and run Kira on your local machine:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies for the backend: `cd backend && npm install`
3. Install dependencies for the frontend: `cd my-app && npm install`
4. Start the backend server: `cd backend && npm run dev`
5. Start the frontend: `cd my-app && npm start`

Once the backend and frontend servers are running, you can access Kira in your web browser at `http://localhost:3000/`.

## Usage
1. **Engineering Manager**:
   - Login with your credentials.
   - Create teams and assign Product Managers to them.
   - Add new team members to teams.

2. **Product Manager**:
   - Login with your credentials.
   - View all tickets assigned to your team.
   - Create new tickets and assign them to team members.

3. **Team Member**:
   - Login with your credentials.
   - View all tickets assigned to you.
   - Update ticket statuses and collaborate with your team.

## Contribution
If you wish to contribute to Kira, please follow the standard GitHub workflow for forking the repository, creating branches, and submitting pull requests.

## License
The project is open-source and licensed under the [MIT License](LICENSE).

## Acknowledgments
We would like to express our gratitude to the open-source community for their invaluable contributions, as well as the developers of the MERN stack and Jira for inspiring this project.

Thank you for using Kira! We hope you find it useful for your collaborative project management needs. If you encounter any issues or have suggestions for improvements, feel free to raise an issue or submit a pull request. Happy collaborating!
