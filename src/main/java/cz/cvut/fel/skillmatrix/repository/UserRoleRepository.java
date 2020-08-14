package cz.cvut.fel.skillmatrix.repository;

import cz.cvut.fel.skillmatrix.domain.UserRole;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UserRole entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
}
