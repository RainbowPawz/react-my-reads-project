import React from 'react'
import PropTypes from 'prop-types';

class ConfirmModalAdded extends React.Component {
    static propTypes = {
        closeConfirmModal: PropTypes.func.isRequired,
        textObject: PropTypes.object.isRequired
    }

    render() {
        const { title, shelf } = this.props.textObject;

        return (
            <div className='modal'>
                {
                    <div className='modal-body'>
                        <button
                            className='close-confirm'
                            onClick={this.props.closeConfirmModal}></button>
                        <h1> Success! </h1>
                        <h3> {title} was added to the shelf {shelf}!</h3>
                    </div>
                }
            </div>
        )
    }
}

export default ConfirmModalAdded;
