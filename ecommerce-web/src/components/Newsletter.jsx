import React from "react";

const Newsletter = () => {
  return (
    <div className="mb-10 text-center">
      <div>Newsletter</div>
      <div>Get timely updates from your favorite products</div>
      <div>
        <input type="text" placeholder="Your email" className="input w-full max-w-xs" />
        <button className="btn">Button</button>
      </div>
    </div>
  );
};

export default Newsletter;
