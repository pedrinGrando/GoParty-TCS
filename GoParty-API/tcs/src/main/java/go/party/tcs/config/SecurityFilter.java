package go.party.tcs.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import go.party.tcs.repository.UsuarioRepository;
import go.party.tcs.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    @SuppressWarnings("null")
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = this.recoverJWT(request);
        if (token != null) {
            String username = jwtService.validateToken(token);
            UserDetails user = usuarioRepository.findByUsername(username);
            if (user != null) {
                UsernamePasswordAuthenticationToken autorizathion = new UsernamePasswordAuthenticationToken(null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(autorizathion);
            }
        }
        filterChain.doFilter(request, response);
    }

    private String recoverJWT(HttpServletRequest request) {
        String autorizathionHeader = request.getHeader("Authorization");
        return (autorizathionHeader == null) ? null : autorizathionHeader.replace("Bearer ", "");
    }

}
