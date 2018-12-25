import React from 'react'
import PropTypes from 'prop-types';

class ConfirmBookAdded extends React.Component {
    static propTypes = {
        closePopup: PropTypes.func.isRequired,
        textObject: PropTypes.object.isRequired
    }

    render() {
        const { title, shelf } = this.props.textObject;

        return (
            <div className='popup'>
                {
                    <div className='popup_inner'>
                        <button
                            className='close-confirm'
                            onClick={this.props.closePopup}>close me</button>
                        <h1> Success! </h1>
                        <h3> {title} was added to the shelf {shelf}!</h3>
                    </div>
                }
            </div>
        )
    }
}

export default ConfirmBookAdded;
