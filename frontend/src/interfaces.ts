export interface IUser {
	gender: string;
	name: {
		title: string;
		first: string;
		last: string;
	};
	location: {
		street: {
			number: number;
			name: string;
		};
		city: string;
		state: string;
		country: string;
		postcode: string;
		coordinates: {
			latitude: string;
			longitude: string;
		};
		timezone: {
			offset: string;
			description: string;
		};
	};
	email: string;
	login: {
		uuid: string;
		username: string;
	};
	dob: {
		date: string;
		age: number;
	};
	registered: {
		date: string;
		age: number;
	};
	phone: string;
	cell: string;
	id: {
		name: string;
		value: string;
	};
	picture: {
		large: string;
		medium: string;
		thumbnail: string;
	};
	nat: string;
}

export interface ICountry {
	flags: {
		png: string;
		svg: string;
		alt: string;
	};
	name: {
		common: string;
		official: string;
		nativeName: {
			fra: {
				official: string;
				common: string;
			};
		};
	};
}

export interface IError {
	message: string | null;
}
