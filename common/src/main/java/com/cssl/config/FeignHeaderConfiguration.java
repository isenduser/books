package com.cssl.config;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.web.http.SessionRepositoryFilter;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
@Configuration
public class FeignHeaderConfiguration {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {

            //通过RequestContextHolder获取本地请求
            RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
            System.out.println("apply:"+requestTemplate);
            System.out.println("apply:"+requestAttributes);
            if (requestAttributes == null) {
                return;
            }
            //获取本地线程绑定的请求对象
            HttpServletRequest request = ((ServletRequestAttributes) requestAttributes).getRequest();
            //给请求模板附加本地线程头部信息，主要是cookie信息
            Enumeration headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String name = headerNames.nextElement().toString();
                requestTemplate.header(name, request.getHeader(name));
            }
            if(!request.isRequestedSessionIdValid()){
                request.setAttribute(SessionRepositoryFilter.INVALID_SESSION_ID_ATTR,null);
                requestTemplate.header("cookie","SESSION="+request.getSession().getId());
                System.out.println("apply sessionId:"+request.getSession().getId());
            }
        };
    }
}
