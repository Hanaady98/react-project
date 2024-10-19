import Header from "./components/Layout/Header/Header";
import FooterP from "./components/Layout/Footer/FooterP";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import Error from "./Pages/Error/Error";
import Login from "./components/Login/Login";
import Register from "./Pages/Sign Up/Register";
import MyCards from "./Pages/MyCards/MyCards";
import Profile from "./Pages/Profile/Profile"
import RouteGuard from "./components/Shared/RouteGuard";
import FavoriteCards from "./Pages/FavoriteCards/FavoriteCards";
import CardDetails from "./Pages/CardDetails/CardDetails";
import Home from "./Pages/Home/Home";
import CardCreation from "./Pages/CardCreation/CardCreation";
import UpdateCardDetails from "./Pages/UpdateCard/UpdateCard";
import Crm from "./Pages/Admin/Crm";
import UpdateUser from "./Pages/UpdateUser/UpdateUser";


function App() {

  return (
    <>
      <Header />
      <div className="dark:bg-gray-800 bg-gradient-to-r from-pink-100 to-pink-200 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/card/:id" element={<CardDetails />} />

          {/*---------------------------------------------------------------------------*/}

          <Route path="/crm"
            element={
              <RouteGuard adminOnly>
                <Crm />
              </RouteGuard>
            } />

          <Route path="/edit-user/:id"
            element={
              <RouteGuard>
                <UpdateUser />
              </RouteGuard>
            } />


          <Route
            path="/edit-card/:id"
            element={
              <RouteGuard>
                <UpdateCardDetails />
              </RouteGuard>
            } />

          <Route path="/mycards"
            element={
              <RouteGuard bizOnly>
                <MyCards />
              </RouteGuard>
            } />

          <Route path="/favoritecards"
            element={
              <RouteGuard>
                <FavoriteCards />
              </RouteGuard>
            } />

          <Route path="/profile"
            element={
              <RouteGuard>
                <Profile />
              </RouteGuard>
            } />

          <Route path="/cardcreation"
            element={
              <RouteGuard bizOnly>
                <CardCreation />
              </RouteGuard>
            } />

          <Route path="/*" element={<Error />} />

        </Routes>
      </div>

      <FooterP />
    </>
  );
};

export default App;
