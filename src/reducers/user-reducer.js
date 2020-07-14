const default_state = {
    is_logged_in: false,
    error_message: '',
    user: {}
}

const userReducer = (state = default_state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                is_logged_in: true,
                user: {...action.payload},
                error_message: default_state.error_message
            }
        case 'CLEAR_USER':
            return {
                is_logged_in: false,
                user: {},
                error_message: default_state.error_message
            }
        case 'SET_ERROR':
            return {
                ...state,
                error_message: action.payload
            }
        default:
            return state
    }
}

export { userReducer }