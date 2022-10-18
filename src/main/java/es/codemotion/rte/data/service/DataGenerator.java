package es.codemotion.rte.data.service;

import java.time.LocalTime;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import com.vaadin.flow.spring.annotation.SpringComponent;

import es.codemotion.rte.data.entity.Command;

@SpringComponent
public class DataGenerator {

    final Random rand = new Random();

    @Bean
    public CommandLineRunner loadData(CommandRepository commandRepository) {

        return args -> {
            Logger logger = LoggerFactory.getLogger(getClass());
            if (commandRepository.count() != 0L) {
                logger.info("Using existing database");
                return;
            }

            String[] types = { "bebida", "tapa", "desayuno", "comida", "postre", "racion" };
            String[][] descs = {
                    { "cerveza alhambra", "caña", "refresco limon", "refresco naranja", "vino tinto", "agua",
                            "vino blanco" },
                    { "tortilla", "aceitunas", "ensaladilla", "berenjenas", "patatas fritas" },
                    { "tostada simple", "tostada completa", "cafe", "chocolate", "magdalena", "croissant" },
                    { "paella", "lentejas", "plato combinado", "chuleta", "pescado" },
                    { "tarta", "arroz con leche", "flan", "fruta" },
                    { "calamares", "oreja", "huevos rotos", "gambas", "jamon", "queso" }
            };

            for (int i = 0; i < 10; i++) {
                int mesa = rand.nextInt(8) + 1;
                int quantity = rand.nextInt(5) + 1;
                int t = rand.nextInt(types.length);
                String type = types[t];
                String[] arr = descs[t];
                int d = rand.nextInt(arr.length);
                String description = arr[d];
                Command command = new Command(mesa, type, description, quantity, LocalTime.now(), false);
                commandRepository.save(command);
            }

            logger.info("Generated demo data");
        };
    }

}