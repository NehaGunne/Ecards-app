import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import { createContext, useState,useEffect } from "react";
import Header from "../header";
import { useSession } from "next-auth/client";


export const Context = createContext({});
const Layout = (props) => {
  const [session, loading] = useSession();
  const [searchedCards, setSearchedCards] = useState([]);
  const [cart,setCart]=useState([])
  useEffect(() => {
    fetch(`/api/cart?userid=${session?.user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCart(data.cart)
      })
      .catch((err) => {
        console.log(err);
      });
  },[session]);
  return (
    <>
      <Head>
        <title>YOYO EGift cards</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Context.Provider
        value={{ searchedCards, setSearchedCards ,session,cart,setCart}}
      >
        <Header />
        <main>{props.children}</main>
      </Context.Provider>
    </>
  );
};

export default Layout;
