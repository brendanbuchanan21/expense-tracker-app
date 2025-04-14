import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";


const VerifiedRedirect = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          dispatch(setUser({uid: user.uid, username: user.displayName ?? ""}));
          navigate("/picture"); // or /picture or whatever
        } else {
          navigate("/check-your-email");
        }
      } else {
        navigate("/login");
      }

      setLoading(false);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  return (
    <div className="form-card">
      <h2>Just a sec...</h2>
      <p>{loading ? "Verifying your email and logging you in..." : "Redirecting..."}</p>
    </div>
  );
};

export default VerifiedRedirect;
