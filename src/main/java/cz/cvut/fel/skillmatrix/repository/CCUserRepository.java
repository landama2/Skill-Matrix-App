package cz.cvut.fel.skillmatrix.repository;

import cz.cvut.fel.skillmatrix.domain.CCUser;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CCUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CCUserRepository extends JpaRepository<CCUser, Long> {
}
