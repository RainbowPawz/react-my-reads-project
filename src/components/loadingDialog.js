import React from 'react'

const LoadingDialog = () => {

    return (
        <div className='modal'>
            {
                <div className='loader-body'>
                    <div className='loader'></div>
                </div>
            }
        </div>
    )
}

export default LoadingDialog;
