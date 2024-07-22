import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useEffect, useState } from "react";
import axios from "axios";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (userToken) {
      navigate("/dashboard"); // Redirect to sign-in page if token doesn't exist
    }
  }, [navigate]);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Email"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post( 
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username,
                    password,
                  },
                  {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }
            }
              label={"Sign in"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
// import { useNavigate } from "react-router-dom";
// import { BottomWarning } from "../components/BottomWarning";
// import { Button } from "../components/Button";
// import { Heading } from "../components/Heading";
// import { InputBox } from "../components/InputBox";
// import { SubHeading } from "../components/SubHeading";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export const Signin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userToken = localStorage.getItem("token");

//     if (userToken) {
//       navigate("/dashboard");
//     }
//   }, [navigate]);

//   const handleSignin = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/user/signin",
//         { username, password },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       localStorage.setItem("token", response.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError('Invalid username or password');
//       console.error('Error during sign-in:', err);
//     }
//   };

//   return (
//     <div className="bg-slate-300 h-screen flex justify-center">
//       <div className="flex flex-col justify-center">
//         <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
//           <Heading label={"Sign in"} />
//           <SubHeading label={"Enter your credentials to access your account"} />
//           <InputBox
//             type="email"
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Email"
//             label={"Email"}
//           />
//           <InputBox
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             label={"Password"}
//           />
//           {error && <p className="text-red-500">{error}</p>}
//           <div className="pt-4">
//             <Button onClick={handleSignin} label={"Sign in"} />
//           </div>
//           <BottomWarning
//             label={"Don't have an account?"}
//             buttonText={"Sign up"}
//             to={"/signup"}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
