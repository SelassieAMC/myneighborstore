import React from 'react';

function ListLocationsPanel({locations}){
    return (
        <div className="locationPane">
            <table className="table-panel">
                <thead>
                    <tr>
                        <th colSpan="4">Locations</th>
                    </tr>
                    <tr>
                        <th>Action</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                {
                    locations.map(location => {
                        return (
                            <tr key={location.uuid}>
                                <td>Action</td>
                                <td>{location.address}</td>
                                <td>{location.city}</td>
                                <td>{location.country}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default ListLocationsPanel;