package cz.cvut.fel.skillmatrix.config;

import java.time.Duration;

import cz.cvut.fel.skillmatrix.domain.*;
import cz.cvut.fel.skillmatrix.repository.UserRepository;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, User.class.getName());
            createCache(cm, Authority.class.getName());
            createCache(cm, User.class.getName() + ".authorities");
            createCache(cm, Blog.class.getName());
            createCache(cm, Entry.class.getName());
            createCache(cm, Entry.class.getName() + ".tags");
            createCache(cm, Tag.class.getName());
            createCache(cm, Tag.class.getName() + ".entries");
            createCache(cm, CCUser.class.getName());
            createCache(cm, CCUser.class.getName() + ".userSkills");
            createCache(cm, UserRole.class.getName());
            createCache(cm, UserRole.class.getName() + ".cCUsers");
            createCache(cm, UserSkill.class.getName());
            createCache(cm, SkillLevel.class.getName());
            createCache(cm, SkillLevel.class.getName() + ".userSkills");
            createCache(cm, Skill.class.getName());
            createCache(cm, Skill.class.getName() + ".cCUsers");
            createCache(cm, Category.class.getName());
            createCache(cm, Category.class.getName() + ".subCategories");
            createCache(cm, Category.class.getName() + ".skills");
            createCache(cm, SubCategory.class.getName());
            createCache(cm, SubCategory.class.getName() + ".skills");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

}
