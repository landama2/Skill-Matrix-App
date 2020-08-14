package cz.cvut.fel.skillmatrix.repository;

import cz.cvut.fel.skillmatrix.domain.Skill;
import cz.cvut.fel.skillmatrix.service.dto.SkillFullDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Skill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    @Query(value = "select distinct skill from Skill skill " +
        "left join fetch skill.category " +
        "left join fetch skill.subCategory",
        countQuery = "select count(distinct skill) from Skill skill")
    Page<Skill> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "SELECT * FROM SKILL " +
        "LEFT JOIN CATEGORY ON CATEGORY.ID = CATEGORY_ID " +
        "LEFT JOIN USER_SKILL ON USER_SKILL.SKILL_ID = SKILL.ID",
        nativeQuery = true)
    Page<SkillFullDTO> findAllWithUserSkill(Pageable pageable);
}
