package cz.cvut.fel.skillmatrix.service.mapper;


import cz.cvut.fel.skillmatrix.domain.UserRole;
import cz.cvut.fel.skillmatrix.domain.*;
import cz.cvut.fel.skillmatrix.service.dto.UserRoleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserRole} and its DTO {@link UserRoleDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UserRoleMapper extends EntityMapper<UserRoleDTO, UserRole> {


    @Mapping(target = "cCUsers", ignore = true)
    @Mapping(target = "removeCCUser", ignore = true)
    UserRole toEntity(UserRoleDTO userRoleDTO);

    default UserRole fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserRole userRole = new UserRole();
        userRole.setId(id);
        return userRole;
    }
}
