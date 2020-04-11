/* eslint eqeqeq: 'off', max-len: 'off', jsx-a11y/no-static-element-interactions: 'off' */

import React from 'react';
import PropTypes from 'prop-types';
import { addGlobalEventListener, removeGlobalEventListener } from '../../utils/misc';

import './_listflyout.less';

// const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
//     'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class ListFlyout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            letterFilter: null
        };

        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.inputRefCallback = (el) => { this.inputRef = el; };
    }

    onClick() {
        if (this.state.open) {
            this.close();
            return;
        }

        this.setState({
            open: true
        });

        this.isOpenClick = true;
        addGlobalEventListener('onclick', this.handleOutsideClick);
    }

    onTextChange() {
        this.forceUpdate();
    }

    close() {
        this.setState({
            open: false,
            letterFilter: null
        });

        removeGlobalEventListener('onclick', this.handleOutsideClick);
    }

    handleOutsideClick(event) {
        const el = event.target;
        if (this.isOpenClick) {
            this.isOpenClick = false;
            // return;
        }
        if (!el.matches('.flyout-container *')) {
            this.close();
        }
    }

    render() {
        const items = this.props.items ? this.props.items : [];
        let filteredItems = [];
        if (this.state.open) {
            filteredItems = items.filter((item) => {
                const upperCaseLabel = item.label.toUpperCase();
                if (this.state.letterFilter) {
                    if (upperCaseLabel[0] != this.state.letterFilter) {
                        return false;
                    }
                }

                if (this.inputRef && this.inputRef.value) {
                    if (upperCaseLabel.indexOf(this.inputRef.value.toUpperCase()) >= 0) {
                        return true;
                    }
                    return false;
                }
                return true;
            });
        }
        const icon = (
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 10 6'>
                <title>Icon-Arrow-Dropdown</title>
                <g id='Icons'>
                    <g id='Arrows-Copy' transform='translate(-45.000000, -47.000000)'>
                        <g id='Icon-Arrow-Dropdown' transform='translate(40.000000, 40.000000)'>
                            <rect id='Rectangle-Copy-3' className='st0' width='20' height='20' />
                            <path
                                id='Icon-Dropdown-Arrow-10x6'
                                className='st1'
                                d='M9.4,12.7L5.3,8.6C5.2,8.5,5.1,8.3,5.1,8.2C5,8.1,5,8,5,7.9s0-0.2,0.1-0.3     l0,0c0-0.1,0.2-0.3,0.2-0.4c0.3-0.3,0.9-0.3,1.2,0l3.5,3.5l3.4-3.5c0.3-0.3,0.9-0.3,1.3,0C14.9,7.4,15,7.7,15,7.9     s-0.1,0.5-0.3,0.7l-4.1,4.2C10.5,12.9,10.2,13,10,13S9.5,12.9,9.4,12.7z' />
                        </g>
                    </g>
                </g>
            </svg>
        );
        return (
            <div className='flyout-container'>
                <button className='list-flyout' onClick={this.onClick}>
                    <div className='selected-value'>
                        {this.props.value}{icon}
                    </div>
                </button>
                {
                    this.state.open
                        ? (
                            <div className='options'>
                                <input
                                    type='text'
                                    placeholder={this.props.searchPlaceholder}
                                    ref={this.inputRefCallback}
                                    onChange={this.onTextChange} />
                                <span className='search-icon' />
                                <div className='items'>
                                    {filteredItems.map((item) => (
                                        <div
                                            key={item.path}
                                            className='item'
                                            onClick={() => this.props.clickCallback(item)}>
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                        : null
                }
            </div>
        );
    }
}

ListFlyout.propTypes = {
    value: PropTypes.string.isRequired,
    searchPlaceholder: PropTypes.string.isRequired,
    clickCallback: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string
    })).isRequired
};

export default ListFlyout;
