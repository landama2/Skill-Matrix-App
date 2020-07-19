package org.jhipster.blog.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A UserRole.
 */
@Entity
@Table(name = "user_role")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserRole implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "userRole")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CCUser> cCUsers = new HashSet<>();

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

    public UserRole name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<CCUser> getCCUsers() {
        return cCUsers;
    }

    public UserRole cCUsers(Set<CCUser> cCUsers) {
        this.cCUsers = cCUsers;
        return this;
    }

    public UserRole addCCUser(CCUser cCUser) {
        this.cCUsers.add(cCUser);
        cCUser.setUserRole(this);
        return this;
    }

    public UserRole removeCCUser(CCUser cCUser) {
        this.cCUsers.remove(cCUser);
        cCUser.setUserRole(null);
        return this;
    }

    public void setCCUsers(Set<CCUser> cCUsers) {
        this.cCUsers = cCUsers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserRole)) {
            return false;
        }
        return id != null && id.equals(((UserRole) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserRole{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
