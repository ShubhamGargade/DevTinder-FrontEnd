import { createReducer, on } from "@ngrx/store";
import { addFeed, addUser, removeFeed, removeUser } from "./store.action";
import { feedState, userState } from "./store.state";

export const userInitialState: userState = {
    user: {}
};

export const feedInitialState: feedState = {
    feedData: []
};

export const userReducer = createReducer(
    userInitialState,
    on(addUser, (state: userState, data) => {
        return { ...state, ...data }
    }),
    on(removeUser, (state) => {
        return userInitialState;
    })
);


export const feedReducer = createReducer(
    feedInitialState,
    on(addFeed, (state: feedState, data) => {
        return {...state, ...data};
    }),
    on(removeFeed, (state) => {
        return feedInitialState;
    })
);