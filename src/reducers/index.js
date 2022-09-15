import { combineReducers } from "redux";
import { destroyConstants } from "../constants";

/* AUTH */
import { alert } from "./alert.reducer";
import { web3 } from "./web3.reducer";

/* USER */
import auth from "./auth.reducer";
import { profile } from "./user/profile.reducer";
import { userEdit } from "./user/edit.reducer";

import explore from "./explore.reducer";
import metadata from "./metadata.reducer";
import project from "./project.reducer";
import video from "./video.reducer";
import countries from "./countries.reducer";
import form from "./form.reducer";
import search from "./search.reducer";
import partnerShip from "./partnership.reducer";
import userProject from "./user/project.reducer";
import scanJob from "./scanjob.reducer"

const appReducer = combineReducers({
  alert,
  web3,
  auth,
  profile,
  userEdit,
  explore,
  metadata,
  project,
  video,
  countries,
  form,
  search,
  partnerShip,
  userProject,
  scanJob
});

const rootReducer = (state, action) => {
  if (action.type === destroyConstants.DESTROY_SESSION) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
