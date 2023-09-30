import { useContext }  from "react";
import Link from "next/link";
import classes from "./header.module.css";
import { signOut } from "next-auth/client";
import CartIcon from "../Icons/CartIcon";
import { Context } from "../Layout";
import { useRouter } from "next/router";

const Header = () => {
  const context=useContext(Context)
  const {setSearchedCards,session,cart}=context;
  const router=useRouter();

  const logoutHandler=() =>{
    signOut({ redirect: false });
  }
  const handleSearch=async(e)=>{
    if(e.keyCode===13){
      const result=await fetch(`/api/search?q=${e.target.value}`)
      console.log(`/api/search?q=${e.target.value}`)
      const data=await result.json()
      setSearchedCards(data.searchedCards)
      e.target.value=''
      router.push('/search-results')

    }

  }
  return (
    <div className={`${classes.header1} bg-dark`}>
      <ul>
        <Link href={"/"}>
          <li className={`${classes.item} ${classes.logo}`}>YOYO Gift</li>
        </Link>
      </ul>
      <div className="form-outline">
        <input
          type="search"
          id="form1"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
          onKeyDown={handleSearch}
        />
      </div>
      <ul className={classes.secondaryNav}>
        {!session && (
          <Link href="/login">
            <li className={classes.item}>Login</li>
          </Link>
        )}
        {session && (
          <Link href="/profile">
            <li
              className={`${classes.item} d-flex flex-column`}
            >
              Hello,<span>{session.user.name}</span>
            </li>
          </Link>
        )}

        {session && (
          <Link href="/">
            <li className={classes.item} onClick={logoutHandler}>
              Log Out
            </li>
          </Link>
        )}

        <Link href="/cart">
          <li className={classes.item}>
            <CartIcon />
           { cart.length!=0 ?<sup className={classes.cart_length}>{cart.length}</sup>:''}
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
