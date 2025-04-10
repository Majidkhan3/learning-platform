import Link from "next/link";
import React from "react";

const InnerBanner = ({ title = "", page = "" }) => {
  return (
    <section className="inner-banner">
      <div className="container">
        <h2 className="inner-banner__title">{title}</h2>
        <div className="breadcrumb__wrapper">
          <ul className="thm-breadcrumb">
            <li className="thm-breadcrumb__item">
              <Link href="/">
                <a className="thm-breadcrumb__link">Home</a>
              </Link>
            </li>
            <li className="thm-breadcrumb__item current">
              <a href="#" className="thm-breadcrumb__link">
                {page || title}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default InnerBanner;
