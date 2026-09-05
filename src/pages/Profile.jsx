import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSelectors";

function Profile() {
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      <h1>Profile</h1>

      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Role: {user.role}</p>
        </>
      )}
    </div>
  );
}

export default Profile;