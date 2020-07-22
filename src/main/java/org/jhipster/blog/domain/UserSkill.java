package org.jhipster.blog.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

/**
 * A UserSkill.
 */
@Entity
@Table(name = "user_skill")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserSkill implements Serializable {

    private static final long serialVersionUID = 2L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "changed_at")
    private Instant changedAt;

    @ManyToOne
    @JsonIgnoreProperties("userSkills")
    private CCUser user;

    @ManyToOne
    @JsonIgnoreProperties("userSkills")
    private SkillLevel skillLevel;

    @ManyToOne
//    @JoinColumn(name = "SKILL_ID")//probably useless
    @JsonIgnoreProperties("userSkills")
    private Skill skill;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getChangedAt() {
        return changedAt;
    }

    public UserSkill changedAt(Instant changedAt) {
        this.changedAt = changedAt;
        return this;
    }

    public void setChangedAt(Instant changedAt) {
        this.changedAt = changedAt;
    }

    public CCUser getUser() {
        return user;
    }

    public UserSkill user(CCUser cCUser) {
        this.user = cCUser;
        return this;
    }

    public void setUser(CCUser cCUser) {
        this.user = cCUser;
    }

    public SkillLevel getSkillLevel() {
        return skillLevel;
    }

    public UserSkill skillLevel(SkillLevel skillLevel) {
        this.skillLevel = skillLevel;
        return this;
    }

    public UserSkill skill(Skill skill) {
        this.skill = skill;
        return this;
    }

    public void setSkillLevel(SkillLevel skillLevel) {
        this.skillLevel = skillLevel;
    }

    public Skill getSkill() {
        return skill;
    }
//
    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserSkill)) {
            return false;
        }
        return id != null && id.equals(((UserSkill) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserSkill{" +
            "id=" + getId() +
            ", changedAt='" + getChangedAt() + "'" +
            "}";
    }
}
