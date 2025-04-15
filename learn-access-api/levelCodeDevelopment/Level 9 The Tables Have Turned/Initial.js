import React from "react";
import "./styles.css"

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes
//This level code was  based on and adapted from https://www.w3.org/WAI/tutorials/tables/

export default function App() {
    return (
        <table data-testid="table">
            <thead>
            <tr>
                <td></td>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>09:00 – 11:00</th>
                <td>Closed</td>
                <td>Open</td>
                <td>Open</td>
                <td>Closed</td>
                <td>Closed</td>
            </tr>
            <tr>
                <th>11:00 – 13:00</th>
                <td>Open</td>
                <td>Open</td>
                <td>Closed</td>
                <td>Closed</td>
                <td>Closed</td>
            </tr>
            <tr>
                <th>13:00 – 16:00</th>
                <td>Closed</td>
                <td>Closed</td>
                <td>Open</td>
                <td>Open</td>
                <td>Open</td>
            </tr>
            </tbody>
        </table>
    );
};
