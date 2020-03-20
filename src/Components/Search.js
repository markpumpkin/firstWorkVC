import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            temValue: 0,
            tempValueText:''
        }
    }
    

    showAlbum =() => {
        return (
            this.props.dataAlbum.map(((cloud, indexPhoto) =>
                    {
                        return (
                            <option value={cloud.id} key={indexPhoto} name={cloud.title}>Album: {cloud.id}</option>
                        )
                    }
                ))
        );
    }

    changeAlbum = (event) => {
        this.setState({
            temValue: event.target.value,
        })
        
    }
    changeTextBox = (event) => {
        this.setState({
            tempValueText: event.target.value,
        })
    }

    searchClick = () => {
        this.props.idAlbum(this.state.temValue);
        this.props.textSeach(this.state.tempValueText);
    }

    render() {
        return (
            <div className="col">
                <div className="colContentForm">
                    <div className="formInput">
                        <div className="form-group">
                            <select className="form-control" onChange={(event) => this.changeAlbum(event)}>
                                <option value="0">Tất cả</option>
                                {this.showAlbum()}
                            </select>
                        </div>
                        <div className="form-group formInSearch">
                            <input 
                                onChange={(event) => this.changeTextBox(event)}
                                type="text" 
                                placeholder="Nhập từ khóa" 
                                className="form-control" 
                            />
                            <div 
                            onClick={() => this.searchClick() }
                            type="button" 
                            className="btn btnSubmit">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;