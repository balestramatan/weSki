import * as React from 'react';
import {useState} from "react";

import Button from 'react-bootstrap/Button';
import {Field, Form} from 'react-final-form';
import Error from '../../../assests/errors/erros';

import './SearchBar.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

import {FaSearch} from "react-icons/fa";
import Input from "./Input/Input";
import DateRangePicker from "react-bootstrap-daterangepicker";
import {SelectAdapter} from "../SelectAdapter/SelectAdapter";
import {destinationOptions} from "../../../assests/enums/destinationOptions";
import {Destination} from "../../../assests/types/destination";
import moment from "moment";
import HotelsFetcher from "../../../../infrastructure/fetchers/HotelsFetcher";

export interface IProps {
    setHotels: any;
    setLoading: any;
}

const SearchBarComponent = (props: IProps) => {
    const [fromDate, setFromDate] = useState<Date>(moment().toDate());
    const [toDate, setToDate] = useState<Date>(moment().toDate());
    const [chosenDestination, setChosenDestination] = useState<Destination>({value: -1, label: 'Choose Destination'});

    const {setHotels, setLoading} = props;
    let manuallyUpdateFormState;

    const validateForm = (values: any) => {
        const errors: any = {};
        return errors;
    }

    const handleCallback = (from: any, to: any) => {
        setFromDate(from._d);
        setToDate(to._d);
    }

    const handleFormSubmit = async (values: any) => {
        setLoading(true);
        const bodyRequest = {
            query: {
                ski_site: chosenDestination.value,
                from_date: fromDate.toISOString(),
                to_date: toDate.toISOString(),
                group_size: parseInt(values.groupSize),
            }
        }

        const {data} = await HotelsFetcher.fetchHotels(JSON.parse(JSON.stringify(bodyRequest)));

        let allHotels: any = [];

        data.forEach((hotelsList: any) => {
            hotelsList.forEach((hotel: any) => {
                allHotels.push(hotel);
            })
        })
        setHotels(allHotels);

        setLoading(false);
    }

    const onUpdateDestination = (value: any) => setChosenDestination(value)

    return (
        <Form
            initialValues={{fromDate, toDate}}
            validate={validateForm}
            onSubmit={(values) => handleFormSubmit(values)}
            mutators={{
                updateFormState: ([field, value]: any, state: any, {changeValue}: any) => {
                    changeValue(state, field, () => value);
                },
            }}
            render={({handleSubmit, form}) => {
                manuallyUpdateFormState = form.mutators.updateFormState;
                return (
                    <form className='form-style' onSubmit={handleSubmit}>
                        <div className='mt-2'>
                            <Field
                                name='destination'
                                id='destination'>
                                {({input}) => SelectAdapter(input, chosenDestination, onUpdateDestination, destinationOptions)}
                            </Field>
                            <Error name='action'/>
                        </div>

                        <div className='mt-2'>
                            <Field
                                id='groupSize'
                                name='groupSize'
                                component={Input}
                                placeholder={'Group Size'}
                                type='number'
                            />
                            <Error name='groupSize'/>
                        </div>

                        <div className='mt-2'>
                            <Field placeholder={'Dates'} name='dates' id='dates'>
                                {({input}) =>
                                    <DateRangePicker initialSettings={{fromDate, toDate}}
                                                     onCallback={handleCallback}>
                                        <input type="text" className="input"/>
                                    </DateRangePicker>
                                }
                            </Field>
                            <Error name='dates'/>
                        </div>
                        <div className='submit-button'>
                            <Button type='submit'>
                                <FaSearch/>
                                <span className='ml-2'>Search</span>
                            </Button>
                        </div>
                    </form>
                );
            }}
        />
    )
}

export default SearchBarComponent;