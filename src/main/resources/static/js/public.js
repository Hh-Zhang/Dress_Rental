$(function() {

	$(".nav ul li a:last").css("border","none");
	$('nav#mmenu').mmenu({
		extensions	: [ 'effect-slide-menu', 'pageshadow' ],
		counters	: false,
		navbar 		: {
			title		: '菜单',
		},
		navbars		: [
			 {
				position	: 'top',
				content		: [
					'prev',
					'title',
					'close'
				]
			}, {
				position	: 'bottom',
				content		: [
					''
				]
			} 
		]
	});
	/*index*/
	
    $('.banner').slick({
		dots: true,
        autoplay:true,
        arrows:false, 
        autoplaySpeed:3000,
    });
     $('.banner_x').slick({
		dots: true,
        autoplay:true,
        arrows:false, 
        autoplaySpeed:3000,
    });
		

			
});

	

if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
	new WOW().init();
};	


   $('.pro_com').slick({
	    	  dots: true,
			  arrows:false,
	    	  autoplay: true,
			  speed: 1000,
			  slidesToShow: 4,
			  slidesToScroll: 4,
			  
			  responsive: [
			 
			    {
			      breakpoint: 992,
			      settings: {
			        slidesToShow: 3,
			        slidesToScroll: 3,
			        dots:true,
			        arrows:false,
			      }
			    },
			    
			    {
			      breakpoint: 786,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2,
		            dots: true,
			        arrows:false,
			      }
			    },
			    {
			      breakpoint: 640,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll:2,
			        dots:true,
			        arrows:false,
			      }
			    }, {
			      breakpoint: 480,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll:1,
			        dots:true,
			        arrows:false,
			      }
			    }
			  ]
			    
		});
		
 $('.nei').slick({
		dots: false,
        autoplay:true,
        arrows:true, 
        autoplaySpeed:3000, 	 
	   slidesToShow: 6,
	   slidesToScroll: 1,
	    responsive: [
			 
			    {
			      breakpoint: 992,
			      settings: {
			        slidesToShow: 5,
			        slidesToScroll: 1,
			        dots:false,
			        arrows:false,
			      }
			    },
			    
			    {
			      breakpoint: 786,
			      settings: {
			        slidesToShow: 4,
			        slidesToScroll: 1,
		            dots: false,
			        arrows:false,
			      }
			    },
			    {
			      breakpoint: 640,
			      settings: {
			        slidesToShow: 4,
			        slidesToScroll:1,
			        dots:false,
			        arrows:false,
			      }
			    }, {
			      breakpoint: 480,
			      settings: {
			        slidesToShow: 3,
			        slidesToScroll:1,
			        dots:false,
			        arrows:false,
			      } 
			    }
			  ]
    });
    
$(".er_show").hover(function(){
	$(".er_img").show();
},function(){
	$(".er_img").hide();
})

		var left_img = $(".left_img img").attr("src");
		$(".kehu_s_xiao li").hover(function(){
			var img_src = $(this).find("img").attr("src");
			$(".left_img img").attr("src",img_src);
			$(this).addClass("active").siblings("li").removeClass("active");
		},function(){
			
		})
  
  