package es.codemotion.rte.data.generator;

import com.vaadin.flow.spring.annotation.SpringComponent;

import es.codemotion.rte.data.service.CommandRepository;
import es.codemotion.rte.data.entity.Command;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.vaadin.artur.exampledata.DataType;
import org.vaadin.artur.exampledata.ExampleDataGenerator;

@SpringComponent
public class DataGenerator {

    @Bean
    public CommandLineRunner loadData(CommandRepository commandRepository) {
        return args -> {
            Logger logger = LoggerFactory.getLogger(getClass());
            if (commandRepository.count() != 0L) {
                logger.info("Using existing database");
                return;
            }
            int seed = 123;

            logger.info("Generating demo data");

            logger.info("... generating 100 Command entities...");
            ExampleDataGenerator<Command> commandRepositoryGenerator = new ExampleDataGenerator<>(Command.class);
            commandRepositoryGenerator.setData(Command::setId, DataType.ID);
            commandRepositoryGenerator.setData(Command::setTableNumber, DataType.NUMBER_UP_TO_10);
            commandRepositoryGenerator.setData(Command::setType, DataType.WORD);
            commandRepositoryGenerator.setData(Command::setDescription, DataType.SENTENCE);
            commandRepositoryGenerator.setData(Command::setQuantity, DataType.NUMBER_UP_TO_10);
            commandRepositoryGenerator.setData(Command::setHour, DataType.DATE_OF_BIRTH);
            commandRepositoryGenerator.setData(Command::setServed, DataType.BOOLEAN_50_50);
            commandRepository.saveAll(commandRepositoryGenerator.create(100, seed));

            logger.info("Generated demo data");
        };
    }

}