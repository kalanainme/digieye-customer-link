import axios from "axios";
import {BASE_URL} from "../config/config";

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
    SAVE_FILE_KEYS_ATTEMPT: 'SAVE_FILE_KEYS_ATTEMPT',
    SAVE_FILE_KEYS_ATTEMPT_FAILED: 'SAVE_FILE_KEYS_ATTEMPT_FAILED',
    SAVE_FILE_KEYS_ATTEMPT_SUCCESS: 'SAVE_FILE_KEYS_ATTEMPT_SUCCESS',

};

const initialState = {
    isLoading: false,
    mediaUploadURL: null,
    locationData: null,
    uploadURLData: null,
    fileData: null

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
            case claimReportActions.GET_MEDIA_UPLOAD_URL_ATTEMPT_SUCCESS: {
                return { ...state, isLoading: false, uploadURLData: action.payload };
            }
            case claimReportActions.GET_MEDIA_UPLOAD_URL_ATTEMPT_FAILED: {
                return { ...state, isLoading: false };
            }
            case claimReportActions.GET_MEDIA_UPLOAD_URL_ATTEMPT: {
                return { ...state, isLoading: true };
            }
            case claimReportActions.GET_CUSTOMER_LINK_ATTEMPT_SUCCESS: {
                return { ...state, isLoading: false, uploadURLData: action.payload };
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
            return { ...state, isLoading: false, locationData: action.payload};
        }
        case claimReportActions.UPDATE_LOCATION_ATTEMPT_FAILED: {
            return { ...state, isLoading: false };
        }
        case claimReportActions.SAVE_FILE_KEYS_ATTEMPT_SUCCESS: {
            return { ...state, isLoading: false, fileData: action.payload };
        }
        case claimReportActions.SAVE_FILE_KEYS_ATTEMPT_FAILED: {
            return { ...state, isLoading: false };
        }
        case claimReportActions.SAVE_FILE_KEYS_ATTEMPT: {
            return { ...state, isLoading: true };
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

//update incident location
export const updateLocation = (locationData, accountId) => async dispatch => {
    dispatch({ type: claimReportActions.UPDATE_LOCATION_ATTEMPT });
    try {
        const { data } = await axios.post(`${BASE_URL}${accountId}/web/tracker/v1/location`, locationData);
        console.log(data)

        const { message, success } = data;
        if (success === 'false'){
            dispatch({ type: claimReportActions.UPDATE_LOCATION_ATTEMPT_FAILED });
            return false;
        }
        dispatch({ type: claimReportActions.UPDATE_LOCATION_ATTEMPT_SUCCESS, payload: data});
        return true;
    } catch ({ response }) {
        // message.error(response.message ? response.message : 'something went wrong!!! Please try again later');
        dispatch({ type: claimReportActions.UPDATE_LOCATION_ATTEMPT_FAILED });
        return false;
    }
};

//generate media upload url
export const getMediaUploadUrl = (mediaData, accountId) => async dispatch => {
    dispatch({ type: claimReportActions.GET_MEDIA_UPLOAD_URL_ATTEMPT });
    try {
        const { data } = await axios.post(`${BASE_URL}${accountId}/web/tracker/v1/generateUploadUrlData`, mediaData);
        const { message, success } = data;
        if (success === 'false'){
            // message.error(msg);
            dispatch({ type: claimReportActions.GET_MEDIA_UPLOAD_URL_ATTEMPT_FAILED });
            return false;
        }
        dispatch({ type: claimReportActions.GET_MEDIA_UPLOAD_URL_ATTEMPT_SUCCESS, payload: data.data, });
        return data.data;
    } catch ({ response }) {
        // message.error(response.message ? response.message : 'something went wrong!!! Please try again later');
        dispatch({ type: claimReportActions.GET_CUSTOMER_LINK_ATTEMPT_FAILED });
        return false;
    }
};

// Upload the image to S3 bucket using the pre-signed URL
export const UploadImagesToS3 = (file, preSignedUrl) => async dispatch => {

    dispatch({ type: claimReportActions.UPLOAD_IMAGES_TO_S3_ATTEMPT });
    try {
        const { data } = await axios.put(preSignedUrl, file, {
            headers: {
              'Content-Type': file.type,
            },});
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

//save fileKeys
export const saveFileKeys = (fileData,accountId) => async dispatch => {
    dispatch({ type: claimReportActions.SAVE_FILE_KEYS_ATTEMPT });
    try {
        const { data } = await axios.post(`${BASE_URL}${accountId}/web/tracker/v1/saveUploadedImages`, fileData);
        const { message, success } = data;
        if (success === 'false'){
            // message.error(msg);
            dispatch({ type: claimReportActions.SAVE_FILE_KEYS_ATTEMPT_FAILED });
            return false;
        }
        dispatch({ type: claimReportActions.SAVE_FILE_KEYS_ATTEMPT_SUCCESS, payload: data.data });
        return true;
    } catch ({ response }) {
        // message.error(response.message ? response.message : 'something went wrong!!! Please try again later');
        dispatch({ type: claimReportActions.SAVE_FILE_KEYS_ATTEMPT_FAILED });
        return false;
    }
};


export default reducer;
