package es.codemotion.rte.data.service;

import es.codemotion.rte.data.entity.Command;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import javax.annotation.Nullable;

public interface CommandRepository extends JpaRepository<Command, Integer> {

}