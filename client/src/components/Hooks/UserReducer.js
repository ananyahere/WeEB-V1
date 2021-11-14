export const initialState = null

export const reducerFunc = (CurrentState, action) => {
  switch(action.type){
    case "USER":
      return action.payload
    default: 
      return CurrentState
  }
}