const defaultState = {
  coordinates: [],
};
  
export const checkInArea = coordinates => ({
  type: 'CHECK_AREA',
  coordinates: coordinates,
})
  
export const reducerDashboard = (state = defaultState, action) => {
  if(action.type === 'CHECK_AREA') {
    return  {
      ...state, 
      coordinates: action.coordinates,
    };
  }
  
  return state;
};