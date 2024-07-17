export const MAX_USERS_LIMIT = 10;

export const __prod__ = process.env.NODE_ENV === 'production';

export const BASE_SERVER_URL = __prod__
	? 'http://184.72.15.174:8000/api'
	: 'http://127.0.0.1:8000/api';
