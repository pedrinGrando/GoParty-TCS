package go.party.tcs.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") 
                .allowedOrigins("http://34.39.132.164:5173", "http://localhost:5173")
                .allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS") 
                .allowedHeaders("*") 
                .allowCredentials(true); 
    }
}
