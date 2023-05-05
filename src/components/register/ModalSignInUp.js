import React, {Component} from "react";
import Modal from "react-modal";
import {check_username_exists, sign_up_api, sign_in_api} from "../../api";
import styled from "styled-components";
import { set } from "../../storage";
import "./modal.css";

const username_exists = "Ce nom d'utilisateur déjà existe!!";

class ModalSignInUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            errors: {},
            password: "",
            password2: "",
            selected_view: props.selected_view || "sign_up",
            server_error: "",
            username: "",
        };
    }

    handleUsernameChange = evt => {
        const {errors, selected_view} = this.state;
        errors.username = "";
        this.setState({
            username: evt.target.value,
            errors: errors,
        });
        if(selected_view === "sign_up"){
            if(this.typingUsernameTimer){
                clearTimeout(this.typingUsernameTimer);
            }
            this.typingUsernameTimer = setTimeout(() => {
                if(evt.target.value){
                    this.handleCheckUsernameExists(evt.target.value);
                }
            }, 1000);
        }
    }

    handlePasswordChange = evt => {
        const {errors, password2} = this.state;
        errors.password = "";
        if(!(evt.target.value && password2)){
            errors.passwords = "";
        }
        else if(evt.target.value !== password2){
            errors.passwords = "Les deux mots de passe ne correspondent pas!";
        }
        else{
            errors.passwords = "";
        }
        this.setState({
            password: evt.target.value,
            errors: errors,
        });
    }

    handlePassword2Change = evt => {
        const {errors, password} = this.state;
        errors.password2 = "";
        if(!(evt.target.value && password)){
            errors.passwords = "";
        }
        else if(evt.target.value !== password){
            errors.passwords = "Les deux mots de passe ne correspondent pas!";
        }
        else{
            errors.passwords = "";
        }
        this.setState({
            password2: evt.target.value,
            errors: errors,
        });
    }

    handleCheckUsernameExists = username => {
        var {errors, server_error} = this.state;
        check_username_exists(username).then(res => {
            server_error = "";
            if(res.user_exists){
                errors.username = username_exists;
            }
            else{
                errors.username = "";
            }
            this.setState({
                errors: errors,
                server_error: server_error,
            });
        }).catch(err => {
            console.log(err);
            server_error = "Une erreur est survenue. Merci de réessayer plus tard !";
            this.setState({
                errors: errors,
                server_error: server_error,
            });
        })
    }
    handleSubmit = evt => {
        let {errors, password, password2, selected_view, server_error, username} = this.state;
        server_error = "";
        let form_valid = true;
        if(errors.username === username_exists){
            form_valid = false;
        }
        else if(!username){
            errors.username = "Ce champs est requis!";
            form_valid = false;
        }
        if(!password){
            errors.password = "Ce champs est requis!";
            form_valid = false;
        }
        if(selected_view === "sign_up"){
            if(!password2){
                errors.password2 = "Ce champs est requis!";
                form_valid = false;
            }
            else if(password && password !== password2){
                errors.passwords = "Les deux mots de passe ne correspondent pas!";
                form_valid = false;
            }
        }
        if(form_valid){
            if(this.state.server_error){
                this.setState({
                    server_error: server_error,
                });
            }
            const data = {
                username: username,
                password: password,
            };
            (this.selected_view === "sign_up" ? sign_up_api : sign_in_api)(data).then(res => {
                if(res.user){
                    set("session_user", res.user);
                    this.props.handleDone(res.user);
                }
                else{
                    server_error = "Username ou mot de passe est incorrect!";
                    this.setState({
                        server_error: server_error,
                    });
                }
            }).catch(err => {
                console.log(err);
                server_error = "Une erreur est survenue. Merci de réessayer plus tard !";
                this.setState({
                    server_error: server_error,
                });
            })
        }
        else{
            this.setState({
                errors: errors,
                server_error: server_error,
            });
        }

    }

    render(){
        const {errors, password, password2, selected_view, server_error, username} = this.state;
        return <Modal
            isOpen={this.props.open}
            onRequestClose={this.props.onClose}
            overlayClassName={"OverlyRegister"}
        >
            <ModalContainerStyle>
                <div className="header">
                    <div className="tabs">
                        <div className={"tab btn sign_up " + (selected_view === "sign_up" ? "active" : "")} onClick={evt =>this.setState({
                            selected_view: "sign_up",
                        })}>
                            {"Inscription"}
                        </div>
                        <div className={"tab btn sign_up " + (selected_view === "sign_in" ? "active" : "")} onClick={evt => this.setState({
                            selected_view: "sign_in",
                        })}>
                            {"Connexion"}
                        </div>
                    </div>
                </div>
                <div className="body">
                    <div className="line">
                        <div className={"field"}>
                            <label>Username</label>
                            <input className={"username " + (errors.username ? "data_error" : "")} 
                                type="text" value={username} onChange={this.handleUsernameChange}
                            />
                            {errors.username &&
                                <div className="error">{errors.username}</div>
                            }
                        </div>
                    </div>
                    <div className="line">
                        <div className={"field"}>
                            <label>Mot de passe</label>
                            <input className={"password " + (errors.password || errors.password2S ? "data_error" : "")} 
                                type="password" value={password} onChange={this.handlePasswordChange}
                            />
                            {errors.password &&
                                <div className="error">{errors.password}</div>
                            }
                        </div>
                    </div>
                    {selected_view === "sign_up" && 
                        <div className="line">
                            <div className={"field"}>
                                <label>Confirmer le mot de passe</label>
                                <input className={"password2 " + (errors.passwordS || errors.password2 ? "data_error" : "")} 
                                    type="password" value={password2} onChange={this.handlePassword2Change}
                                />
                                {(errors.password2 || errors.passwords) &&
                                    <div className="error">{errors.password2 || errors.passwords}</div>
                                }
                            </div>
                        </div>
                    }
                    {server_error &&
                        <div className="error">{server_error}</div>
                    }
                    
                </div>
                <div className="footer">
                    <div className="btn validate" onClick={this.handleSubmit}>
                        {selected_view === "sign_up" ? "S'inscrire" : "Se connecter"}
                    </div>
                </div>
            </ModalContainerStyle>
        </Modal>
    }

}


const ModalContainerStyle = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .btn{
        cursor: pointer;
        border-radius: 15px;
        background: #12dddf;
        color: white;
        font-weight: bold;
        text-align: center;
        padding: 5px;
    }
    .header{
        .tabs{
            display: flex;
            .tab{
                width: 50%;
                border-radius: 5px;
                background: #c7c7c7;
                &.active{
                    background: #12dddf;
                }
            }
        }
    }
    .body{
        .line{
            .field{
                label{

                }
                input{
                    height: 30px;
                    border-radius: 5px;
                    border: solid 0.5px #b1bfcd;
                    font-size: 21px;
                    background-color: #f8f8f8 !important;
                    box-shadow: none;
                    margin: 4px 0;
                    width: calc(100% - 19px);
                    background-color: rgb(248, 248, 248) !important;
                    padding: 0;
                    padding-left: 15px;
                    &.data_error{
                        border-color: #ff0000;
                    }
                }
            }
        }
        .error{
            color: red;
        }
    }
    .footer{
        .validate{
            width: max-content;
            padding-right: 15px;
            padding-left: 15px;
            margin: auto;
        }
    }
`;

export default ModalSignInUp;
