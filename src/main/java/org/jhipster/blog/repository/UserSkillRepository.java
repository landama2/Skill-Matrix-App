package org.jhipster.blog.repository;

import org.jhipster.blog.domain.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserSkill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {

    @Query(value = "select distinct userSkill from UserSkill userSkill " +
        "left join fetch userSkill.user " +
        "left join fetch userSkill.skillLevel " +
        "WHERE userSkill.skillLevel.id IS NOT NULL AND userSkill.skill.name = ?1 " +
        " order by userSkill.skillLevel.id DESC",
        countQuery = "select count(distinct userSkill) from UserSkill userSkill")
    List<UserSkill> findAllBySkill(String name);
}
