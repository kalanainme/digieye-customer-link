import axios from "axios";

export const claimReportActions = {
    GET_MEDIA_UPLOAD_URL_ATTEMPT: 'GET_MEDIA_UPLOAD_URL_ATTEMPT',
    GET_MEDIA_UPLOAD_URL_ATTEMPT_SUCCESS: 'GET_MEDIA_UPLOAD_URL_ATTEMPT_SUCCESS',
    GET_MEDIA_UPLOAD_URL_ATTEMPT_FAILED: 'GET_MEDIA_UPLOAD_URL_ATTEMPT__FAILED',
    GET_CUSTOMER_LINK_ATTEMPT: 'GET_CUSTOMER_LINK_ATTEMPT',
    GET_CUSTOMER_LINK_ATTEMPT_SUCCESS: 'GET_CUSTOMER_LINK_ATTEMPT_SUCCESS',
    GET_CUSTOMER_LINK_ATTEMPT_FAILED: 'GET_CUSTOMER_LINK_ATTEMPT_FAILED',
    UPLOAD_IMAGES_TO_S3_ATTEMPT: 'UPLOAD_IMAGES_TO_S3_ATTEMPT',
    UPLOAD_IMAGES_TO_S3_ATTEMPT_SUCCESS: 'UPLOAD_IMAGES_TO_S3_ATTEMPT_SUCCESS',
    UPLOAD_IMAGES_TO_S3_ATTEMPT_FAILED: 'UPLOAD_IMAGES_TO_S3_ATTEMPT_FAILED',
    UPDATE_LOCATION_ATTEMPT: 'UPDATE_LOCATION_ATTEMPT',
    UPDATE_LOCATION_ATTEMPT_SUCCESS: 'UPDATE_LOCATION_ATTEMPT_SUCCESS',
    UPDATE_LOCATION_ATTEMPT_FAILED: 'UPDATE_LOCATION_ATTEMPT_FAILED',
};

const initialState = {
    isLoading: false,
    mediaUploadURL: null,
    hashToken: null

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
            case claimReportActions.GET_MEDIA_UPLOAD_URL_ATTEMPT_SUCCESS: {
                return { ...state, isLoading: false, mediaUploadURL: action.payload.link };
            }
            case claimReportActions.GET_MEDIA_UPLOAD_URL_ATTEMPT_FAILED: {
                return { ...state, isLoading: false };
            }
            case claimReportActions.GET_MEDIA_UPLOAD_URL_ATTEMPT: {
                return { ...state, isLoading: true };
            }
            case claimReportActions.GET_CUSTOMER_LINK_ATTEMPT_SUCCESS: {
                return { ...state, isLoading: false, hashToken: action.payload.hash };
            }
            case claimReportActions.GET_CUSTOMER_LINK_ATTEMPT_FAILED: {
                return { ...state, isLoading: false };
            }
            case claimReportActions.GET_CUSTOMER_LINK_ATTEMPT: {
                return { ...state, isLoading: true };
            }
        case claimReportActions.UPLOAD_IMAGES_TO_S3_ATTEMPT_SUCCESS: {
            return { ...state, isLoading: false,};
        }
        case claimReportActions.UPLOAD_IMAGES_TO_S3_ATTEMPT_FAILED: {
            return { ...state, isLoading: false };
        }
        case claimReportActions.UPLOAD_IMAGES_TO_S3_ATTEMPT: {
            return { ...state, isLoading: true };
        }
        case claimReportActions.UPDATE_LOCATION_ATTEMPT: {
            return { ...state, isLoading: true };
        }
        case claimReportActions.UPDATE_LOCATION_ATTEMPT_SUCCESS: {
            return { ...state, isLoading: false, hashToken: action.payload};
        }
        case claimReportActions.UPDATE_LOCATION_ATTEMPT_FAILED: {
            return { ...state, isLoading: false };
        }
        default: {
            return state;
        }
    }
};

export const getCustomerLink = (body) => async dispatch => {
    dispatch({ type: claimReportActions.GET_CUSTOMER_LINK_ATTEMPT });
    try {
        const { data } = await axios.post(`https://jj3e8so6sf.execute-api.ap-southeast-1.amazonaws.com/dev/link`, body, {
            headers: {
                'x-api-key': 'c0c6e850-cf4b9132-311c-4560-92d1-a163310bb7da-c0c6e850-ae53-43b5-c0c6e850-ae53-43b5',
                'Access-Control-Allow-Origin': "*",
            }
        });
        const { message:msg, status } = data;
        if (status === 'error'){
            // message.error(msg);
            dispatch({ type: claimReportActions.GET_CUSTOMER_LINK_ATTEMPT_FAILED });
            return false;
        }

        dispatch({ type: claimReportActions.GET_CUSTOMER_LINK_ATTEMPT_SUCCESS, payload: data, });
        localStorage.setItem('hash_token',data.hash);

        return true;
    } catch ({ response }) {
        // message.error(response.message ? response.message : 'something went wrong!!! Please try again later');
        dispatch({ type: claimReportActions.GET_CUSTOMER_LINK_ATTEMPT_FAILED });
        return false;
    }
};


export const getMediaUploadUrl = (mediaData) => async dispatch => {
    dispatch({ type: claimReportActions.GET_MEDIA_UPLOAD_URL_ATTEMPT });
    try {
        const { data } = await axios.post(`https://jj3e8so6sf.execute-api.ap-southeast-1.amazonaws.com/dev/upload/link`, mediaData, {
            headers: {
                'authorization' : `${localStorage.getItem('hash_token')}`,
                'Access-Control-Allow-Origin': "*"
            }
        });
        const { message:msg, status } = data;
        if (status === 'error'){
            // message.error(msg);
            dispatch({ type: claimReportActions.GET_CUSTOMER_LINK_ATTEMPT_FAILED });
            return false;
        }
        dispatch({ type: claimReportActions.GET_MEDIA_UPLOAD_URL_ATTEMPT_SUCCESS, payload: data, });
        return data.link;
    } catch ({ response }) {
        // message.error(response.message ? response.message : 'something went wrong!!! Please try again later');
        dispatch({ type: claimReportActions.GET_CUSTOMER_LINK_ATTEMPT_FAILED });
        return false;
    }
};

export const UploadImagesToS3 = (s3Url,file) => async dispatch => {
    dispatch({ type: claimReportActions.UPLOAD_IMAGES_TO_S3_ATTEMPT });
    try {
        // let formData = new FormData();
        // formData.append("file", file);

        const { data } = await axios.put(s3Url,file,{
            headers: {
                'Access-Control-Allow-Origin': "*"
            }
        });
        const { message:msg, status } = data;
        if (status === 'error'){
            // message.error(msg);
            dispatch({ type: claimReportActions.UPLOAD_IMAGES_TO_S3_ATTEMPT_FAILED });
            return false;
        }
        dispatch({ type: claimReportActions.UPLOAD_IMAGES_TO_S3_ATTEMPT_SUCCESS, payload: data, });
        return true;
    } catch ({ response }) {
        // message.error(response.message ? response.message : 'something went wrong!!! Please try again later');
        dispatch({ type: claimReportActions.UPLOAD_IMAGES_TO_S3_ATTEMPT_FAILED });
        return false;
    }
};

export const updateLocation = (locationData) => async dispatch => {
    dispatch({ type: claimReportActions.UPDATE_LOCATION_ATTEMPT });
    try {
        const { data } = await axios.put(`https://jj3e8so6sf.execute-api.ap-southeast-1.amazonaws.com/dev/location`, locationData, {
            headers: {
                'authorization' : `${localStorage.getItem('hash_token')}`,
                'Access-Control-Allow-Origin': "*"
            }
        });
        const { message:msg, status } = data;
        if (status === 'error'){
            // message.error(msg);
            dispatch({ type: claimReportActions.UPDATE_LOCATION_ATTEMPT_FAILED });
            return false;
        }
        dispatch({ type: claimReportActions.UPDATE_LOCATION_ATTEMPT_SUCCESS, payload: data, });
        return true;
    } catch ({ response }) {
        // message.error(response.message ? response.message : 'something went wrong!!! Please try again later');
        dispatch({ type: claimReportActions.UPDATE_LOCATION_ATTEMPT_FAILED });
        return false;
    }
};

export default reducer;
