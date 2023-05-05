import React, {Component} from "react";
import ModalSignInUp from "../components/register/ModalSignInUp";

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return <div className=" container home_container">
            <ModalSignInUp
                open={true}
                handleDone={user => {
                    this.props.handleOpenDashboard(user);
                }}
            />
        </div>
    }
}

export default Home;