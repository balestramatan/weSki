import React from 'react';

import './HotelList.css';

export interface IProps {
    hotels: any[];
}

const HotelsList = (props: IProps) => {
    const {hotels} = props;

    return (
        <div>
            {
                hotels?.map((hotel: any) => {
                    const {HotelDescriptiveContent} = hotel;
                    const mainImage = HotelDescriptiveContent?.Images[0];
                    const rating = hotel.HotelInfo.Rating;
                    const {HotelInfo: {Position: {Distances}}} = hotel;
                    const distanceFromCenter = Distances.filter((distance: any) => distance.type === 'city_center')[0].distance;
                    const {PricesInfo: {AmountAfterTax}} = hotel;

                    return (
                        <div key={hotel.HotelCode} className={'hotel-item'}>
                            <div className={'hotel-image'}>
                                <img className={'image'} src={mainImage.URL} alt={mainImage.URL}/>
                            </div>

                            <div className={'hotel-item__content'}>
                                <span>{hotel.HotelName}</span>

                                <div>
                                    {rating + " Stars"}
                                </div>

                                <div>
                                    {hotel.Rating}
                                </div>

                                <div>
                                    {distanceFromCenter + " KM from center"}
                                </div>

                                <div className={'separator'}/>

                                <div>
                                    {`${AmountAfterTax}$`}
                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
};

export default HotelsList;