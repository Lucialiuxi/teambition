const createAFile = (state = [], action) => {
    switch (action.type) {
      case 'New_A_File':
        return [
          ...state,
          {
            ...action,
            star:false
          }
        ]
      default:
        return state
    }
  }
  
  export default createAFile;