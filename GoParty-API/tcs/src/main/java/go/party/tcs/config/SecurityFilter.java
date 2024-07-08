package go.party.tcs.config;

import java.io.IOException;

import go.party.tcs.model.AppException;
import go.party.tcs.model.Usuario;
import go.party.tcs.service.UsuarioService;
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
    JWTService jwtService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = this.recoverToken(request);
        String username = jwtService.validateToken(token);
        if (username != null) {
            Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow(() -> new AppException("Usuário não encontrado!"));
            var authentication = new UsernamePasswordAuthenticationToken(usuario, null,  usuario.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var auth = request.getHeader("Authorization");
        if (auth == null) return null;
        return auth.replace("Bearer ", "");
    }
}
