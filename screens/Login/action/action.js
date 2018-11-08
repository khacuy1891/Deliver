const defaultState = {
  email: 'uybkt2@gmail.com',
};

export const setEmail = (email) => ({
    type: 'SET_EMAIL',
    email: email,
})

export const reducerLogin = (state = defaultState, action) => {
  if(action.type === 'SET_EMAIL') {
    return  {
      ...state, 
      email: action.email,
    };
  }
  
  return state;
};