export default {
    setUserName(state, payload) { state.userName = payload; },
    setFocus(state, payload) { state.focus = payload; },
    setBackdropImage(state, payload) {
        state.backdropImage = payload;
        state.showBackdrop = true;
    }
};