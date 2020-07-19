package org.jhipster.blog.web.rest;

import org.jhipster.blog.BlogApp;
import org.jhipster.blog.domain.SkillLevel;
import org.jhipster.blog.repository.SkillLevelRepository;
import org.jhipster.blog.service.SkillLevelService;
import org.jhipster.blog.service.dto.SkillLevelDTO;
import org.jhipster.blog.service.mapper.SkillLevelMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SkillLevelResource} REST controller.
 */
@SpringBootTest(classes = BlogApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class SkillLevelResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SkillLevelRepository skillLevelRepository;

    @Autowired
    private SkillLevelMapper skillLevelMapper;

    @Autowired
    private SkillLevelService skillLevelService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSkillLevelMockMvc;

    private SkillLevel skillLevel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SkillLevel createEntity(EntityManager em) {
        SkillLevel skillLevel = new SkillLevel()
            .name(DEFAULT_NAME);
        return skillLevel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SkillLevel createUpdatedEntity(EntityManager em) {
        SkillLevel skillLevel = new SkillLevel()
            .name(UPDATED_NAME);
        return skillLevel;
    }

    @BeforeEach
    public void initTest() {
        skillLevel = createEntity(em);
    }

    @Test
    @Transactional
    public void createSkillLevel() throws Exception {
        int databaseSizeBeforeCreate = skillLevelRepository.findAll().size();

        // Create the SkillLevel
        SkillLevelDTO skillLevelDTO = skillLevelMapper.toDto(skillLevel);
        restSkillLevelMockMvc.perform(post("/api/skill-levels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(skillLevelDTO)))
            .andExpect(status().isCreated());

        // Validate the SkillLevel in the database
        List<SkillLevel> skillLevelList = skillLevelRepository.findAll();
        assertThat(skillLevelList).hasSize(databaseSizeBeforeCreate + 1);
        SkillLevel testSkillLevel = skillLevelList.get(skillLevelList.size() - 1);
        assertThat(testSkillLevel.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSkillLevelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = skillLevelRepository.findAll().size();

        // Create the SkillLevel with an existing ID
        skillLevel.setId(1L);
        SkillLevelDTO skillLevelDTO = skillLevelMapper.toDto(skillLevel);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSkillLevelMockMvc.perform(post("/api/skill-levels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(skillLevelDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SkillLevel in the database
        List<SkillLevel> skillLevelList = skillLevelRepository.findAll();
        assertThat(skillLevelList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSkillLevels() throws Exception {
        // Initialize the database
        skillLevelRepository.saveAndFlush(skillLevel);

        // Get all the skillLevelList
        restSkillLevelMockMvc.perform(get("/api/skill-levels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(skillLevel.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getSkillLevel() throws Exception {
        // Initialize the database
        skillLevelRepository.saveAndFlush(skillLevel);

        // Get the skillLevel
        restSkillLevelMockMvc.perform(get("/api/skill-levels/{id}", skillLevel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(skillLevel.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingSkillLevel() throws Exception {
        // Get the skillLevel
        restSkillLevelMockMvc.perform(get("/api/skill-levels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSkillLevel() throws Exception {
        // Initialize the database
        skillLevelRepository.saveAndFlush(skillLevel);

        int databaseSizeBeforeUpdate = skillLevelRepository.findAll().size();

        // Update the skillLevel
        SkillLevel updatedSkillLevel = skillLevelRepository.findById(skillLevel.getId()).get();
        // Disconnect from session so that the updates on updatedSkillLevel are not directly saved in db
        em.detach(updatedSkillLevel);
        updatedSkillLevel
            .name(UPDATED_NAME);
        SkillLevelDTO skillLevelDTO = skillLevelMapper.toDto(updatedSkillLevel);

        restSkillLevelMockMvc.perform(put("/api/skill-levels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(skillLevelDTO)))
            .andExpect(status().isOk());

        // Validate the SkillLevel in the database
        List<SkillLevel> skillLevelList = skillLevelRepository.findAll();
        assertThat(skillLevelList).hasSize(databaseSizeBeforeUpdate);
        SkillLevel testSkillLevel = skillLevelList.get(skillLevelList.size() - 1);
        assertThat(testSkillLevel.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSkillLevel() throws Exception {
        int databaseSizeBeforeUpdate = skillLevelRepository.findAll().size();

        // Create the SkillLevel
        SkillLevelDTO skillLevelDTO = skillLevelMapper.toDto(skillLevel);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSkillLevelMockMvc.perform(put("/api/skill-levels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(skillLevelDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SkillLevel in the database
        List<SkillLevel> skillLevelList = skillLevelRepository.findAll();
        assertThat(skillLevelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSkillLevel() throws Exception {
        // Initialize the database
        skillLevelRepository.saveAndFlush(skillLevel);

        int databaseSizeBeforeDelete = skillLevelRepository.findAll().size();

        // Delete the skillLevel
        restSkillLevelMockMvc.perform(delete("/api/skill-levels/{id}", skillLevel.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SkillLevel> skillLevelList = skillLevelRepository.findAll();
        assertThat(skillLevelList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
