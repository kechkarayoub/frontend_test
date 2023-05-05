import React, {Component} from "react";
import styled from "styled-components";
import logout_icon from "../logout.svg";

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return <DashboardStyle className=" container dashboard_container">
            <div className="header">
                <div className="logout">
                    <img src={logout_icon} onClick={evt => this.props.logout()}/>
                </div>
            </div>
            <div className="content">
                <div className="text">Bienvenue</div>
            </div>
        </DashboardStyle>
    }
}

const DashboardStyle = styled.div`
    height: 100%;
    .header{
        height: 70px;
        padding: 0px 100px;
        padding-top: 30px;
        .logout{
            width: max-content;
            float: right;
            img{
                cursor: pointer;
                width: 40px;
                height: 40px;
            }
        }
    }
    .content{
        height: calc(100% - 100px);
        padding: 0 100px;
        position: relative;
        .text{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 55px;
        }
    }
`;

export default Dashboard;