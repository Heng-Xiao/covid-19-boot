package com.xiao.covids.config;

import com.xiao.covids.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author xiao
 * @Description:登录拦截器相关配置
 * @create 2022-06-26 16:16
 */
@Configuration
public class AdminWebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                //拦截的
                .addPathPatterns("/**")
                //放行的
                .excludePathPatterns("/","/login","/login.html","/regist","/sendyanzm","/regist.html","/login/**");
    }
}
