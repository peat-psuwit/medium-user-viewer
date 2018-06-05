// @flow

import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import { connect } from 'react-redux';

import { logout } from '../actions/authActions';

import type { StateType } from '../reducers';

function mapStateToProp(state: StateType) {
    return {
        auth: state.auth
    };
}

const dispatchToPropMap = {
    logout
};

type NavHeaderPropsType = {
    ...$Call<typeof mapStateToProp, *>,
    ...typeof dispatchToPropMap
};

type NavHeaderStateType = {
    isOpen: boolean
};

class NavHeader extends Component<NavHeaderPropsType, NavHeaderStateType> {
    constructor(props: NavHeaderPropsType) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleLogoutClick = () => {
        this.props.logout();
        this.setState({
            isOpen: false
        });
    }

    render() {
        return (
            <Navbar light expand="md">
                <h4>Medium User Viewer</h4>
                <NavbarToggler onClick={this.toggle} />
                {this.props.auth && this.props.auth.currentToken ?
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#" onClick={this.handleLogoutClick}>Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                : null}
            </Navbar>
        );
    }
}

export default connect(mapStateToProp, dispatchToPropMap)(NavHeader);