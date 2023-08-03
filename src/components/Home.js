import React from "react";
import { Link } from "react-router-dom";

import * as HomeIMG from "../assets/img/ImgLib";


const Home = () => {
  return (
    <>
    <page-wrapper>
      <header className="headerDefault">
          <div className="container">
              <div className="row g-1">
                  <div className="col-md-1">
                      <Link className="d-block" to="#">
                        <img className="img-fluid" src={ HomeIMG.logoLight } alt="" />
                      </Link>
                  </div>
                  <div className="col-md-10 "></div>
                  <div className="col-md-1"></div>
              </div>
          </div>
      </header>
      <body-main class="bg-home">
          <div className="container">
              <div className="row">
                  <div className="col-12 col-lg-7 mx-md-auto text-center">
                      <h1 className="banner-title display-4 fw-bold">The hottest social media app for children and adults!</h1>
                      <p className="cont text-muted">A lead paragrap lorem ipsum lorem ipsum</p>

                      <Link className="btn btn-theme btn-danger my-4" to="/account-type">Get started!</Link>
                      <Link className="link-primary link-theme link-underline-opacity-0 d-block">Watch video</Link>
                  </div>
              </div>
          </div>
      </body-main>
    </page-wrapper>
    </>
  );
};

export default Home;