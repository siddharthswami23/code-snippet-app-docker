import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import AppRouter from "./Routes/AppRouter";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full px-[10%]">
        <Header />
        <AppRouter />
      </div>
    </ThemeProvider>
  );
}

export default App;
