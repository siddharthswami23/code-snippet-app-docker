import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

const Home = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppContextProvider");
  }

  const { user, setUser } = context;
  console.log("User:", user);

  
  return <div>home</div>;
};

export default Home;
