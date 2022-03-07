import { configure } from "mobx";
import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import MovieStore from "./movieStore";
import ActoryStore from "./actoryStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store{
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    movieStore: MovieStore;
    actoryStore: ActoryStore;

}
configure({
    enforceActions: "always",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: true
})

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore:  new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    movieStore: new MovieStore(),
    actoryStore: new ActoryStore(),
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}