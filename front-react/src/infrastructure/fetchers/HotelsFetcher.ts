import {GetHotelRequest} from "../interfaces/ApiRequest.interface";
import axios from "axios";

class HotelsFetcher {
    private readonly url: string;

    constructor() {
        this.url = 'http://localhost:5000/api/v1/getHotels';
    }

    public async fetchHotels(bodyRequest: any) {
        return await axios.post(this.url, bodyRequest)
    }

}

export default new HotelsFetcher();