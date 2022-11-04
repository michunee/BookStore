// import { createStore } from 'redux';
// import { userReducer } from './reducer';


// const store = createStore(userReducer);

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './reducer';

const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})

export default store;