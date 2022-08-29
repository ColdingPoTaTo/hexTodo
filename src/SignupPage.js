import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const SignupPage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const API_URL = "https://todoo.5xcamp.us";
    const optionBase = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    const onSubmit = data => {
        console.log(data)
        let optionObject = Object.assign({}, { ...optionBase, method: "POST" });
        optionObject.body = JSON.stringify(data)
        fetch(API_URL + '/users', optionObject)
            .then(res => res.json())
            .then(resJson => console.log(resJson))
    };
    // const register = ()=>{
    //     fetch("https://todoo.5xcamp.us/users")
    //     .then(response=>response.json())
    //     .then(result=>{
    //     setPic(result.message)
    //     })
    // console.log(Pic)
    // }
    return (
        <div id="signUpPage" className="bg-yellow">
            <div className="conatiner signUpPage vhContainer">
                <div className="side">
                    <a href="#"><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" /></a>
                    <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
                </div>
                <div>
                    <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="formControls_txt">註冊帳號</h2>

                        <label className="formControls_label" htmlFor="email">Email</label>
                        <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email"{...register("email", { required: { value: true, message: "此欄位必填" }, pattern: { value: /^\S+@\S+$/i, message: "不符合Email格式" } })} />
                        <span>{errors.email?.message}</span>

                        <label className="formControls_label" htmlFor="nickname">您的暱稱</label>
                        <input className="formControls_input" type="text" name="nickname" id="nickname" placeholder="請輸入您的暱稱" {...register("nickname", { required: { value: true, message: "此欄位必填" } })} />
                        <span>{errors.nickname?.message}</span>

                        <label className="formControls_label" htmlFor="password">密碼</label>
                        <input className="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼" {...register("password", { required: { value: true, message: "此欄位必填" }, minLength: { value: 6, message: "密碼至少為6碼" } })} />
                        <span>{errors.password?.message}</span>

                        {/* <label className="formControls_label" htmlFor="pwd2">再次輸入密碼</label>
                        <input className="formControls_input" type="password" name="pwd2" id="pwd2" placeholder="請再次輸入密碼" {...register("pwd2", { required: { value: true, message: "此欄位必填" }, validate: { value: (x) => x == pwd, message: "密碼不相同" } })} /> */}


                        <input className="formControls_btnSubmit" type="submit" value="註冊帳號" />
                        <Link className="formControls_btnLink" to="/LoginPage">登入</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;