import React from 'react';
import { Spinner } from 'react-bootstrap';

const ButtonSubmitReset = (props) => {
    const { btnloader, onsubmitFun, className } = props;
    

    return (
        <div className={`form-action-btn ${className}`}>
            <button type="submit" className="btn btn-primary" disabled={btnloader ? true : false}>
                {btnloader ? <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className='mr-2' />
                </>
                    : ''
                }
                {btnloader ? 'loading...' : 'Submit'}</button>
            <button type="button" className="btn btn-secondary m-2" onClick={onsubmitFun}>Reset</button>

        </div>
    )
}
export default ButtonSubmitReset;