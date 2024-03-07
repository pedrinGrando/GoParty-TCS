package go.party.tcs.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter("/*")
public class Autentication implements Filter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        // Verifique se o usuário está autenticado (verifique a sessão)
        if (request.getSession().getAttribute("usuario") != null) {
            // Usuário autenticado, continue a cadeia de filtros
            chain.doFilter(req, res);
        } else {
            // Usuário não autenticado, redirecione para a página de login
            response.sendRedirect(request.getContextPath() + "/login");
        }
    }

    // Outros métodos do filtro (init e destroy) não são implementados aqui.
}

