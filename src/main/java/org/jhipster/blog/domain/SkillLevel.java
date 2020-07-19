
package org.jhipster.blog.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A SkillLevel.
 */
@Entity
@Table(name = "skill_level")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SkillLevel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "skillLevel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserSkill> userSkills = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public SkillLevel name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<UserSkill> getUserSkills() {
        return userSkills;
    }

    public SkillLevel userSkills(Set<UserSkill> userSkills) {
        this.userSkills = userSkills;
        return this;
    }

    public SkillLevel addUserSkill(UserSkill userSkill) {
        this.userSkills.add(userSkill);
        userSkill.setSkillLevel(this);
        return this;
    }

    public SkillLevel removeUserSkill(UserSkill userSkill) {
        this.userSkills.remove(userSkill);
        userSkill.setSkillLevel(null);
        return this;
    }

    public void setUserSkills(Set<UserSkill> userSkills) {
        this.userSkills = userSkills;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SkillLevel)) {
            return false;
        }
        return id != null && id.equals(((SkillLevel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SkillLevel{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
