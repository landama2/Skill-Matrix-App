package org.jhipster.blog.repository;

import org.jhipster.blog.domain.CCUser;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CCUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CCUserRepository extends JpaRepository<CCUser, Long> {
}
