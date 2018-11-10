const defaultState = {
  isLoading: false,
}

export const showLoading = () => ({
  type: 'SHOW_LOADING',
  isLoading: true,
})

export const hideLoading = () => ({
  type: 'HIDE_LOADING',
  isLoading: false,
})

export const reducerApp = (state = defaultState, action) => {
  if(action.type === 'SHOW_LOADING') {
    return  {
      ...state, 
      isLoading: action.isLoading,
    };
  }
  if(action.type === 'HIDE_LOADING') {
    return  {
      ...state, 
      isLoading: action.isLoading,
    };
  }
  return state;
};