import React from "react";
import { useCookies } from "react-cookie";

const Home = () => {
  const [cookies] = useCookies(["user"]);

  return (
    <div>
      <h1 className="title">Bienvenido: {cookies.user}</h1>
    </div>
  );
};

export default Home;
