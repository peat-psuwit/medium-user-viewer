// @flow

import React from 'react';

import type { PublicationListType } from "../../../utils/mediumAPI";

import PublicationEntry from './PublicationEntry';

type PropsType = {
    publicationList: PublicationListType
};

export default function PublicationList({ publicationList }: PropsType) {
    return (
        <div>
            {publicationList.map(
                (publication) => <PublicationEntry publication={publication} key={publication.id} />
            )}
        </div>
    );
}