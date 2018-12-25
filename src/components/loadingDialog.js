import React from 'react'

class LoadingDialog extends React.Component {

    render() {
        return (
            <div className='popup'>
                {
                    <div className='loader_inner'>
                        <div className='loader'></div>
                    </div>
                }
            </div>
        );
    }
}

export default LoadingDialog;