package go.party.tcs.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationProperties.Http;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    SecurityFilter filter;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/v1/auth/**").permitAll()
                        .requestMatchers(HttpMethod.POST ,"/v1/eventos/criar-evento/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.POST, "/v1/eventos/upload-event-image/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.GET, "/v1/eventos/buscar-eventos/**").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/v1/eventos/curtidas/**").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/v1/fomaturas/ser-adm/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.POST, "/v1/fomaturas/upload-grad-image/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.POST, "/v1/fomaturas/upload-matricula-pdf/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.GET, "/v1/fomaturas/uploads/**").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.POST, "/v1/ingressos/comprar-ingresso").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/v1/ingressos/seus-ingressos/**").hasRole("USER")
                        .requestMatchers("/v1/usuarios/**").hasRole("USER"))
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class).build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Permitir somente origens específicas
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Métodos HTTP permitidos
        configuration.setAllowedHeaders(Arrays.asList("*")); // Todos os cabeçalhos permitidos
        configuration.setAllowCredentials(true); // Permitir credenciais
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplicar a configuração CORS para todos os caminhos
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
