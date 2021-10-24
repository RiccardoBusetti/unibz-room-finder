import { useState } from "react";
import checkAvailability from "../api/availability";
import { formatDateForServer, transformAvailabilities } from "../utils/functions";
import axios from 'axios';

export default function useData() {
    const [availability, setAvailability] = useState(undefined);
    const [isLoadingAvailability, setLoadingAvailability] = useState(false);
    const [localSource, setLocalSource] = useState(undefined);
    const [error, setError] = useState(undefined);

    const checkAvailabilityFor = async (room, date) => {
        if (localSource) {
            localSource.cancel();
            setLocalSource(undefined);
        }

        if (room) {
            try {
                setError(undefined);
                setLoadingAvailability(true);
                const newLocalSource = axios.CancelToken.source();
                const response = await checkAvailability(room, formatDateForServer(date), newLocalSource.token);
                setLocalSource(newLocalSource);
                setLoadingAvailability(false);

                if (response.data) {
                    const data = {
                        room: response.data.room,
                        isDayEmpty: response.data.isDayEmpty,
                        availabilities: transformAvailabilities(response.data.availabilities)
                    };
                    console.log("Availability received");
                    console.log(data);

                    setAvailability(data);
                }
            } catch (err) {
                setAvailability(undefined);
                setLoadingAvailability(false);
                setError("An error occurred while loading the room availabilities, try again.");
            }
        } else {
            setAvailability(undefined);
        }
    }

    return {
        availability,
        error,
        isLoadingAvailability,
        checkAvailabilityFor
    };
}
