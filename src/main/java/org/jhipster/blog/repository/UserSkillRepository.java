package org.jhipster.blog.repository;

import org.jhipster.blog.domain.UserSkill;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UserSkill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {
}
