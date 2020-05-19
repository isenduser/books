package com.cssl;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@SpringBootApplication
@EnableDiscoveryClient
@MapperScan("com.cssl.dao")
@EnableRedisHttpSession
public class BookProviderApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookProviderApplication.class, args);
    }

}
