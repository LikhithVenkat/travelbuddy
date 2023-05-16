function validate(){
	var source=document.home_form.source.value;
	var destination=document.home_form.destination.value;
	var date=document.home_form.date.value;
	if(source==null|| source==""){
		document.getElementById("sourceerror").innerHTML="<p>&#10071 source not entered</p>";
		return false;
	}
	else{
		document.getElementById("sourceerror").innerHTML="<br><br>";
	}
	if(destination==null|| destination=="")
		{
		document.getElementById("desterror").innerHTML="<p>&#10071 destination not entered</p>";
		return false;
		}
	else{
		document.getElementById("desterror").innerHTML="<br><br>";
	}
	if(date==null|| date=="")
		{
		document.getElementById("dateerror").innerHTML="<p>&#10071 date not entered</p>";
		return false;
		}
	else{
		document.getElementById("dateerror").innerHTML="<br><br>";
	}
}

function login_validate(){
	var Email=document.login_form.Email.value;
	var Password=document.login_form.Password.value;
	if(Email==null|| Email==""){
		document.getElementById("emailerror").innerHTML="<p>&#10071 Email not entered</p>";
		return false;
	}
	else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)==false)
	{
		document.getElementById("emailerror").innerHTML="<p>&#10071 Email not valid</p>";
		return false;
	} 
	else{
		document.getElementById("emailerror").innerHTML="<br><br>";
	}
	if(Password==null|| Password=="")
		{
		document.getElementById("passworderror").innerHTML="<p>&#10071 Password not entered</p>";
		return false;
		}
	else{
		document.getElementById("passworderror").innerHTML="<br><br>";
	}
}

function register_validate(){
	var Email=document.register_form.Email.value;
	var Password=document.register_form.Password.value;
	var Name=document.register_form.Name.value;
	var Confirm_Password=document.register_form.Confirm_Password.value;
	if(Email==null|| Email==""){
		document.getElementById("emailerror").innerHTML="<p>&#10071 Email not entered</p>";
		return false;
	}
	else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)==false)
	{
		document.getElementById("emailerror").innerHTML="<p>&#10071 Email not valid</p>";
		return false;
	} 
	else{
		document.getElementById("emailerror").innerHTML="<br><br>";
	}
	if(Name==null||Name==""){
		document.getElementById("nameerror").innerHTML="<p>&#10071 Name not entered</p>";
		return false;
	}
	else{
		document.getElementById("nameerror").innerHTML="<br><br>";
	}
	if(Password==null|| Password=="")
		{
		document.getElementById("passworderror").innerHTML="<p>&#10071 Password not entered</p>";
		return false;
		}
	else{
		document.getElementById("passworderror").innerHTML="<br><br>";
	}
	if(Confirm_Password==null|| Confirm_Password=="")
		{
		document.getElementById("confpassworderror").innerHTML="<p>&#10071 Reenter password</p>";
		return false;
		}
	else if(Password!=Confirm_Password){
		document.getElementById("confpassworderror").innerHTML="<p>&#10071 Password Doesn't match</p>";
		return false;
	}
	else{
		document.getElementById("confpassworderror").innerHTML="<br><br>";
	}
}