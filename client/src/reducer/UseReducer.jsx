const getLocalData = JSON.parse(localStorage.getItem('myState'));

export const initialState = getLocalData ? getLocalData.state : null;

export const reducer = (state, action) => {
    if (action.type === 'USER') {
        return action.payload;
    }
    return state;
}