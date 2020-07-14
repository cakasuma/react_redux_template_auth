import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { verify, logout } from "actions/user-action";
import { Login, Register } from "components";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [is_loading, setLoading] = React.useState(true);
  const { is_logged_in, user, error_message } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  React.useEffect(() => {
    dispatch(verify()).then(() => {
      setLoading(false)
    })
    
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {is_loading ? (
          <>loading...</>
        ) : (
          <>
            {is_logged_in ? (
              <>
                <p>You are logged in</p>
                {user && (
                  <>
                    <p>{user.first_name}</p>
                    <p>{user.email}</p>
                  </>
                )}
                <button className="App-link" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <p>Signup or signin in</p>
                <Login />
                <Register />
              </>
            )}
          </>
        )}
      </header>
      {error_message && <p>{error_message}</p>}
    </div>
  );
};

export default App;
