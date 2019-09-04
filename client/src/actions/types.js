//we define this because when dealing with types in actions and reducers we often make spelling mistakes
//and when theyre written out in string form we dont get an error so its hard to locate the error
//so making them into variables will make it easier to debug when we make a spelling mistake is made
//because itll tell us we have an undefined variable
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const CREATE_STREAM = 'CREATE_STREAM'
export const FETCH_STREAMS = 'FETCH_STREAMS'
export const FETCH_STREAM = 'FETCH_STREAM'
export const DELETE_STREAM = 'DELETE_STREAM'
export const EDIT_STREAM = 'EDIT_STREAM'