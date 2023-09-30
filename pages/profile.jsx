import { useContext } from "react";
import Image from "next/image";
import { Context } from "../components/Layout";
import OrderHistory from "../components/Orders";
const Profile = () => {
  const context = useContext(Context);
  const { session } = context;

  if (!session) {
    return <div>Please Login!</div>;
  }
  const { email, name, mobile, userimg, address, id } = session?.user;

  return (
    <>
      <section style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <Image
                    src={userimg}
                    alt="avatar"
                    width={100}
                    height={100}
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />

                  <h5 className="my-3">{name}</h5>

                  <p className="text-muted mb-4">{address}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">+91 {mobile}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <OrderHistory />
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
