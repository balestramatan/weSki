const request = require('request');
const axios = require('axios');


const API_END_POINTS = [
    'https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator',
]

const BODY_MAPPER = {
    ['https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator']: {
        ski_site: 'ski_site',
        group_size: 'group_size',
        from_date: 'from_date',
        to_date: 'to_date'
    }
}

const sendToServer = async (_body, endPoint) => {
    const {data: {body: {accommodations}}} = await axios.post(endPoint, _body);
    return accommodations;
}

const sendApisCalls = async (ski_site, group_size, from_date, to_date) => {
    const promises = API_END_POINTS.map(endPoint => {
        const requestBodyMapper = BODY_MAPPER[endPoint];

        const requestBody = {
            "query": {
                [requestBodyMapper['ski_site']]: ski_site,
                [requestBodyMapper['group_size']]: group_size,
                [requestBodyMapper['from_date']]: from_date,
                [requestBodyMapper['to_date']]: to_date
            }
        }

        return sendToServer(requestBody, endPoint);
    })

    return await Promise.all(promises);
}

module.exports = async (req, res) => {
    const response = await sendApisCalls(req.body.query.ski_site, req.body.query.group_size, req.body.query.from_date, req.body.query.to_date)
    res.status(200).send(response);
}