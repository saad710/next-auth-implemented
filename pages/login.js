import React from 'react';
import { useForm } from "react-hook-form";
import { useState } from 'react/cjs/react.development';
import axios from "axios";
import Cookies from "js-cookie";
import { signIn,signOut } from "next-auth/react"

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // console.log(Cookies.get("next-auth.session-token"))
    const [error, setError] = useState(null);
    // console.log(error)
    const [loading, setLoading] = useState(false);
    // const onSubmit = data => console.log(data);
    const onSubmit = async (data) => {
        // setLoading(true);

        await axios.post("/api/validate/validateUser", {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        }
        )
        .then(response => { 
          console.log(response)
          if(response.data.ok){
                      signIn("credentials", {
                  email: response.data.email,
                  name: response.data.name,
                  record_id: response.data.id,
                  // remember: data.remember,
                });
          }
        })
        .catch(error => {
            console.log(error.response)
        });
        // console.log(response.err)
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

                <button onClick={() => 
                {
                  try {
                    signOut()
                  }
                  catch(err){
                    console.log(err)
                  }
                }
                  }>Sign out</button>
            </form>
        </div>
    );
};

export default Login;