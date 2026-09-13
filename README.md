# Task Manager

A task management app built with React, letting users add, complete, delete, and filter tasks by priority.

🔗 **Live Demo:** https://task-manager-react-6uff.onrender.com

![App Screenshot](./assets/image.png)

## Features

- Add new tasks with a priority level (high, medium, low)
- Mark tasks as complete or delete them
- Filter the task list by priority
- Clean, component-based UI built entirely with React hooks

## Tech Stack

- React
- React Hooks

## Key Implementation Detail

State is managed at the top level and passed down to child components (form, list, and individual task items), demonstrating core React patterns like controlled inputs, list rendering with keys, and lifting state up.

## What I Learned

This was my first independently-built React project after learning the framework — it helped me get comfortable with component architecture, state management, and translating logic I'd already written in vanilla JavaScript into React's component-based approach.

## Running Locally

```bash
git clone https://github.com/pasanghilp-art/task-manager-react.git
cd task-manager-react
npm install
npm run dev
```
