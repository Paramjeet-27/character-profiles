import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PageRoutes from "./routes/pageRoutes";
import ProfileProvider from "./context/ProfileContext";

function App() {
  return (
    <>
      <ProfileProvider>
        <PageRoutes />
      </ProfileProvider>
    </>
  );
}

export default App;
