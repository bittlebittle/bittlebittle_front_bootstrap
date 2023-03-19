<template>
  <form class="register-form" @submit.prevent="registerUser">
		  <p style="margin-bottom: 10px; font-size: 15px;" ><br></p>
	      <p style="margin-bottom: 50px;">
          <router-link to='/' style="font-weight: bold; color: #fd6500; text-decoration: none">BITTLE-BITTLE</router-link>
          에 오신 것을 환영합니다!</p>
	      <div>
	      <input type="email" id="email-2" name="memberId" placeholder="이메일" />
          <button type="button" class="mail-Check-Btn" id="confirm" style="margin-bottom: 10px">아이디 중복 확인</button>
          </div><br>
	      <div id="mail-check-warn1"></div>
          <input type="text" id="emailcheck" name="emailcheck" placeholder="인증번호 6자리" disabled="disabled" maxlength="6" />
	      <div id="mail-check-warn2"></div>
	      <input type="password" id="password" name="memberPwd" placeholder="비밀번호" />
	      <input type="password" id="password-confirm" name="password-confirm" placeholder="비밀번호 확인" />
	      <div id="pw-check-warn"></div>
	      <div>
	      <input type="text" id="nickname" name="nickname" placeholder="닉네임(2글자 이상)" minlength="2" maxlength="10" />
	      <button type="button" class="name-Check-Btn" id="confirm" style="margin-bottom: 10px">확인</button>
	      </div><br>
	      <div id="nn-check-warn"></div>
	      <input type="text" id="birthday" name="birthday" placeholder="생년월일 8자리  ex)19980120" />

	      <button type="submit" >회원가입</button>
	      <p class="message">이미 회원이신가요? <a href="#" class="back">로그인</a></p>
    </form>
</template>

<script>
export default {
  name: 'UserRegisterComp'
}
</script>

<style scoped >
:root {
  --text-color: black;
  --background-color: #f8ded2;
  --accent-color: #ff4d00;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'NanumSquareRound';
}
#email, #email-2, #emailcheck, #password, #password-confirm, #nickname, #birthday, #mail-check-warn1, #mail-check-warn2 {
   font-family: 'NanumSquareRound';
}
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  border-radius: 40px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
 font-family: 'NanumSquareRound';
  outline: 0;
  background: #F2F2F2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 20px;
  font-size: 14px;
}
.form button {
  text-transform: uppercase;
  outline: 0;
  background: #80ca6a;
  width: 100%;
  border: 0;
  border-radius: 20px;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: green;
}
.form .message {
  margin: 15px 0 0;
  color: #B3B3B3;
  font-size: 13px;
}
.form .message a {
  color: GREEN;
  font-weight: bold;
  text-decoration: none;
}
.form .message a:hover {
  cursor: pointer;
}
.form {}

.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form .find-form {
  display: none;
  text-align: center;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1A1A1A;
}
.container .info span {
  color: #4D4D4D;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
body {
  background: green; /* fallback for old browsers */
  background: green;
  background: linear-gradient(90deg, rgb(183, 226, 159) 0%, rgb(185, 229, 160) 50%);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#email-2, #nickname {
  width: 205px;
  float: left;
  border-top-right-radius: 1px;
  border-bottom-right-radius:1px;
  margin-right: 0;
}
#email-2 {
    height: 46.67px;
}
#confirm {
  width: 65px;
  height: 46.67px;
  box-sizing: border-box;
  background: #80ca6a;
  border-top-left-radius:1px;
  border-bottom-left-radius:1px;
}
#confirm:hover {
  background-color: green;
}
</style>
