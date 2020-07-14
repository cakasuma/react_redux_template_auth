import API from "backend";

export const populateUser = (payload) => ({ type: "SET_USER", payload });

export const clearUser = () => ({ type: "CLEAR_USER" });

export const setError = (payload) => ({ type: "SET_ERROR", payload });

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const login = (credentials) => (dispatch) => new Promise((resolve, reject) => {
  API.post("/user/login", {
    email: credentials.email,
    password: credentials.password,
  })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      dispatch(populateUser(response.data.user));
      resolve(response);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(setError('Invalid credentials'));
        reject('Invalid credentials')
      } else {
        dispatch(setError(error.message));
        reject(error.message);
      }
    });
});

export const register = (user_info) => (dispatch) => new Promise((resolve) => {
  API.post("/user/register", {
    first_name: user_info.first_name,
    email: user_info.email,
    password: user_info.password,
  })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      dispatch(populateUser(response.data.user));
      resolve(response);
    })
    .catch((error) => {
      dispatch(setError(error.message));
      resolve(error);
    });
});

export const logout = () => (dispatch) => new Promise((resolve) => {
  API.post("/user/logout", null, { headers: { ...getAuthHeader() } })
    .then(() => {
      localStorage.clear()
      dispatch(clearUser());
      resolve()
    })
    .catch((error) => {
      dispatch(setError(error.message));
      resolve()
    });
});

export const verify = () => (dispatch) => new Promise((resolve) =>{
  API.get("/user/profile", { headers: { ...getAuthHeader() } })
    .then((response) => {
      dispatch(populateUser(response.data));
      resolve(response);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(clearUser());
      } else {
        dispatch(setError(error.message));
      }
      resolve(error)
    });
});
