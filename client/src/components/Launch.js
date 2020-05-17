import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LAUNCH_QUERY = gql`
	query LaunchQuery($flight_number: Int!) {
		launch(flight_number: $flight_number) {
			flight_number
			mission_name
			launch_year
			launch_success
			launch_date_local
			rocket {
				rocket_id
				rocket_name
				rocket_type
			}
    	}
  	}
`;

export class Launch extends Component {
	render() {
		let { flight_number } = this.props.match.params;
    	flight_number = parseInt(flight_number);
    	return (
      		<Fragment>
        		<Query query={LAUNCH_QUERY} variables={{ flight_number }}>
					{({ loading, error, data }) => {
						if (loading) return <h4>Carregando Informações...</h4>;
						if (error) console.log(error);
						const {
							mission_name,
							flight_number,
							launch_year,
							launch_success,
							rocket: { rocket_id, rocket_name, rocket_type }
						} = data.launch;
						return (
							<div>
								<h1 className="display-4 my-3">
								<span className="text-dark">Missão:</span> {mission_name}
								</h1>
								<h4 className="mb-3">Detalhes do Lançamento</h4>
								<ul className="list-group">
								<li className="list-group-item">
									Numero do Voo: {flight_number}
								</li>
								<li className="list-group-item">
									Ano do Lançamento: {launch_year}
								</li>
								<li className="list-group-item">
									Status do Lançamento:{' '}
									<span
									className={classNames({
										'text-success': launch_success,
										'text-danger': !launch_success
									})}
									>
									{launch_success ? 'Yes' : 'No'}
									</span>
								</li>
								</ul>

								<h4 className="my-3">Detalhes do Foguete</h4>
								<ul className="list-group">
								<li className="list-group-item">ID do Foguete: {rocket_id}</li>
								<li className="list-group-item">
									Nome do Foguete: {rocket_name}
								</li>
								<li className="list-group-item">
									Tipo do Foguete: {rocket_type}
								</li>
								</ul>
								<hr />
								<Link to="/" className="btn btn-secondary">
								Voltar
								</Link>
							</div>
						);
					}}
				</Query>
      	</Fragment>
    	);
	}
}

export default Launch;