package cz.cvut.fel.skillmatrix.service.dto;

import cz.cvut.fel.skillmatrix.domain.UserRole;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link UserRole} entity.
 */
public class UserRoleDTO implements Serializable {

    private Long id;

    private String name;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserRoleDTO userRoleDTO = (UserRoleDTO) o;
        if (userRoleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userRoleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserRoleDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
