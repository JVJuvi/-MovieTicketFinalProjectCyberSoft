


const stateDefault = {
    arrImg: []
}

const CarouselReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case 'SET_CAROUSEL': {
            state.arrImg = action.payload;
            return {...state};
        }
        default: return {...state};
    }
}

export default CarouselReducer