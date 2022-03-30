import React from 'react';
import { useForm } from "react-hook-form";
import { useState } from 'react/cjs/react.development';
import axios from "axios";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react"

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [error, setError] = useState(null);
    // console.log(error)
    const [loading, setLoading] = useState(false);
    // const onSubmit = data => console.log(data);
    const onSubmit = async (data) => {
        setLoading(true);


        async function getUserData() {
            try {
              let response = await fetch('http://localhost:3000/api/validate/validateUser', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
          })
          console.log(response)
              let user = await response.json();
              console.log(user)
              if(response.ok){
                              signIn("credentials", {
                  email: user?.email,
                  name: user?.name,
                  record_id: user?.id,
                  // remember: data.remember,
                });
              }
            } catch(err) {
              // catches errors both in fetch and response.json
              alert(err);
            }
          }
          
          getUserData();
    
        // const response = await axios.post("/api/validate/validateUser", {
        //   email: data.email,
        //   password: data.password,
        // });
        // const response = await fetch('http://localhost:3000/api/validate/validateUser', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: data.email,
        //         password: data.password,
        //     }),
        //   })
          

        // console.log(response)
       
        // return
        // setLoading(false);
    
        // // //if error occured then show error message
        // if (!response.ok) {
        //   setError("user not found");
        //   return;
        // }

        // if (response.ok) {
            // if (response.data.resetPassword) {
            //   // set email,record_id and remember in cookies
            //   var inThirtyminutes = new Date(new Date().getTime() + 30 * 60 * 1000);
      
            //   Cookies.set("user_email", response.data.email, {
            //     expires: inThirtyminutes,
            //   });
            //   Cookies.set("remember", data.remember, { expires: inThirtyminutes });
            //   Cookies.set("record_id", response.data.record_id, {
            //     expires: inThirtyminutes,
            //   });
            //   Cookies.set("name", response.data.name, {
            //     expires: inThirtyminutes,
            //   });
      
            //   router.push("/resetPassword");
            // } else {
            //   signIn("credentials", {
            //     email: resp.email,
            //     name: resp.name,
            //     record_id: resp.id,
            //     // remember: data.remember,
            //   });
            // }
        //     const resp = await response.json()
        //     console.log(resp)
      
        //         signIn("credentials", {
        //           email: resp?.email,
        //           name: resp?.name,
        //           record_id: resp?.id,
        //           // remember: data.remember,
        //         });
              
        //   }
        }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="email" {...register("email")}/>
                <input type="password" name="password" {...register("password")}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;