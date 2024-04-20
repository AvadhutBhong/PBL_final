import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NewNavbar from "./components/NewNavbar";
import Layout from "./components/Layout";


function App() {
  return (
    <>
     <Layout>
      {/* <Navbar /> */}
      <NewNavbar></NewNavbar>
      <Outlet />
      <Footer />
      </Layout>
    </>
  );
}

export default App;
