import express from 'express'
import HTTP from 'http'
import path from 'path'
import pg from 'pg'
import dotenv from "dotenv";
dotenv.config();
let app = express()
let server = new HTTP.Server(app)

export const client = new pg.Client({
	database: process.env.DB_NAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
})
// client.connect();
export const userRoutes = express.Router();
// userRoutes.post("/login", login);

// async function login(req: express.Request, res: express.Response) {
//   const { username, password } = req.body;
//   const users = (
//     await client.query(`SELECT * FROM users WHERE users.username = $1`, [
//       username,
//     ])
//   ).rows;

//   const user = users[0];
//   if (!user) {
//     return res.status(401).redirect("/login.html?error=Incorrect+Username");
//   }

//   const match = await checkPassword(password, user.password);
//   if (match) {
//     if (req.session) {
//       req.session["user"] = {
//         id: user.id,
//       };
//     }
//     return res.redirect("/"); // To the protected page.
//   } else {
//     return res.status(401).redirect("/login.html?error=Incorrect+Username");
//   }
// }



app.use(express.static(path.join(__dirname, 'template_design')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'private')))


app.use((req, res) => {
	res.redirect('404.html')
})

server.listen(8888, () => {
	console.log(` server listening on http://localhost:8888`)
})
