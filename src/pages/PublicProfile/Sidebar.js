import React from 'react';
import { Grid, Container } from '@material-ui/core';
import LocationIcon from '@material-ui/icons/LocationOnOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import { ExperienceCard } from '../../components/Experiences/experienceCard/experienceCard';
import { Rating } from '../../components/fontawesomeType/rating';
import { Link } from '@material-ui/core';

export const PublicProfileSidebar = ({
    firstName,
    lastName,
    numOfReviews,
    rating,
    city,
    country,
}) => {
    return (
        <div className="public-profile_sidebar">
            <img src="https://images.unsplash.com/photo-1583289195357-147c5c2fae2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" alt={`${firstName} image`} />
            <div className="sidebar_text">
                <div className="sidebar-text-details">
                    <h3 className="text-center">{`${firstName} ${lastName}`}</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={1}><CheckOutlinedIcon fontSize="small" /> </Grid>
                        <Grid item xs={11}><h5>{numOfReviews} <Link href="#reviews" className="public-profile_internal-link">reviews</Link></h5></Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={1}><CheckOutlinedIcon fontSize="small" /> </Grid>
                        <Grid item xs={11}><h5>Speaks English, Spanish, French</h5></Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={1}><LocationIcon fontSize="small" /> </Grid>
                        <Grid item xs={11}><h5>{city || country ? `${city}, ${country}` : 'N/A'}</h5></Grid>
                    </Grid>
                    <hr className="my-4"/>
                    <div className="text-center">
                        <Rating rating={rating} size="18x" /> ( {rating} / 5.0 )
                    </div>               
                    
                </div>

            </div>
        </div>
    );
}