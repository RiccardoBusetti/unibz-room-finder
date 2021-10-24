import axios from 'axios';
import { AVAILABILITY_ENDPOINT } from './base';

const checkAvailability = async (room, date, cancelToken) => {
    console.log(`Checking availability for ${room} on ${date}`);
    return await axios.get(AVAILABILITY_ENDPOINT, {
        params: { room, deviceTime: date },
        cancelToken,
    })
};

export default checkAvailability;