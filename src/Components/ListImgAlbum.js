import React, { Component } from 'react';

class ListImgAlbum extends Component {
    
    itemImgDetail = (indexPhoto,albumId,id,title,url,thumbnailUrl) => {
        return(
            <div className="col-4" key={indexPhoto} stt={id} albumid={albumId}>
                <div className="card itemImgDetal">
                    <img className="card-img-top" src={url} alt="imgAlt" />
                    <div className="card-body">
                        <h4 className="itemTitle">{title}</h4>
                        <div className="linksAction">
                            <div 
                                type="button" 
                                className="btn link lEdit" 
                                onClick={()=>this.props.idItemEdit(id)} 
                            >
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                            </div>
                            <div 
                                type="button" 
                                className="btn link lDelete"
                                onClick={()=>this.props.idItemDelete(id)}
                            >
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    showImgDetail =(id,titleSeach) => {
        return (
            <div className={"row rowBlog"}>
                {
                    this.props.dataImg.map(((cloud, indexPhoto) =>
                        {
                            if(id === cloud.albumId && cloud.title.indexOf(titleSeach) !== -1){
                                return (
                                    this.itemImgDetail(indexPhoto,cloud.albumId,cloud.id,cloud.title,cloud.url,cloud.thumbnailUrl)
                                )
                            }
                            else if(id === cloud.albumId && titleSeach === ''){
                                return (
                                    this.itemImgDetail(indexPhoto,cloud.albumId,cloud.id,cloud.title,cloud.url,cloud.thumbnailUrl)
                                )
                            } 
                            else if(id === 0 && cloud.title.indexOf(titleSeach) !== -1){
                                return (
                                    this.itemImgDetail(indexPhoto,cloud.albumId,cloud.id,cloud.title,cloud.url,cloud.thumbnailUrl)
                                )
                            } 
                            else if(id === 0 && titleSeach === '') {
                                return (
                                    this.itemImgDetail(indexPhoto,cloud.albumId,cloud.id,cloud.title,cloud.url,cloud.thumbnailUrl)
                                )
                            }
                        }
                    ))
                }
            </div>
        );
    }
    
    render() { 
        return (
            <div className="blogListImg">
                {
                    this.showImgDetail(this.props.idAlbum, this.props.textSearch)
                }
            </div>
        );
    }
}

export default ListImgAlbum;