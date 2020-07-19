package org.jhipster.blog.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A CCUser.
 */
@Entity
@Table(name = "cc_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CCUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "created_at")
    private Instant createdAt;

    @OneToMany(mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserSkill> userSkills = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("cCUsers")
    private UserRole userRole;

    @ManyToOne
    @JsonIgnoreProperties("cCUsers")
    private Skill skill;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public CCUser fullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public CCUser createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Set<UserSkill> getUserSkills() {
        return userSkills;
    }

    public CCUser userSkills(Set<UserSkill> userSkills) {
        this.userSkills = userSkills;
        return this;
    }

    public CCUser addUserSkill(UserSkill userSkill) {
        this.userSkills.add(userSkill);
        userSkill.setUser(this);
        return this;
    }

    public CCUser removeUserSkill(UserSkill userSkill) {
        this.userSkills.remove(userSkill);
        userSkill.setUser(null);
        return this;
    }

    public void setUserSkills(Set<UserSkill> userSkills) {
        this.userSkills = userSkills;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public CCUser userRole(UserRole userRole) {
        this.userRole = userRole;
        return this;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public Skill getSkill() {
        return skill;
    }

    public CCUser skill(Skill skill) {
        this.skill = skill;
        return this;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CCUser)) {
            return false;
        }
        return id != null && id.equals(((CCUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CCUser{" +
            "id=" + getId() +
            ", fullName='" + getFullName() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            "}";
    }
}
