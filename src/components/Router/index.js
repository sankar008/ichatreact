import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* import Footer from "../components/Footer";
import Header from "../components/Header"; */
import Home from "../Home";
import Aboutus from "../Aboutus";
import AccountType from "../AccountType";
import SignupParent from "../parents/SignupParent";
import SignupChild from "../kids/SignupChild";
import LoginChild from "../kids/LoginChild"
import LoginParent from "../parents/LoginParent";
import Profile from "../Profile";
import ParentFeed from "../parents/feed/Feed";
import ParentFeedPost from "../parents/feed/FeedPost";
import KidsFeed from "../kids/feed/Feed";
import Page404 from "../Page404";
import ParentsForgotPassword from "../parents/ForgotPassword.js"
import KidsForgotPassword from "../kids/ForgotPassword.js"

const BasicRoutes = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<Aboutus />} />
          <Route exact path="/account-type" element={<AccountType />} />
          <Route exact path="/parent/signup" element={<SignupParent />} />
          <Route exact path="/parent/login" element={<LoginParent />} />
          <Route exact path="/parent/forgot-password" element={<ParentsForgotPassword />} />

          <Route exact path="/kids/signup" element={<SignupChild />} />
          <Route exact path="/kids/login" element={<LoginChild />} />
          <Route exact path="/kids/forgot-password" element={<KidsForgotPassword />} />

          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/parent/feed" element={<ParentFeed />} />
          <Route exact path="/parent/feed-post" element={<ParentFeedPost />} />
          <Route exact path="/kids/feed" element={<KidsFeed />} />
          <Route path="*" element={<Page404 />} />
        </Routes>     
    </Router>
  );
};

export default BasicRoutes;