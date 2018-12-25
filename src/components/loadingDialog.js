import React from 'react'

const LoadingDialog = () => {

    return (
        <div className='popup'>
            {
                <div className='loader_inner'>
                    <div className='loader'></div>
                </div>
            }
        </div>
    )
}

export default LoadingDialog;
