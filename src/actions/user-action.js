import API from "backend";

const populateUser = (payload) => ({ type: "SET_USER", payload });

const clearUser = () => ({ type: "CLEAR_USER" });

const setErorr = (payload) => ({ type: "SET_ERROR", payload });

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` }
}

export const login = (credentials) => (dispatch) => {
  API.post('/user/login', {
    email: credentials.email,
    password: credentials.password,
  })
    .then((response) => {
      localStorage.setItem("token", response.token);
      dispatch(populateUser(response.user));
    })
    .catch((error) => {
      dispatch(setErorr(error.message));
    });
};

export const register = (user_info) => dispatch => {
    API.post('/user/register', {
        first_name: user_info.first_name,
        email: user_info.email,
        password: user_info.password
    }).then((response) => {
        localStorage.setItem("token", response.token);
        dispatch(populateUser(response.user));
      })
      .catch((error) => {
        dispatch(setErorr(error.message));
      });
}

export const logout = () => dispatch => {
    API.post('/user/logout', null, { ...getAuthHeader() }).then(() => {
        dispatch(clearUser())
    }).catch((error) => {
        dispatch(setErorr(error.message));
    })
}

export const verify = () => dispatch => {
    API.post('/user/profile', null, { ...getAuthHeader() }).then((response) => {
        dispatch(populateUser(response.user));
    }).catch((error) => {
        if (error.code === 401) {
            dispatch(clearUser())
        } else {
            dispatch(setErorr(error.message));
        }
    })
}