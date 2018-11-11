const defaultState = {
  isLoading: false,
  text: 'Waiting...',
}

export const showLoading = () => ({
  type: 'SHOW_LOADING',
  isLoading: true,
})

export const hideLoading = () => ({
  type: 'HIDE_LOADING',
  isLoading: false,
})

export const setLoadingText = (text) => ({
  type: 'SET_LOADING_TEXT',
  text: text,
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
  if(action.type === 'SET_LOADING_TEXT') {
    return  {
      ...state, 
      text: action.text,
    };
  }
  return state;
};