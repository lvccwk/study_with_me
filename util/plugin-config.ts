import grant from 'grant'
import { env } from './env'
import expressSession from 'express-session'

export const grantExpress = grant.express({
	defaults: {
		origin: 'http://localhost:8888',
		transport: 'session',
		state: true
	},
	google: {
		key: env.GOOGLE_CLIENT_ID,
		secret: env.GOOGLE_SECRET,
		scope: ['profile', 'email'],
		callback: '/login/google'
	}
})

export const expressSessionConfig = expressSession({
	secret: 'Tecky Academy teaches typescript',
	resave: true,
	saveUninitialized: true
})
