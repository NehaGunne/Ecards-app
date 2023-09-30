import { useRef } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log(result);
    if (!result.error) {
      router.replace("/");
    } else {
      alert(result.error);
    }
  }
  return (
    <div className="d-flex flex-row justify-content-center">
      <div className="card p-5 m-5">
        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Login</h3>
        <form onSubmit={submitHandler}>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              required
              ref={emailInputRef}
            />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              required
              ref={passwordInputRef}
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>

          <div className="text-center">
            <p>
              Dont have an Account?{" "}
              <span className="text-primary">
              <Link href="/signup">
                Register
              </Link>

              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
