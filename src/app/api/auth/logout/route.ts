// import { NextResponse } from "next/server";

// export async function POST() {
//   try {
//     const response = NextResponse.json(
//       {
//         success: true,
//         message: "User has successfully logged out",
//       },
//       { status: 200 }
//     );


//     response.cookies.set({
//         name:"token",
//         value:"",
//         httpOnly:true,
//         maxAge:0,
//         secure:true,
//         path:"/"

//     });
//     return response;
//   } catch (error) {
//     console.log("Logout Error: ",error);
//     return NextResponse.json({
//         success:false,
//         message:"Logout failed"
//     },{status:500})
//   }
// }
