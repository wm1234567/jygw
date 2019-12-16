var myClass = "home";
var padeChange = 500;
var windowSzie = getPageSize();
var comingSoon, closeTimer;
var labBoo = true;
var labTime = 10000;
$(function () {

    //移动端导航赋值
    $(".mobile_menu").css("right", -windowSzie[2] + "px");
    //移动端输出当前页
    $(".mobile_menu_list li").each(function () {
        var menuCur = $(this).attr("rel");
        if (myClass == menuCur) {
            $(this).children("a").addClass("mobile_menu_list_active");
        }
    });
    //移动端侧边导航
    $(".mobile_menu_close").click(function () {
        //$(this).addClass("animated rubberBand list_s");
        $(this).css("opacity", "0.5");
        //微信隐藏
        $(".foot_wechat_btn_box").fadeOut('fast');
        setTimeout(function () {
            $(".mobile_menu").animate({
                right: -$(window).width() + "px"
            }, 400);
            $(".mobile_menu_box").animate({
                opacity: 0
            }, 400, function () {
                $(".mobile_menu_box").hide();
            });
            //$(".mobile_menu_close").removeClass("animated rubberBand list_s");
            $(".mobile_menu_close").css("opacity", "1");
        }, 500);
    });
    $(".mobile_menu_top .list").click(function () {
        //$(this).addClass("animated tada list_s");
        $(this).find(".nav_icon_list").css("background", "#666");
        setTimeout(function () {
            $(".mobile_menu").animate({
                right: 0
            }, 400);
            $(".mobile_menu_box").show();
            $(".mobile_menu_box").animate({
                opacity: 1
            }, 400);
            //$(".mobile_menu_top .list").removeClass("animated tada list_s");
            $(".mobile_menu_top .list").find(".nav_icon_list").css("background",
                "#cdcdcd");
        }, 500);
    });
    $(".mobile_menu_box").click(function () {
        $(".mobile_menu").animate({
            right: -$(window).width() + "px"
        }, 400);
        $(".mobile_menu_box").animate({
            opacity: 0
        }, 400, function () {
            $(".mobile_menu_box").hide();
        });
        $(".mobile_menu_close").css("opacity", "1");
    });
    //PC搜索框状态切换
    $("#search").click(function () {
        if ($(".search_box").is(":hidden")) {
            $(".search_box").show();
            $("#search_tx").focus();
        } else {
            $(".search_box").hide();
        }
    });
    //判断是否执行LAB动画（。。。）
    if (HL.Cookie.Get('B-LAB') == 'true') {
        labBoo = false;
    }
    if (labBoo == true) {
        setTimeout(function () {
            $('.m-y1').addClass('m-y1-animation');
            $('.m-y2').addClass('m-y2-animation');
            $('.m-y3').addClass('m-y3-animation');
            $('.m-y-big').addClass('m-y-big-animation');
        }, labTime);
    }
    //pc输出当前页
    $(".pc_menu_list li").each(function () {
        var menuCur = $(this).attr("rel");
        if (myClass == menuCur) {
            $(this).children("a").addClass("pc_menu_list_active").removeClass(
                "hvr-fade hvr-fade-menu");
        }
    });
    //banner箭头点击
    $(".aarow_box").click(function () {
        var menuHeight;
        if ($(".pc_menu").is(":hidden")) {
            menuHeight = $(".mobile_menu_top").height();
        } else {
            menuHeight = $(".pc_menu").height();
        }
        $.scrollTo($('.next_page').offset().top - menuHeight, 500);
    });
    //返回顶部点击
    //$(".back_top button").click(function(){
    //	$.scrollTo(0,500);
    //});
    $(".back_top .aarow").click(function () {
        $.scrollTo(0, 500);
    });
    //pc顶部导航状态切换,以及返回顶部显示
    pcMenuType();
    $(window).on('scroll', function (e) {
        pcMenuType();
    });
});

//banner箭头
var aarowAnimation;

function aarow_animation() {
    clearTimeout(aarowAnimation);
    aarowAnimation = setTimeout(function () {
        if ($(".aarow_box").hasClass("animated")) {
            $(".aarow_box").removeClass("animated aarowMove");
        } else {
            $(".aarow_box").addClass("animated aarowMove");
        }
        aarow_animation();
    }, 2000);
}
//pc顶部导航状态切换,以及返回顶部状态切换
function pcMenuType() {
    var scrolled = $(window).scrollTop();
    if (scrolled - 200 > 0) {
        $(".pc_menu").removeClass("nofull");
        $(".pc_menu").addClass("full");
    } else {
        $(".pc_menu").removeClass("full");
        $(".pc_menu").addClass("nofull");
    }
    // if (scrolled - windowSzie[3] > 0) {
    //     $(".back_top").fadeIn("fast");
    // } else {
    //     $(".back_top").fadeOut("fast");
    // }
}
//判断宽度,显示相应内容
function contentChange() {
    if (isPhone() == true) {
        $(".pc_t").hide();
        $(".mobile_t").show();
    } else {
        $(".pc_t").show();
        $(".mobile_t").hide();
    }
}

function isPhone() {
    //获取可是窗口实际宽高
    var dom = document.getElementById("media_szie");
    var oStyle = dom.currentStyle ? dom.currentStyle : window.getComputedStyle(dom, null);
    var content;
    if (oStyle.getPropertyValue) {
        content = oStyle.getPropertyValue("content");
    } else {
        content = oStyle.getAttribute("content");
    }
    content = content.replace(/(^")|("$)/g, '');
    if (content == "phone") {
        return true;
    } else {
        return false;
    }
}