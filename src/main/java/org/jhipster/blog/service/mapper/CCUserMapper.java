package org.jhipster.blog.service.mapper;


import org.jhipster.blog.domain.*;
import org.jhipster.blog.service.dto.CCUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link CCUser} and its DTO {@link CCUserDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserRoleMapper.class, SkillMapper.class})
public interface CCUserMapper extends EntityMapper<CCUserDTO, CCUser> {

    @Mapping(source = "userRole.id", target = "userRoleId")
//    @Mapping(source = "skill.id", target = "skillId")
    CCUserDTO toDto(CCUser cCUser);

    @Mapping(target = "userSkills", ignore = true)
    @Mapping(target = "removeUserSkill", ignore = true)
    @Mapping(source = "userRoleId", target = "userRole")
//    @Mapping(source = "skillId", target = "skill")
    CCUser toEntity(CCUserDTO cCUserDTO);

    default CCUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        CCUser cCUser = new CCUser();
        cCUser.setId(id);
        return cCUser;
    }
}
