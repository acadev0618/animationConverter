import common_mutations from 'common/store/mutations'

let mutations = common_mutations;
mutations.left_menu = function (state, option) {
    if (option === "open") {
        state.left_open = true
    } else if (option === "close") {
        state.left_open = false
    } else if (option === "toggle") {
        state.left_open = !state.left_open
    }
    if (state.left_open) {
        document.getElementsByTagName("body")[0].classList.remove("left-hidden")
    } else {
        document.getElementsByTagName("body")[0].classList.add("left-hidden")
    }
};

export default mutations
