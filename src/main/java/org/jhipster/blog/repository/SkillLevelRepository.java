package org.jhipster.blog.repository;

import org.jhipster.blog.domain.SkillLevel;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SkillLevel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SkillLevelRepository extends JpaRepository<SkillLevel, Long> {
}
