package cz.cvut.fel.skillmatrix.web.rest;

import cz.cvut.fel.skillmatrix.domain.CCUser;
import cz.cvut.fel.skillmatrix.service.CCUserService;
import cz.cvut.fel.skillmatrix.service.dto.CCUserDTO;
import cz.cvut.fel.skillmatrix.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link CCUser}.
 */
@RestController
@RequestMapping("/api")
public class CCUserResource {

    private final Logger log = LoggerFactory.getLogger(CCUserResource.class);

    private static final String ENTITY_NAME = "cCUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CCUserService cCUserService;

    public CCUserResource(CCUserService cCUserService) {
        this.cCUserService = cCUserService;
    }

    /**
     * {@code POST  /cc-users} : Create a new cCUser.
     *
     * @param cCUserDTO the cCUserDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cCUserDTO, or with status {@code 400 (Bad Request)} if the cCUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cc-users")
    public ResponseEntity<CCUserDTO> createCCUser(@RequestBody CCUserDTO cCUserDTO) throws URISyntaxException {
        log.debug("REST request to save CCUser : {}", cCUserDTO);
        if (cCUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new cCUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CCUserDTO result = cCUserService.save(cCUserDTO);
        return ResponseEntity.created(new URI("/api/cc-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cc-users} : Updates an existing cCUser.
     *
     * @param cCUserDTO the cCUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cCUserDTO,
     * or with status {@code 400 (Bad Request)} if the cCUserDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cCUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cc-users")
    public ResponseEntity<CCUserDTO> updateCCUser(@RequestBody CCUserDTO cCUserDTO) throws URISyntaxException {
        log.debug("REST request to update CCUser : {}", cCUserDTO);
        if (cCUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CCUserDTO result = cCUserService.save(cCUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cCUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cc-users} : get all the cCUsers.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cCUsers in body.
     */
    @GetMapping("/cc-users")
    public ResponseEntity<List<CCUserDTO>> getAllCCUsers(Pageable pageable) {
        log.debug("REST request to get a page of CCUsers");
        Page<CCUserDTO> page = cCUserService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /cc-users/:id} : get the "id" cCUser.
     *
     * @param id the id of the cCUserDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cCUserDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cc-users/{id}")
    public ResponseEntity<CCUserDTO> getCCUser(@PathVariable Long id) {
        log.debug("REST request to get CCUser : {}", id);
        Optional<CCUserDTO> cCUserDTO = cCUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cCUserDTO);
    }

    /**
     * {@code DELETE  /cc-users/:id} : delete the "id" cCUser.
     *
     * @param id the id of the cCUserDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cc-users/{id}")
    public ResponseEntity<Void> deleteCCUser(@PathVariable Long id) {
        log.debug("REST request to delete CCUser : {}", id);
        cCUserService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
