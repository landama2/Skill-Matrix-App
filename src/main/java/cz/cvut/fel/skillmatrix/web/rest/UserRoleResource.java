package cz.cvut.fel.skillmatrix.web.rest;

import cz.cvut.fel.skillmatrix.domain.UserRole;
import cz.cvut.fel.skillmatrix.service.UserRoleService;
import cz.cvut.fel.skillmatrix.service.dto.UserRoleDTO;
import cz.cvut.fel.skillmatrix.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link UserRole}.
 */
@RestController
@RequestMapping("/api")
public class UserRoleResource {

    private final Logger log = LoggerFactory.getLogger(UserRoleResource.class);

    private static final String ENTITY_NAME = "userRole";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserRoleService userRoleService;

    public UserRoleResource(UserRoleService userRoleService) {
        this.userRoleService = userRoleService;
    }

    /**
     * {@code POST  /user-roles} : Create a new userRole.
     *
     * @param userRoleDTO the userRoleDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userRoleDTO, or with status {@code 400 (Bad Request)} if the userRole has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-roles")
    public ResponseEntity<UserRoleDTO> createUserRole(@RequestBody UserRoleDTO userRoleDTO) throws URISyntaxException {
        log.debug("REST request to save UserRole : {}", userRoleDTO);
        if (userRoleDTO.getId() != null) {
            throw new BadRequestAlertException("A new userRole cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserRoleDTO result = userRoleService.save(userRoleDTO);
        return ResponseEntity.created(new URI("/api/user-roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-roles} : Updates an existing userRole.
     *
     * @param userRoleDTO the userRoleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userRoleDTO,
     * or with status {@code 400 (Bad Request)} if the userRoleDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userRoleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-roles")
    public ResponseEntity<UserRoleDTO> updateUserRole(@RequestBody UserRoleDTO userRoleDTO) throws URISyntaxException {
        log.debug("REST request to update UserRole : {}", userRoleDTO);
        if (userRoleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserRoleDTO result = userRoleService.save(userRoleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userRoleDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-roles} : get all the userRoles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userRoles in body.
     */
    @GetMapping("/user-roles")
    public List<UserRoleDTO> getAllUserRoles() {
        log.debug("REST request to get all UserRoles");
        return userRoleService.findAll();
    }

    /**
     * {@code GET  /user-roles/:id} : get the "id" userRole.
     *
     * @param id the id of the userRoleDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userRoleDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-roles/{id}")
    public ResponseEntity<UserRoleDTO> getUserRole(@PathVariable Long id) {
        log.debug("REST request to get UserRole : {}", id);
        Optional<UserRoleDTO> userRoleDTO = userRoleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userRoleDTO);
    }

    /**
     * {@code DELETE  /user-roles/:id} : delete the "id" userRole.
     *
     * @param id the id of the userRoleDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-roles/{id}")
    public ResponseEntity<Void> deleteUserRole(@PathVariable Long id) {
        log.debug("REST request to delete UserRole : {}", id);
        userRoleService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
