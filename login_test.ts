// import express from "express";
// // import type { Request } from "express";
// // import path from "path";
// import expressSession from "express-session";
// // import { format } from "date-fns";
// // import fs from "fs";
// // import { formParsePromise, uploadDir } from "./formidable";
// // import path from "path";
// // import jsonfile from "jsonfile";
// import { client } from "./server";

// // import crypto from "crypto";

// declare module "express-session" {
//     interface SessionData {
//         counter?: number;
//         user?: User;
//     }
// }

// // export const isLoggedIn = (req: express.Request, res: express.Response, next: express.NextFunction) => {
// //     if (req.session?.user) {
// //         //called Next here
// //         next();
// //     } else {
// //         // redirect to index page
// //         res.redirect("/?error=no access right");
// //     }
// // };

// export interface User {
//     username: string;
//     password: string;
// }

// let app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // fs.mkdirSync(uploadDir, { recursive: true });

// app.use(
//     expressSession({
//         secret: "Tecky Academy teaches typescript",
//         resave: true,
//         saveUninitialized: true,
//     })
// );

// client.connect();
// //step 1
// let products = [{name:'dickson', price:10},{name:'dennis', price:200},{name:'james', price:100}]
// //step2
// app.get('/products', async(req,res)=>{
//     res.json({products})
// })

// app.post("/login", async (req, res) => {
//     try {
//         console.log('login ok')
//         console.log("body = ", req.body);

//         let { username, password , email } = req.body;
//         if (!username || !password || !email) {
//             res.status(402).json({
//                 message: "Invalid input",
//             });
//             return;
//         }

//         console.log("user input:", { username, password , email});

//         const check = await client.query("SELECT * from users where username=$1", [
//             username
//           ]);

//         if(check){
//             res.redirect('admin.html')

//       }
//     else {
//              res.status(404).redirect('404.html')
//        }
//         // let users: User[] = await jsonfile.readFile(path.join(__dirname, "users.json"));
//         // if (!users) {
//         //     res.status(500).json({
//         //         message: "Server error",
//         //     });
//         //     return;
//         // }
//         // let foundUser: User | undefined = users.find((user: any) => {
//         //     if (user.username === username && user.password === password) {
//         //         return true;
//         //     } else {
//         //         return false;
//         //     }
//         // });

//         // if (!foundUser) {
//         //     res.status(402).json({
//         //         message: "Invalid username / password",
//         //     });
//         //     return;
//         // }
//         // req.session.user = foundUser;

//         // console.log("foundUser = ", foundUser);

//         // res.redirect("/admin.html");
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: "server error",
//         });
//     }
// });

// app.use(express.static("public"));
// app.use(express.static("uploads"));
// app.use(express.static('template_design'))
// // admin.html should be inside protected
// // app.use(isLoggedIn, express.static("protected"));

// // app.use((req, res) => {
// //     res.sendFile(path.resolve("public", "404.html"));
// // });

// app.use((req, res) => {
//     res.redirect("404.html");
// });

// app.listen(8080, () => {
//     console.log(` server listening on http://localhost:8080`);
// });

// // ----

// // 1. user access index.html
// // user request: index.html GET
// // [req session is empty]

// // 2. user login and succeed
// // user request: /login POST
// // [req session contains user data]

// // 3. user access admin.html
// // user request : admin.html GET
// // [check if session contains data -> allow access admin html]
