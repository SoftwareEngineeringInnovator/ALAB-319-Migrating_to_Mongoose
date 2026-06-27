# ALAB 319 - Migrating to Mongoose

## What’s this project about?

Basically, I took an application that was already running on Express and MongoDB and gave it a solid upgrade. Originally, the project relied on the native MongoDB Node.js driver, but for this lab, I refactored the entire database logic to use **Mongoose** instead.

The app connects directly to the `sample_training` database on MongoDB Atlas and handles everything inside the `grades` collection. The big mission here was to swap out all the old Mongo driver methods for clean Mongoose models without breaking any of the existing API routes.

## Objectives (What I set out to do)

* Refactor the existing MongoDB app to use Mongoose seamlessly.
* Set up a clean connection to MongoDB Atlas via Mongoose.
* Build a structured Mongoose schema and model for the `grades` collection.
* Swap out the old native driver queries for modern Mongoose model methods.
* Rigorously test every single route after each individual change.
* Keep the repo clean and updated with frequent Git commits as I made progress.

## Tech Stack (The Tools Used)

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* dotenv (to keep environment variables safe)
* nodemon (so I didn't have to keep restarting the server manually)
* Thunder Client (for testing endpoints)
* Git & GitHub (for version control)

## Project Structure

Here is how the project directories are organized:

```text
ALAB-319-WORKING-WITH-MONGOOSE
│
├── db
│   └── conn.js
│
├── models
│   └── Grade.js
│
├── routes
│   └── grades.js
│
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md