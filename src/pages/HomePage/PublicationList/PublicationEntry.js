// @flow

import React from 'react';
import { Row, Col } from 'reactstrap';

import type { PublicationType } from "../../../utils/mediumAPI";

type PropsType = {
    publication: PublicationType
}

export default function PublicationEntry({ publication }: PropsType) {
    return (
        <Row className="border rounded mt-3 pt-2 pb-2">
            <Col sm={{ size: 3 }} className="text-center">
                <img className="UserProfile_ProfileImage rounded"
                    src={publication.imageUrl}
                    alt={`Thumbnail of ${publication.name}`}
                />
            </Col>

            <Col sm={{ size: 9 }} >
                <a href={publication.url} target="_blank">
                    <h4>{publication.name}</h4>
                    <span>{publication.description}</span>
                </a>
            </Col>
        </Row>
    );
}