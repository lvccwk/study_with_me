import { client } from '../util/db'

export async function getUserByEmail(email: string) {
	let selectUserResult = await client.query(
		`select * from users where email = $1 `,
		[email]
	)

	return selectUserResult.rows[0]
}
