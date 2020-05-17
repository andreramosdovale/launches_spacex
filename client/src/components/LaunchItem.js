import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export default function LaunchItem({ launch: { flight_number, mission_name, launch_date_local, launch_success } }) {
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-9">
                    <h4>Missão: {' '}
                        <span className={classNames({
                            'text-success': launch_success,
                            'text-danger': !launch_success
                        })}>{ mission_name }</span>
                    </h4>
                    <p>Data: <Moment format="DD-MM-YYYY HH:mm">{ launch_date_local }</Moment></p>
                </div>
                <div className="col-md-3">
                    <Link to={`/launch/${flight_number}`} className="btn btn-primary">Detalhes do Lançamento</Link>
                </div>
            </div>
        </div>
    )
}
