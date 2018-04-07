import {
    postApi,
    getApi
} from '../utils';

export const addBookingAPI = postApi('/addBooking');
export const getBookingsAPI = getApi('/getBookings');