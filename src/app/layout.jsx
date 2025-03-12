import { TodoProvider } from "@/context/TodoProvider ";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <TodoProvider>
          {children}
        </TodoProvider>
      </body>
    </html>
  );
}
