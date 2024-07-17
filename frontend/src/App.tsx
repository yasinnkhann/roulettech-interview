import { useState, useEffect } from 'react';
import { BASE_SERVER_URL, MAX_USERS_LIMIT } from './constants';
import UsersList from './components/UsersList';
import { ICountry, IError, IUser } from './interfaces';
import ErrorComp from './components/Error';
import './styles/App.css';

function App() {
	const [users, setUsers] = useState<IUser[]>([]);
	const [countries, setCountries] = useState<ICountry[]>([]);
	const [usersLoading, setUsersLoading] = useState<boolean>(false);
	const [error, setError] = useState<IError>({ message: null });
	const [page, setPage] = useState<number>(1);
	const [gender, setGender] = useState<string>('');

	const getUsers = async (gender?: string, page: number = 1) => {
		setUsersLoading(true);
		try {
			let url = `${BASE_SERVER_URL}/get-users?page=${page}&users_count=${MAX_USERS_LIMIT}`;

			if (gender) {
				url += `&gender=${gender}`;
			}

			const res = await fetch(url);
			const { results: users } = await res.json();
			setUsers(users);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				setError({ message: err.message });
			} else {
				setError({ message: 'An error occurred.' });
			}
		}
		setUsersLoading(false);
	};

	const getCountries = async () => {
		try {
			const res = await fetch(`${BASE_SERVER_URL}/get-countries`);
			const countries = await res.json();
			setCountries(countries);
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				setError({ message: err.message });
			} else {
				setError({ message: 'An error occurred.' });
			}
		}
	};

	useEffect(() => {
		getUsers(gender, page);
		getCountries();
	}, [page, gender]);

	return (
		<main className='app'>
			{usersLoading ? (
				<div className='loading'>Loading...</div>
			) : !usersLoading && !error.message ? (
				<>
					<div className='gender-button-container'>
						<button
							onClick={() => {
								setGender('');
								setPage(1);
							}}
						>
							Mixed
						</button>
						<button
							onClick={() => {
								setGender('male');
								setPage(1);
							}}
						>
							Male
						</button>
						<button
							onClick={() => {
								setGender('female');
								setPage(1);
							}}
						>
							Female
						</button>
					</div>
					<UsersList users={users} countries={countries} />
					<div className='pagination'>
						<button
							onClick={() => setPage(page => Math.max(page - 1, 1))}
							disabled={page === 1}
						>
							Previous
						</button>
						<p className='page-number'>{page}</p>
						<button onClick={() => setPage(page => page + 1)}>Next</button>
					</div>
				</>
			) : (
				<ErrorComp error={error} />
			)}
		</main>
	);
}

export default App;
