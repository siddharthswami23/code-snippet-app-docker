import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import AppRouter from "./Routes/AppRouter";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastContainer position="bottom-right" />
      <div className="w-full px-[10%]">
        <Header />
        <AppRouter />
      </div>
    </ThemeProvider>
  );
}

export default App;
