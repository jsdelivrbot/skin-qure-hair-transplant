$(document).ready(function() { $('body').bootstrapMaterialDesign(); });
$('[data-toggle="tooltip"]').tooltip();
function modalAnimation(modal, animation) {
	$('#'+ modal +' .modal-dialog').attr('class', 'modal-dialog modal-dialog-centered modal-lg ' + animation + '  animated');
};
function showPassword(btnClickID, inputID){
	$('#'+ btnClickID).click(function(event) {	
		$(this).find('i').toggleClass('fa-eye fa-eye-slash');			
		var password = $('#'+ inputID);
		var passwordAttr =  password.attr('type');
		if(passwordAttr == 'password'){
			password.attr('type','text');					
		}
		else {
			password.attr('type','password');					
		}
	});
}
showPassword('showPassword','showp');
showPassword('showConfirmPassword','showc');
showPassword('logPassword','logPass');
showPassword('newPassword','newPass');	
showPassword('confirmPassword','confirmPass');
function onClickChangeView (buttonid, from, to) {
	$('#'+buttonid).click(function() {
		$('#'+from).slideUp(400);
		$('#'+to).slideDown(600);
	});
}
$(document).ready(function() {	
	

	$('#register').on('show.bs.modal', function (e) {
		modalAnimation('register', 'fadeIn');
	});
	$('#register').on('hide.bs.modal', function (e) {
		modalAnimation('register', 'fadeOut');
	});
	$('#login').on('show.bs.modal', function (e) {
		modalAnimation('login', 'fadeIn');
	});
	$('#login').on('hide.bs.modal', function (e) {
		modalAnimation('login', 'fadeOut');
	});

	$('#signUpCLick').click(function(event) {		
		$('#login').modal('hide');
		$('#register').modal('show');
	});
	$('#signInClick').click(function(event) {
		$('#register').modal('hide');		
		$('#login').modal('show');				
	});
	
	onClickChangeView('registerM8place','registerForm', 'OTP');
	onClickChangeView('otpVerified','OTP', 'congratulations');
	onClickChangeView('forgotPasswordBtn','login_marke8hub', 'enterMobileNumber');
	onClickChangeView('sendOTP','enterMobileNumber', 'verifyOTPMobile');
	onClickChangeView('goToReset','verifyOTPMobile', 'resetPassword');
	onClickChangeView('continuetoLog','resetPassword', 'passchanged');
	onClickChangeView('successfullychanged','resetPassword', 'login_marke8hub');
	ma5menu({
		position: 'right',
		closeOnBodyClick: true
	});
});