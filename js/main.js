/**
 * Created by liu&Rieko on 17-7-11--17-9-27(修改).
 */

if( document.body.clientWidth < 768 ){
    $("#logo2").css("display","none");
    $("#logo1").css("display","block");
    $(".navbar-nav li span").css("display","inline-block");
    $(".member-c").css("display","none");
    $("#train").css("display","none");
    $("#train-phone").css("display","block");
}

$(function(){
	var HiRrl = '/auth/login.action';
    $('#login').bind('click',function(){
        $(".pops").attr('class', 'pops animated fadeInUp');
        $('#loginPop').show();
        $('#closeLogin').bind('click',function(){
            $('#loginPop').fadeOut();
        })
        /*if($.support.leadingWhitespace){

         }else{
         $('.tips').show();
         var tipInfo='<img src="images/warning.png">您当前的浏览器暂不支持本站部分控件，请更换<a href="http://www.firefox.com.cn/">火狐</a>或<a href="http://www.google.cn/chrome/browser/desktop/">chrome浏览器</a>，为您带来不便深表歉意！';
         $('.tips').html(tipInfo);
         }*/

        function asyncLogin()
        {
            if("登录中..." == $("#login_").html()){
                return;
            }
            var username = $("#userName").val();
            var password = $("#pwd").val();

            if (!username)
            {
                $('.warningTipName').html('请输入用户名！');
                $("#userName").focus();
                return;
            }

            if (!password)
            {
                $('.warningTipPsd').html('请输入密码！');
                $("#pwd").focus();
                return;
            }
            /********** 异步登录 **************/
                // $("#loadingtip").show();
            $("#login_").html("登录中...");
            $.ajax({
                type: 'POST',
                url: HiRrl,
                dataType: 'json',
                data: {'username':username,'password':password},
                error: function (xhr, state, exception) {
                    $("#login_").html("登录");
                    $("#loadingtip").hide();
                    $('.warningTip').html('登录失败！')
                },
                success: function (jsonResponse) {
                    // $("#loadingtip").hide();
                    if (parseInt(jsonResponse['RESULT_CODE'])){
                        $("#remberPassword").attr('checked', false);
                        removeCookie('higo.hotel.rememberPasswd');
                        $('.warningTip').html(jsonResponse['MSG'])
                        $("#login_").html("登录");
                    } else {
                        if ($('#remberPassword').prop('checked'))
                        {
                            setCookie('higo.hotel.username', username);
                            setCookie('higo.hotel.password', encodeURI(password));
                        }
                        else
                        {
                            removeCookie('higo.hotel.username');
                            removeCookie('higo.hotel.password');
                        }
                        var main_action = "/auth/main_new.action"; //主页action
                        /* 								if ($("#newVersion").is(':checked'))
                         {
                         main_action = "auth/main_new.action";
                         }
                         else
                         {
                         main_action = "auth/main.action";
                         } */
                        //$("#login_").html("登录");
                        window.location.href = main_action;
                    }
                }
            });
            /*********************************/
        }



        /** 增加键盘事件监听 */
        $("#userName").keydown(function(event){
            var e = event || window.event;
            var k = e.keyCode || e.which;
            e.stopPropagation();
            if (k == 13) // 回车键
            {
                $("#pwd").focus();
            }
        });

        $("#pwd").keydown(function(event){
            var e = event || window.event;
            var k = e.keyCode || e.which;
            e.stopPropagation();
            if (k == 13) // 回车键
            {
                asyncLogin();
            }
        });

        $("#login_").click(function(){
            asyncLogin();
        });


        /********** 记住密码处理 ***********/
        var cookieuser = getCookie('higo.hotel.username');
        var cookiepassword = getCookie('higo.hotel.password') ? decodeURI(getCookie('higo.hotel.password')) : null;
        var rememberPasswdOption = getCookie('higo.hotel.rememberPasswd');
        var newVersion = getCookie('higo.hotel.newVersion');

        if (cookieuser)
        {
            $("#userName").val(cookieuser);
        }

        if (cookiepassword)
        {
            $("#pwd").val(cookiepassword);
        }

        if (rememberPasswdOption && 'true' === rememberPasswdOption)
        {
            $('#remberPassword').attr('checked',true)
        }

        if (newVersion && 'true' === newVersion)
        {
            $('#newVersion').attr('checked',true)
        }

        $("#remberPassword").change(function() {
            if ($(this).prop('checked'))
            {
                setCookie('higo.hotel.rememberPasswd', 'true');
            }
            else
            {
                removeCookie('higo.hotel.rememberPasswd');
            }
        });

        $("#newVersion").change(function() {
            if ($(this).prop('checked'))
            {
                setCookie('higo.hotel.newVersion', 'true');
            }
            else
            {
                removeCookie('higo.hotel.newVersion');
            }
        });

    })
    
	$('.W-anb-chil').css({'width':$('.W-animg').width()});
	
	$('.W-an').hover(function(){
		$(this).find('.W-anb').stop().animate({'top':'-50px'},400,function(){
			$(this).hide();	
		});
		$(this).find('.W-anb-chil').show().stop().animate({'top':0},500);
	},function(){
		$(this).find('.W-anb').show().stop().animate({'top':'26px'},500);
		$(this).find('.W-anb-chil').stop().animate({'top':'100%'},600,function(){
			$(this).hide();
		});
	});
	
})
    