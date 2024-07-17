import User from './User';
import { ICountry, IUser } from '../interfaces';

interface Props {
	users: IUser[];
	countries: ICountry[];
}

const UsersList = ({ users, countries }: Props) => {
	return (
		<ul className='users-list'>
			{users.map((user, index) => (
				<User key={index} user={user} countries={countries} />
			))}
		</ul>
	);
};

export default UsersList;
