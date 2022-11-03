import Select from "react-select";

import './SelectAdapter.css'

export const SelectAdapter = (props: any, chosenValues: any, onUpdateChange: any, options: any) => {
    const {input, ...rest} = props;

    return (
        <Select
            className={'select-input'}
            {...input}
            {...rest}
            value={chosenValues}
            options={options}
            onChange={onUpdateChange}
        />
    )
};