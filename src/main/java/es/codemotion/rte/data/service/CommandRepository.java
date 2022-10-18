package es.codemotion.rte.data.service;

import org.springframework.data.jpa.repository.JpaRepository;

import es.codemotion.rte.data.entity.Command;

public interface CommandRepository extends JpaRepository<Command, Integer> {

}
