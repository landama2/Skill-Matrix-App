package cz.cvut.fel.skillmatrix.web.rest;

import cz.cvut.fel.skillmatrix.domain.SkillLevel;
import cz.cvut.fel.skillmatrix.service.SkillLevelService;
import cz.cvut.fel.skillmatrix.service.dto.SkillLevelDTO;
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
 * REST controller for managing {@link SkillLevel}.
 */
@RestController
@RequestMapping("/api")
public class SkillLevelResource {

    private final Logger log = LoggerFactory.getLogger(SkillLevelResource.class);

    private static final String ENTITY_NAME = "skillLevel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SkillLevelService skillLevelService;

    public SkillLevelResource(SkillLevelService skillLevelService) {
        this.skillLevelService = skillLevelService;
    }

    /**
     * {@code POST  /skill-levels} : Create a new skillLevel.
     *
     * @param skillLevelDTO the skillLevelDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new skillLevelDTO, or with status {@code 400 (Bad Request)} if the skillLevel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/skill-levels")
    public ResponseEntity<SkillLevelDTO> createSkillLevel(@RequestBody SkillLevelDTO skillLevelDTO) throws URISyntaxException {
        log.debug("REST request to save SkillLevel : {}", skillLevelDTO);
        if (skillLevelDTO.getId() != null) {
            throw new BadRequestAlertException("A new skillLevel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SkillLevelDTO result = skillLevelService.save(skillLevelDTO);
        return ResponseEntity.created(new URI("/api/skill-levels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /skill-levels} : Updates an existing skillLevel.
     *
     * @param skillLevelDTO the skillLevelDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated skillLevelDTO,
     * or with status {@code 400 (Bad Request)} if the skillLevelDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the skillLevelDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/skill-levels")
    public ResponseEntity<SkillLevelDTO> updateSkillLevel(@RequestBody SkillLevelDTO skillLevelDTO) throws URISyntaxException {
        log.debug("REST request to update SkillLevel : {}", skillLevelDTO);
        if (skillLevelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SkillLevelDTO result = skillLevelService.save(skillLevelDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, skillLevelDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /skill-levels} : get all the skillLevels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of skillLevels in body.
     */
    @GetMapping("/skill-levels")
    public List<SkillLevelDTO> getAllSkillLevels() {
        log.debug("REST request to get all SkillLevels");
        return skillLevelService.findAll();
    }

    /**
     * {@code GET  /skill-levels/:id} : get the "id" skillLevel.
     *
     * @param id the id of the skillLevelDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the skillLevelDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/skill-levels/{id}")
    public ResponseEntity<SkillLevelDTO> getSkillLevel(@PathVariable Long id) {
        log.debug("REST request to get SkillLevel : {}", id);
        Optional<SkillLevelDTO> skillLevelDTO = skillLevelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(skillLevelDTO);
    }

    /**
     * {@code DELETE  /skill-levels/:id} : delete the "id" skillLevel.
     *
     * @param id the id of the skillLevelDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/skill-levels/{id}")
    public ResponseEntity<Void> deleteSkillLevel(@PathVariable Long id) {
        log.debug("REST request to delete SkillLevel : {}", id);
        skillLevelService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
