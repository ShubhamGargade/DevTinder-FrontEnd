import { feedState, userState } from "./store.state";

export const userSelector = (userData: userState) => userData;
export const feedSelector = (feedData: feedState) => feedData;