package org.jhipster.blog.service.mapper;


import org.jhipster.blog.domain.*;
import org.jhipster.blog.service.dto.UserSkillDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserSkill} and its DTO {@link UserSkillDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, SkillLevelMapper.class, SkillMapper.class})
public interface UserSkillMapper extends EntityMapper<UserSkillDTO, UserSkill> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "skillLevel.id", target = "skillLevelId")
    @Mapping(source = "skill.id", target = "skillId")
    UserSkillDTO toDto(UserSkill userSkill);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "skillLevelId", target = "skillLevel")
    @Mapping(source = "skillId", target = "skill")
    UserSkill toEntity(UserSkillDTO userSkillDTO);

    default UserSkill fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserSkill userSkill = new UserSkill();
        userSkill.setId(id);
        return userSkill;
    }
}
