import React from 'react';
import SadFaceIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';
import {StyledBtn} from '../../components/buttons';

export const PageNotFound = () => {
    return (
        <div className="page_not_found">
            <div className="page_not_found-content">
            <div className="mb-4">
                ...OOPS! PAGE NOT FOUND <span><SadFaceIcon fontSize="large"/></span>
            </div>
            <StyledBtn title="Report" size="lg" width="auto"/>
            </div>
        </div>
    );
};