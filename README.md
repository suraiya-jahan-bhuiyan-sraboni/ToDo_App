# 📝 Todo App

A simple and elegant Todo application built with **React**, **Redux Toolkit**, **Shadcn UI**, and **Tailwind CSS**.  
This project demonstrates global state management, clean UI, and live statistics for todos.

---

## 🚀 Features

- Add new todos  
- Edit existing todos  
- Toggle todos as complete/incomplete  
- Delete todos
- searching todos  
- Filter todos (All / Active / Completed)  
- Live stats (total, completed, remaining)  
- Modern UI using **Shadcn** + **Tailwind CSS**  

---

## 🛠️ Tech Stack

- **React** – Frontend framework  
- **Redux Toolkit and React-redux** – Global state management  
- **Shadcn UI** – Accessible, styled UI components  
- **Tailwind CSS** – Utility-first styling  
- **Lucide Icons** – Modern icons  

---

## 📂 Project Structure

```

src/
├── app/
│   └── store.js        # Redux store setup
├── features/
│   └── Task/
│        ├── taskSlice.js  # Todo slice (reducers, actions, selectors)
├── components/
│   ├── AddTaskButton.jsx  # Form to add new todos
│   ├── TaskCard.jsx       # Displays todos
│   
├── App.jsx
└── main.jsx

````

---

## ⚡ Installation & Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/suraiya-jahan-bhuiyan-sraboni/ToDo_App.git
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

4. Build for production:

   ```bash
   npm run build
   ```

---


## 📌 Redux Actions

* `addTodo` → Add a new todo
* `toggleTodo` → Toggle completed state
* `editTodo` → Edit todo
* `deleteTodo` → Remove todo
* `setFilter` → Set visibility filter

---

