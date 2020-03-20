import React, { Component } from 'react';

export class FormAddEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            albumId: '',
            id: '',
            title: '',
            url: '',
            thumbnailUrl: '',
        }
    }
    
    handleChangeImage = (evt) => {
        var self = this;
        var reader = new FileReader();
        var file = evt.target.files[0];
    
        reader.onload = function(upload) {
            self.setState({
                url: upload.target.result
            });
        };
        reader.readAsDataURL(file);
        
        
        setTimeout(function() {
            console.log("Uploaded img: " + self.state.url);
        }, 1000);
    }

    showAlbum =(albumId) => {
        return (
            this.props.dataAlbum.map(((cloud, indexPhoto) =>
                    {
                        if(albumId !== '' && cloud.id === albumId){
                            return (
                                <option selected value={cloud.id} key={indexPhoto} name={cloud.title}>Album: {cloud.id}</option>
                            )
                        } 
                        else {
                            return (
                                <option value={cloud.id} key={indexPhoto} name={cloud.title}>Album: {cloud.id}</option>
                            )   
                        }
                    }
                ))
        );
    }

    isChange = (event) => {
        const name = event.target.name; 
        const value = event.target.value; 

        this.setState({
            [name]: value
        })
    }

    clickSaveAndClose = (albumId,id,title,url,thumbnailUrl) => {
        this.props.addItem(albumId,id,title,url,thumbnailUrl)
        this.props.changeActivePopup();
        this.setState({
            id: ''
        })
    }

    componentDidMount () {
        if(this.props.idImgEdit !== 0) {
            this.props.dataPhotos.forEach(itemImg => {
                if(itemImg.id === this.props.idImgEdit) {
                    this.setState({
                        albumId:itemImg.albumId,
                        title:itemImg.title,
                        url:itemImg.url,
                        thumbnailUrl:itemImg.thumbnailUrl
                    });
                    // setTimeout(
                    //     function() {
                    //         // console.log("State albumId la: "+ this.state.albumId);
                    //         // console.log(typeof(this.state.albumId));
                    //         // console.log("State title la: "+ this.state.title);
                    //         // console.log("State url la: "+ this.state.url);
                    //         // console.log("State thumbnailUrl la: "+ this.state.thumbnailUrl);
                    //     }
                    //     .bind(this),
                    //     500
                    // );
                    
                }
            });
        }
        if(this.props.isCreateImg === true) {
            this.setState({
                albumId: '',
                title: '',
                url: '',
                thumbnailUrl: ''
            });
        }
        if(this.props.idImgEdit !== 0) {
            this.setState({
                id: this.props.idImgEdit
            });
            console.log("Edit ImgID: " + this.props.idImgEdit);
        }
    }

    showImgDemo = () => {
        if(this.state.url !== '') {
            return (
                <div className="showDemoImg">
                    <img src={this.state.url} alt="imgAlt" />
                </div>
            );
            
        }
    }  

    render() {
        return (
            <div className="WapPopup">
                <div className="inFo">
                    <div className="blogImg">
                        <div className="form-group">
                            {this.showImgDemo()}
                            <div className="blogUpload">
                                <input 
                                    onChange={(evt) => this.handleChangeImage(evt)}
                                    type="file" 
                                    ref="file"
                                    id="fileUpload"
                                    name="url"
                                    className="form-control" 
                                    encType="multipart/form-data"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="blogName">
                        <h3 className="titleInfo">Thông tin ảnh</h3>
                        <div className="form-group">
                            <label>Tên ảnh</label>
                            <input
                                onChange={(event) => this.isChange(event)}
                                className="form-control" 
                                name="title" 
                                type="text" 
                                defaultValue={this.state.title}
                            />
                        </div>
                        <div className="form-group">
                            <label>Album</label>
                            <select 
                                defaultValue={this.state.albumId}
                                onChange={(event) => this.isChange(event)}
                                className="form-control"
                                name="albumId"
                            >
                                <option >Chọn Album</option>
                                {this.showAlbum(this.state.albumId)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="ActionForm">
                    <div 
                        onClick={()=>this.props.changeActivePopup()}
                        type="button" 
                        className="btn btlink lnCant">
                        <i className="fa fa-ban" aria-hidden="true"></i>
                        Đóng
                    </div>
                    <div 
                        onClick={(albumId,id,title,url,thumbnailUrl) => this.clickSaveAndClose(this.state.albumId,this.state.id,this.state.title,this.state.url,this.state.thumbnailUrl) }
                        type="button" 
                        className="btn btlink lSave"
                    >
                        <i className="fa fa-floppy-o" aria-hidden="true"></i>
                        Lưu
                    </div>
                </div>
            </div>
        );
    }
}

export default FormAddEdit;
