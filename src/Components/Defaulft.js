import React, { Component } from 'react';
import Search from './Search';
import Pagation from './Pagation';
import FormAddEdit from './FormAddEdit';
import ListImgAlbum from './ListImgAlbum';



class Defaulft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActivePopup: false,
            dataAlbum:[],
            dataPhotos:[],
            albumId: 0,
            textSearch:'',
            idEditItem:''
        }
    }
    
    componentDidMount() {
        var urlAlbums = "https://jsonplaceholder.typicode.com/albums";
        var urlPhotos = "https://jsonplaceholder.typicode.com/photos";
        fetch(urlAlbums)
            .then(response => {
                return response.json();
            })
            .then(d => {
                this.setState({ dataAlbum: d });
            })
            .catch(error => console.log(error))

        // ------------
        fetch(urlPhotos)
            .then(response => {
                return response.json();
            })
            .then(d => {
                this.setState({ dataPhotos: d });
            })
            .catch(error => console.log(error))

        
    }

    fetchData = (albumId,title,url,thumbnailUrl) => {
        var urlPhotos = "https://jsonplaceholder.typicode.com/photos";
        fetch(urlPhotos, {
            method: 'POST',
            body: JSON.stringify({
                albumId: albumId,
                title: title,
                url: url,
                thumbnailUrl: thumbnailUrl
            }),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))

        console.log('created new Img');
        
    };

    fetchEditData = (albumId,id,title,url,thumbnailUrl) => {
        var urlPhotos = "https://jsonplaceholder.typicode.com/photos/" + id;
        fetch(urlPhotos, {
            method: 'PATCH',
            body: JSON.stringify({
                albumId: albumId,
                id: id,
                title: title,
                url: url,
                thumbnailUrl: thumbnailUrl
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))

        console.log('edited Img');
        
    };

    changeStateActivePopup = () => {
        this.setState({
            isActivePopup: !this.state.isActivePopup,
            isCreateImg: false
        })
       
    }

    clickAddNewImg = () => {
        this.changeStateActivePopup();
        this.setState({
            isCreateImg: true,
            idEditItem: ''
        })
    }

    clickEditData = (idImg) => {
        this.changeStateActivePopup();
        this.setState({
            idEditItem:idImg
        })
        
    }
    clickDeleteData = (idImg) => {
        var urlPhotos = "https://jsonplaceholder.typicode.com/photos/" + idImg;
        fetch(urlPhotos, {
            method: 'DELETE'
        })
        console.log("Deleted img id: " + idImg);
    }
    
    getNewItem = (albumId,id,title,url,thumbnailUrl) => {

        if(id === ''){
            // var itemNew = {}
            // itemNew.albumId = albumId;
            // itemNew.title = title;
            // itemNew.url = url;
            // itemNew.thumbnailUrl = thumbnailUrl;
    
            // console.log("Create Img");
            // console.log(itemNew);
            
            this.fetchData(albumId,title,url,thumbnailUrl);
        }
        else {

            this.fetchEditData(albumId,id,title,url,thumbnailUrl);
            // console.log('Edit Img');
        }
    }

    clickPopup = () => {
        if(this.state.isActivePopup === true) {
            return (
                <div className="nbPopup is-visible">
                    <div className="nbPopup_container">
                        <div className="wap">
                            <div className="contentPopup">
                                <FormAddEdit 
                                    addItem={(albumId,id,title,url,thumbnailUrl) => this.getNewItem(albumId,id,title,url,thumbnailUrl)}
                                    dataAlbum={this.state.dataAlbum} 
                                    dataPhotos={this.state.dataPhotos} 
                                    idImgEdit={this.state.idEditItem}
                                    isCreateImg={this.state.isCreateImg}
                                    changeActivePopup={() => this.changeStateActivePopup()}
                                ></FormAddEdit>
                            </div>
                        </div>
                        <div type="button" className="btn nbPopup_Close">
                            <span onClick={()=>this.changeStateActivePopup()}>X Đóng</span>
                        </div>
                    </div>
                </div>
            );
        }
    }
    changeShowAlbum = (id) => {
        this.setState({
            albumId: parseInt(id)
        })
    }
    textSeach = (textForm) => {
        this.setState({
            textSearch:textForm
        })
    }
    
    render() {
        return (
            <div className="WapperMain">
                <div className="blogHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col colButtonAdd">
                                <div
                                    className="btn btn-AddImg nbPopup_Trigger"
                                    type="button"
                                    onClick={() => this.clickAddNewImg()}
                                >
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                    Tạo ảnh mới
                                </div>
                            </div>
                            {this.clickPopup()}
                        </div>
                    </div>
                </div>
                <div className="blogContent">
                    <div className="container">
                        <div className="row">
                            <Search 
                                dataAlbum={this.state.dataAlbum} 
                                idAlbum={(idAlbum)=> this.changeShowAlbum(idAlbum)} 
                                textSeach={(textInput)=> this.textSeach(textInput)} 
                            />
                            <Pagation />
                        </div>
                        <div className="row">
                            <ListImgAlbum 
                                idItemEdit={(idImg) => this.clickEditData(idImg)}
                                idAlbum={this.state.albumId} 
                                textSearch={this.state.textSearch} 
                                dataImg={this.state.dataPhotos} 
                                idItemDelete={(idImg) => this.clickDeleteData(idImg)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Defaulft;