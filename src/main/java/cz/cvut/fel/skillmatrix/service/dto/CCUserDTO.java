package cz.cvut.fel.skillmatrix.service.dto;

import cz.cvut.fel.skillmatrix.domain.CCUser;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link CCUser} entity.
 */
public class CCUserDTO implements Serializable {

    private Long id;

    private String fullName;

    private Instant createdAt;

    private Long userRoleId;

    private Long skillId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Long getUserRoleId() {
        return userRoleId;
    }

    public void setUserRoleId(Long userRoleId) {
        this.userRoleId = userRoleId;
    }

    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CCUserDTO cCUserDTO = (CCUserDTO) o;
        if (cCUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cCUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CCUserDTO{" +
            "id=" + getId() +
            ", fullName='" + getFullName() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", userRoleId=" + getUserRoleId() +
            ", skillId=" + getSkillId() +
            "}";
    }
}
