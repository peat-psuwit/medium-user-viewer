// @flow

import React from 'react';

import type { PublicationListType } from "../../../utils/mediumAPI";

import PublicationEntry from './PublicationEntry';

type PropsType = {
    isLoading: boolean,
    publicationList: ?PublicationListType
};

export default function PublicationList({ isLoading, publicationList }: PropsType) {
    if (isLoading || !publicationList)
        return <div>Loading...</div>

    return (
        <div>
            {publicationList.map(
                (publication) => <PublicationEntry publication={publication} key={publication.id} />
            )}
        </div>
    );
}