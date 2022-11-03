import React from 'react';
import { Field } from 'react-final-form';

const Message = ({ color, message }) => (
    <div className="m-0" style={{ color }}>
        <small>{message}</small>
    </div>
);

const Error = ({ name, color = 'red'}) => (
    <Field
        name={name}
        subscription={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) => (touched && error ? <Message color={color} message={error} /> : null)}
    />
);

export default Error;
