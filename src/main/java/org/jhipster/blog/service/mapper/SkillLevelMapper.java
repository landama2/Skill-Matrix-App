package org.jhipster.blog.service.mapper;


import org.jhipster.blog.domain.*;
import org.jhipster.blog.service.dto.SkillLevelDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link SkillLevel} and its DTO {@link SkillLevelDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SkillLevelMapper extends EntityMapper<SkillLevelDTO, SkillLevel> {


    @Mapping(target = "userSkills", ignore = true)
    @Mapping(target = "removeUserSkill", ignore = true)
    SkillLevel toEntity(SkillLevelDTO skillLevelDTO);

    default SkillLevel fromId(Long id) {
        if (id == null) {
            return null;
        }
        SkillLevel skillLevel = new SkillLevel();
        skillLevel.setId(id);
        return skillLevel;
    }
}
