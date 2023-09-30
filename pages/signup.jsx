import {  useRef ,useState} from "react";
import { useRouter } from "next/router";


const Signup = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstnameInputRef = useRef();
  const lastnameInputRef = useRef();
  const mobileInputRef = useRef();
  const addressInputRef = useRef();
  const [userImg,setUserImg]=useState(null);

  const router = useRouter();


  async function submitHandler(event) {
    event.preventDefault();
    
    
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const name =
    firstnameInputRef.current.value +' '+ lastnameInputRef.current.value;
    const mobile = mobileInputRef.current.value;
    const address = addressInputRef.current.value;
    
    
    const formData=new FormData();
    formData.append('userimg',userImg)
    formData.append('email',email)
    formData.append('password',password)
    formData.append('mobile',mobile)
    formData.append('address',address)
    formData.append('name',name)

     try {
      const response = await fetch("/api/auth/signup", {
        method: 'POST',
        body: formData,
        /*  headers: {
          "Content-Type": "multipart/form-data",
        }, */ 
      });
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      const data = await response.json();

      alert("Account created,Please Login to continue.");
      router.replace("/login");
    } catch (error) {
      console.log(error);
      alert(error);
    } 
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div
              className="card shadow-2-strong card-registration"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Sign Up</h3>
                <form onSubmit={submitHandler}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          className="form-control form-control-lg"
                          required
                          ref={firstnameInputRef}
                        />
                        <label className="form-label" htmlFor="firstName">
                          First Name*
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          className="form-control form-control-lg"
                          ref={lastnameInputRef}
                        />
                        <label className="form-label" htmlFor="lastName">
                          Last Name
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 pb-2">
                    <div className="form-outline">
                      <input
                        type="email"
                        id="emailAddress"
                        className="form-control form-control-lg"
                        required
                        ref={emailInputRef}
                      />
                      <label className="form-label" htmlFor="emailAddress">
                        Email*
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="tel"
                          id="phoneNumber"
                          className="form-control form-control-lg"
                          required
                          ref={mobileInputRef}
                        />
                        <label className="form-label" htmlFor="phoneNumber">
                          Phone Number*
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="file"
                          id="image"
                          className="form-control form-control-lg"
                         
                          onChange={(e)=>{setUserImg(e.target.files[0])}}
                        />
                        <label className="form-label" htmlFor="image">
                          user profile
                        </label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="form-outline">
                        <textarea
                          type="text"
                          id="address"
                          className="form-control form-control-lg"
                          ref={addressInputRef}
                        />
                        <label className="form-label" htmlFor="address">
                          Address
                        </label>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          ref={passwordInputRef}
                          required
                        />
                        <label className="form-label" htmlFor="password">
                          Set Password*
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <input
                      className="btn btn-primary btn-lg"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
