import React, { useEffect, useState } from "react";
import "./Input.css";

interface IProps {
    _ref?: any;
    id?: string;
    meta?: any;
    input?: any;
    step?: any;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    value?: any;
    pagesCount?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: any;
    onEnterKeyUp?: any;
    type?: string;
}

const Input = (props: IProps) => {
    const {
        _ref,
        id,
        meta,
        input,
        type,
        step,
        className,
        placeholder,
        disabled,
        value,
        pagesCount,
        onChange,
        onClick,
        onEnterKeyUp
    } = props;
    const { touched, error } = (meta || {});

    const errorClass = touched && error ? "is-invalid" : "";
    const newClassName = `form-control input ${className} ${errorClass}`;

    if (onChange || value) {
        return <input
            ref={_ref}
            id={id}
            type={type}
            step={step}
            placeholder={placeholder}
            disabled={disabled || false}
            className={newClassName}
            defaultValue={value}
            onClick={onClick}
            onChange={onChange}
            onKeyUp={onEnterKeyUp}
            max={pagesCount}
            min={1}
        />;
    }

    return <input
        ref={_ref}
        id={id}
        type={type} {...input}
        step={step}
        placeholder={placeholder}
        disabled={disabled}
        className={newClassName}
    />;
};

export default Input;
