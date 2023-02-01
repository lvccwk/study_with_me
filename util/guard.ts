import express from 'express'
import { User } from './interface'


declare module 'express-session' {
	interface SessionData {
		counter?: number
		user?: User
	}
}


export const isLoggedIn = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if (req.session?.user) {
		//called Next here
		next()
	} else {
		// redirect to index page
		res.redirect('/?error=no access right')
	}
}
export const isLoggedInAPI = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if (req.session?.user) {
		//called Next here
		next()
	} else {
		// redirect to index page
		res.status(403).json({
			message: 'Unauthorized'
		})
	}
}
