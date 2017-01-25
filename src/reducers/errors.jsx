let initialState = [];

export default function(state = initialState, action) {
    Object.freeze(state);
    if (action.type === 'ADD_ERROR') {
        return state.concat([action.payload]);
    }
    return state;
}
