import { userConstants } from '../../constants';

const initialState =  {
    requesting:false,
    visible:false,
    error:null,
    data:null
  };

export function userEdit(state = initialState, action) {
    switch (action.type) {

        case userConstants.USER_EDIT_REQUEST:
            return { 
                ...state,
                requesting: true,
                data: action.payload
            };
        case userConstants.USER_EDIT_SUCCESS:
            return {
                ...state,
                requesting: false,
                data: action.payload
            };
        case userConstants.USER_MODAL_EDIT:
            return {
                ...state,
                error: null,
                visible: action.payload,
                data: action.payload ? state.data : null,
            };
        case userConstants.USER_EDIT_FAILURE:
            return {
                ...state,
                visible: true,
                requesting: false,
                error: action.payload
               
            };
           
        default:
            return state

    }
}