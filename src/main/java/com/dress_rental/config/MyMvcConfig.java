package com.dress_rental.config;


import com.dress_rental.component.LoginHandlerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MyMvcConfig extends WebMvcConfigurerAdapter {
    @Override//添加静态资源映射
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/templates/**").addResourceLocations("classpath:/templates/");
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
        super.addResourceHandlers(registry);
    }

    //所有的WebMvcConfigurerAdapter组件都会一起起作用
    @Bean//将component组件注册在容器
    public WebMvcConfigurerAdapter webMvcConfigurerAdapter() {
        WebMvcConfigurerAdapter adapter = new WebMvcConfigurerAdapter() {
            //添加视图映射
            @Override
            public void addViewControllers(ViewControllerRegistry registry) {
//                    registry.addViewController("/login.html").setViewName("login.html");
//                    registry.addViewController("/index.html").setViewName("login.html");
                // registry.addViewController("/judge.html").setViewName("judge");

            }

            //注册拦截器
            public void addInterceptors(InterceptorRegistry interceptorRegistry) {
                super.addInterceptors(interceptorRegistry);
                //SpringBoot已经做好了静态资源映射
                interceptorRegistry.addInterceptor(new LoginHandlerInterceptor()).addPathPatterns("/**")//拦截所有
                        .excludePathPatterns("/static/**", "/toLogin", "/login.html", "/Login", "/register.html", "/index.html", "/case.html", "/qryprepromotion", "/case_show.html", "/qrypreWedding","/getname");//排除几个不拦截的请求

            }

        };
        return adapter;

    }


}
