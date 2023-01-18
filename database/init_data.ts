import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const client = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

async function main() {
  await client.connect(); // "dial-in" to the postgres server

	// const data = [{id:1,name: "Tom Chan",},{id:2,name:"Mary Chan"}]


	// for (let datum of data){
	// 	await client.query(`INSERT INTO users (id,username,email,password,type,created_at,updated_at) values (${datum.id},${datum.name},$3,$4,$5,now(),now())`);
	// }
	//users table - 01
	// await client.query("INSERT INTO users (id,username,email,password,type,created_at,updated_at) values ($1,$2,$3,$4,$5,now(),now())", [
	// "1","Tom Chan","tom@gmail.com","admin","student"
	// // "2","Mary Chan","mary@gmail.com","marychan","teacher"
	// ]);
	await client.query("INSERT INTO users (id,username,email,password,type,created_at,updated_at) values ($1,$2,$3,$4,$5,now(),now())", [
	"1","Tom Chan","tom@gmail.com","admin","student"
	]);
	// await client.query("INSERT INTO users (id,username,email,password,type,created_at,updated_at) values ($1,$2,$3,$4,$5,now(),now())", [
	// "3","Tom Chan","tom@gmail.com","tomchan","student"
	// ]);
	
	// //teacher - 02
	// await client.query("INSERT INTO teacher (id,user_id,created_at,updated_at) values ($1,$2,now(),now())", [
	// "2001","1001"
	// ]);
	
	// //subject - 03
	// await client.query("INSERT INTO subject (id,name,created_at,updated_at) values ($1,$2,now(),now())", [
	// "3001","chinese"
	// ]);

	// // teacher_subject - 04
	// await client.query("INSERT INTO teacher_subject (id,teacher_id,subject_id,created_at,updated_at) values ($1,$2,$3,now(),now())", [
	// "4001", "2001","3001"
	// ]);

	// // blog - 05
	// await client.query("INSERT INTO blog (id,teacher_id,image,content,created_at,updated_at) values ($1,$2,$3,$4,now(),now())", [
	// "5001","2001", "image001.jpg","content001"
	// ]);

	// // school - 07
	// await client.query("INSERT INTO school (id,name,created_at,updated_at) values ($1,$2,now(),now())", [
	// "7001","1001school"
	// ]);
	
	// // student - 06
	// await client.query("INSERT INTO student (id,subject_id,academic_level,school_id,user_id,subject, created_at,updated_at) values ($1,$2,$3,$4,$5,$6,now(),now())", [
	// "6001","3001", "F6","7001","1001","chinese"
	// ]);

		
	// // chatroom - 08
	// await client.query("INSERT INTO chatroom (id,content,from_user,to_user,created_at,updated_at) values ($1,$2,$3,$4,now(),now())", [
	// 	"8001","content1001","1001","1001"
	// ]);
	
	// // forum - 11
	// await client.query("INSERT INTO forum (id,name,created_at,updated_at) values ($1,$2,now(),now())", [
	// 	"11001", "forum"
	// ]);
	
	// // forum_post - 09
	// await client.query("INSERT INTO forum_post (id,forum_id,content,status,author_id,created_at,updated_at) values ($1,$2,$3,$4,$5,now(),now())", [
	// 	"9001", "11001","content1001","published","1001"
	// ]);
	
	// // // forum_post_comment - 10
	// await client.query("INSERT INTO forum_post_comment (id,content,author_id,forum_post_id,created_at,updated_at) values ($1,$2,$3,$4,now(),now())", [
	// 	"10001","content001","1001", "9001"
	// ]);


	await client.end(); // close connection with the database
}
main();








































// ----------------------------------------17/1/2023, first time connect database records -------------------------------------------


//   const user = {
// 	id:"1001",
//     username: "student001",
// 	email:"user001@gmail.com",
//     password: "student001",
// 	type:"student",
//   };

// 	//users table - 01
// 	await client.query("INSERT INTO users (id,username,email,password,type,created_at,updated_at) values ($1,$2,$3,$4,$5,now(),now())", [
// 	"user.id,user.username,user.email,user.password,user.type,"
// 	]);

// 	//teacher - 02
// 	await client.query("INSERT INTO teacher (id,user_id,created_at,updated_at) values ($1,$2,now(),now())", [
// 	"2001","1001"
// 	]);
	
// 	//subject - 03
// 	await client.query("INSERT INTO subject (id,name,created_at,updated_at) values ($1,$2,now(),now())", [
// 	"3001","chinese"
// 	]);

// 	// teacher_subject - 04
// 	await client.query("INSERT INTO teacher_subject (id,teacher_id,subject_id,created_at,updated_at) values ($1,$2,$3,now(),now())", [
// 	"4001", "2001","3001"
// 	]);

// 	// blog - 05
// 	await client.query("INSERT INTO blog (id,teacher_id,image,content,created_at,updated_at) values ($1,$2,$3,$4,now(),now())", [
// 	"5001","2001", "image001.jpg","content001"
// 	]);

// 	// school - 07
// 	await client.query("INSERT INTO school (id,name,created_at,updated_at) values ($1,$2,now(),now())", [
// 	"7001","1001school"
// 	]);
	
// 	// student - 06
// 	await client.query("INSERT INTO student (id,subject_id,academic_level,school_id,user_id,subject, created_at,updated_at) values ($1,$2,$3,$4,$5,$6,now(),now())", [
// 	"6001","3001", "F6","7001","1001","chinese"
// 	]);

	
// // chatroom - 08
// await client.query("INSERT INTO chatroom (id,content,from_user,to_user,created_at,updated_at) values ($1,$2,$3,$4,now(),now())", [
// 	"8001","content1001","1001","1001"
// ]);

// // forum - 11
// await client.query("INSERT INTO forum (id,name,created_at,updated_at) values ($1,$2,now(),now())", [
// 	"11001", "forum"
// ]);

// // forum_post - 09
// await client.query("INSERT INTO forum_post (id,forum_id,content,status,author_id,created_at,updated_at) values ($1,$2,$3,$4,$5,now(),now())", [
// 	"9001", "11001","content1001","published","1001"
// ]);

// // // forum_post_comment - 10
// await client.query("INSERT INTO forum_post_comment (id,content,author_id,forum_post_id,created_at,updated_at) values ($1,$2,$3,$4,now(),now())", [
// 	"10001","content001","1001", "9001"
// ]);

//   const result = await client.query("SELECT * from users where username = $1", [
//     "student001",
//   ]);

//   console.log(result.rows[0].username); // gordon


