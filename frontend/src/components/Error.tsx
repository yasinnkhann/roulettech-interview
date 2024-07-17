import { IError } from '../interfaces';
import '../styles/Error.css';

interface Props {
	error: IError;
}

const Error = ({ error }: Props) => {
	return (
		<div className='error'>
			<h3>Error</h3>
			<br />
			<p>{error.message}</p>
		</div>
	);
};

export default Error;
