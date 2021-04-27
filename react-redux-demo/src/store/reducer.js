
const DefaultState = {
    inputValue: '',
    list: [],
}

export default function Reducer(state = DefaultState, action) {
    let newState = {...state};
    switch (action.type) {
        case 'INPUT_VALUE':
            newState.inputValue = action.value;
            return newState;
        case 'LIST':
            newState.list = [...action.value];
            return newState;
        default:
            return state;
    }
}