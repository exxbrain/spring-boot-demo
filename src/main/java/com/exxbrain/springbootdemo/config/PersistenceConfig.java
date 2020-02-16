package com.exxbrain.springbootdemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;
import java.util.stream.Collectors;

@Configuration
public class PersistenceConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    public PersistenceConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        Class[] entityClasses = entityManager.getMetamodel()
            .getEntities().stream()
            .map(Type::getJavaType)
            .toArray(Class[]::new);
        config.exposeIdsFor(entityClasses);
    }
}
