package cz.cvut.fel.skillmatrix.service.mapper;


import cz.cvut.fel.skillmatrix.domain.CCUser;
import cz.cvut.fel.skillmatrix.domain.*;
import cz.cvut.fel.skillmatrix.service.dto.CCUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link CCUser} and its DTO {@link CCUserDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserRoleMapper.class, SkillMapper.class})
public interface CCUserMapper extends EntityMapper<CCUserDTO, CCUser> {

    @Mapping(source = "userRole.id", target = "userRoleId")
    CCUserDTO toDto(CCUser cCUser);

    @Mapping(source = "userRoleId", target = "userRole")
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
