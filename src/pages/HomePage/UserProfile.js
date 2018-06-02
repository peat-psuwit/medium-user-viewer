// @flow

import React from 'react';
import { Row, Col } from 'reactstrap';
import Spinner from 'react-spinkit';

import type { UserProfileType } from "../../utils/mediumAPI";

import './UserProfile.css';

type PropsType = {
    isLoading: boolean,
    userProfile: ?UserProfileType
};

export default function UserProfile({ isLoading, userProfile }: PropsType) {
    if (isLoading || !userProfile)
        return <Spinner name='circle' fadeIn='none' />

    return (
        <Row>
            <Col sm={{ size: 3 }} className="text-center" >
                <img className="UserProfile_ProfileImage rounded-circle"
                    src={userProfile.imageUrl}
                    alt={`userProfile.name`}
                />
            </Col>

            <Col sm={{ size: 9 }} >
                <a href={userProfile.url} target="_blank">
                    <h3>{userProfile.name}</h3>
                    <span>@{userProfile.username}</span>
                </a>
            </Col>
        </Row>
    );
}