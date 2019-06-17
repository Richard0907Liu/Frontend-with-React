import React from 'react';

export const Loading = () => {
    return(
        <div className="col-12">
        {/**aplly fa-pulse font awesome class, it makes the spinner rotate around, 3 times the speed, fw foward */}
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading...</p>
        </div>
        // go into MainComponent to use Loading function
    );
};