import state from 'common/store/state';

state.table_options = {
    sortIcon: {
        base: 'fa',
        up: 'fas fa-angle-up',
        down: 'fas fa-angle-down'
    },
    // see the options API
    perPage: 10,
    texts: {
        filter: '',
        limit: ''
    },
    highlightMatches: true,
    pagination: {chunk: 10, dropdown: false}
};

export default state;
