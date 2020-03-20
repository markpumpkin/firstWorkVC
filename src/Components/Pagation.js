import React, { Component } from 'react';

class Pagation extends Component {
    render() {
        return (
            <div className="col">
                <div className="colContentPagation">
                    <div className="textInfo">
                        1 đến 20 trong tổng số 58
                    </div>
                    <div className="panagationNumber">
                        <div className="element">
                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                        </div>
                        <div className="element active">
                            1
                        </div>
                        <div className="element">
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pagation;