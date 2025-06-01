import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { usePostUserDataMutation } from "../../redux/apis/userDataApi";


const VerifiedRedirect = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [postUserData] = usePostUserDataMutation();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
    await user.reload();
    if (user.emailVerified) {
    try {
      await postUserData({ firebase_uid: user.uid, username: user.displayName })
      dispatch(setUser({uid: user.uid, username: user.displayName ?? ""}));
      navigate("/picture"); // or /picture or whatever
    } catch (error) {
      console.error(error);
    }
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
