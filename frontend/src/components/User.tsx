import { useState } from 'react';
import { ICountry, IUser } from '../interfaces';
import Modal from './Modal';
import '../styles/User.css';

interface Props {
	user: IUser;
	countries: ICountry[];
}

const User = ({ user, countries }: Props) => {
	const [isUserSelected, setIsUserSelected] = useState<boolean>(false);

	const userCountry = countries.find(country =>
		[
			country.name.common.toLowerCase(),
			country.name.official.toLowerCase(),
		].includes(user.location.country.toLowerCase())
	);

	return (
		<>
			<li className='user-card' onClick={() => setIsUserSelected(true)}>
				<img
					src={user.picture.thumbnail}
					alt={`${user.name.first} ${user.name.last}`}
					className='user-thumbnail'
				/>
				<div className='user-details'>
					<h3>{`${user.name.first} ${user.name.last}`}</h3>
					<p>{user.email}</p>
					<p>{user.phone}</p>
					{userCountry && (
						<img
							src={userCountry.flags.svg}
							alt={`${userCountry.name.common} flag`}
							className='country-flag'
						/>
					)}
				</div>
			</li>
			<Modal open={isUserSelected} onClose={() => setIsUserSelected(false)}>
				<img
					src={user.picture.large}
					alt={`${user.name.first} ${user.name.last}`}
					className='user-picture-large'
				/>
				<h2>{`${user.name.first} ${user.name.last}`}</h2>
				<p>
					<strong>Email:</strong> {user.email}
				</p>
				<p>
					<strong>Phone:</strong> {user.phone}
				</p>
				<p>
					<strong>Address:</strong>{' '}
					{`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}
				</p>
				<p>
					<strong>Date of Birth:</strong>{' '}
					{new Date(user.dob.date).toLocaleDateString()}
				</p>
				<p>
					<strong>Age:</strong> {user.dob.age}
				</p>
				<p>
					<strong>Registered:</strong>{' '}
					{new Date(user.registered.date).toLocaleDateString()}
				</p>
			</Modal>
		</>
	);
};

export default User;
