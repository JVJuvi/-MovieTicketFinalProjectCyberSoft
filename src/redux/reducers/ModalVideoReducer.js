

const stateDefault = {
    item: {},
    showModal: false
}

const ModalVideoReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case 'SHOW_MODAL': {
            state.item = action.item;
            state.showModal = action.payload;
            return {...state};
        }
        case 'CLOSE_MODAL': {
            state.showModal = action.payload;
            return {...state};
        }
        default: return {...state};
    }
}

export default ModalVideoReducer;