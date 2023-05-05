import React, {Component} from "react";
import Modal from "react-modal";
import styled from "styled-components";


class ModalRegister extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return <Modal
            isOpen={this.props.open}
            onRequestClose={this.props.onClose}
            overlayClassName={"OverlyRegister"}
        >
            <div className="header">
                <div className="title">
                    Inscription
                </div>
            </div>
            <div className="body">
                
            </div>
            <div className="footer">
                
            </div>
        </Modal>
    }

}


export default ModalRegister;
