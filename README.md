# 📝 Todo App

A simple and efficient **Todo App** built with **Next.js**, featuring a rich text editor, advanced formatting, and CRUD operations.

## 🚀 Features

- ✅ **Add, Edit, and Delete** todos with a dynamic interface
- 🎨 **Rich Text Editor** (Custom-built from scratch without third-party integration)
- 🌐 **Next.js** for server-side rendering and optimized performance
- 📦 **MongoDB Atlas** for database management
- 📊 **useContext** for state management (Redux can also be used, but this project uses `useContext` for simplicity)
- 📌 **useRef Hook** for managing editor references and DOM manipulation

## 📁 Folder Structure

```
├── components
│    ├── Toolbar.js          // Custom Toolbar for Rich Editor
│    └── TodoItem.js         // Todo Item Component
├── context
│    └── TodoProvider.js     // State Management with useContext
├── pages
│    ├── api
│    │    └── todos          // CRUD API Routes
│    └── index.js            // Main Todo Page
└── README.md
```

## 🛠️ Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Configure Environment Variables:**

Create a `.env.local` file and add your MongoDB connection string:

```
MONGODB_URL=your-mongodb-connection-string
```

4. **Run the development server:**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📤 Deployment

Deploy to **Vercel** using the following steps:

1. Install Vercel CLI if not already installed:

```bash
npm install -g vercel
```

2. Log in to Vercel:

```bash
vercel login
```

3. Deploy the project:

```bash
vercel
```

## 📚 Usage

1. Create, edit, and delete todos.
2. Use rich text formatting (bold, italic, underline, lists, etc.).
3. Data is saved to MongoDB Atlas.


