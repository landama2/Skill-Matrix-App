package org.jhipster.blog.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link org.jhipster.blog.domain.UserSkill} entity.
 */
public class UserSkillDTO implements Serializable {
    
    private Long id;

    private Instant changedAt;


    private Long userId;

    private Long skillLevelId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(Instant changedAt) {
        this.changedAt = changedAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long cCUserId) {
        this.userId = cCUserId;
    }

    public Long getSkillLevelId() {
        return skillLevelId;
    }

    public void setSkillLevelId(Long skillLevelId) {
        this.skillLevelId = skillLevelId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserSkillDTO userSkillDTO = (UserSkillDTO) o;
        if (userSkillDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userSkillDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserSkillDTO{" +
            "id=" + getId() +
            ", changedAt='" + getChangedAt() + "'" +
            ", userId=" + getUserId() +
            ", skillLevelId=" + getSkillLevelId() +
            "}";
    }
}
