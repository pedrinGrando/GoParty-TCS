package go.party.tcs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import go.party.tcs.model.Formatura;
import go.party.tcs.repository.FormaturaRepository;

@Service
public class FormaturaService {
    
    @Autowired
    private FormaturaRepository formaturaRepository;

    public Formatura cadastrarSolicitacaoAdm(Formatura formatura){
           formaturaRepository.save(formatura);
           return formatura;
    }
}
