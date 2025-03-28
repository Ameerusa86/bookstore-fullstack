import React from "react";

const TooFast = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Too many incorrect requests
      </h1>
      <p className="mt-4 text-center text-lg text-light-200">
        You are making too many incorrect requests. Please wait a moment and try
        again.
      </p>
    </main>
  );
};

export default TooFast;
