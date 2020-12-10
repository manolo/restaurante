package es.codemotion.rte.data.service;

import es.codemotion.rte.data.entity.Command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.vaadin.artur.helpers.CrudService;
import java.time.LocalDate;
import javax.annotation.Nullable;

@Service
public class CommandService extends CrudService<Command, Integer> {

    private CommandRepository repository;

    public CommandService(@Autowired CommandRepository repository) {
        this.repository = repository;
    }

    @Override
    protected CommandRepository getRepository() {
        return repository;
    }

}
