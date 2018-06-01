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
            {
                publicationList.length > 0 ?
                    publicationList.map(
                        (publication) => <PublicationEntry publication={publication} key={publication.id} />
                    ): <h4 className='text-center'>This user doesn't have any publication</h4>
            }
        </div>
    );
}