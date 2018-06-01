// @flow

import React from 'react';
import { Row, Col } from 'reactstrap';

import type { UserProfileType } from "../../utils/mediumAPI";

import './UserProfile.css';

type PropsType = {
    userProfile: UserProfileType
};

export default function UserProfile({ userProfile }: PropsType) {
    return (
        <Row>
            <Col sm={{ size: 3 }} className="text-center" >
                <img className="UserProfile_ProfileImage rounded-circle"
                    src={userProfile.imageUrl}
                    alt={`Image of ${userProfile.name}`}
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