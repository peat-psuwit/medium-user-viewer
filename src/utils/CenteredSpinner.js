// @flow

import React from 'react';
import Spinner from 'react-spinkit';

export default function CenteredSpinner() {
    return (
        <div>
            <Spinner name='circle' fadeIn='none' className="mx-auto" />
        </div>
    );
}