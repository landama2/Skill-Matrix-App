package cz.cvut.fel.skillmatrix.web.rest;

import cz.cvut.fel.skillmatrix.BlogApp;
import cz.cvut.fel.skillmatrix.domain.UserSkill;
import cz.cvut.fel.skillmatrix.repository.UserSkillRepository;
import cz.cvut.fel.skillmatrix.service.UserSkillService;
import cz.cvut.fel.skillmatrix.service.dto.UserSkillDTO;
import cz.cvut.fel.skillmatrix.service.mapper.UserSkillMapper;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UserSkillResource} REST controller.
 */
@SpringBootTest(classes = BlogApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class UserSkillResourceIT {

    private static final Instant DEFAULT_CHANGED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CHANGED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private UserSkillRepository userSkillRepository;

    @Autowired
    private UserSkillMapper userSkillMapper;

    @Autowired
    private UserSkillService userSkillService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserSkillMockMvc;

    private UserSkill userSkill;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserSkill createEntity(EntityManager em) {
        UserSkill userSkill = new UserSkill()
            .changedAt(DEFAULT_CHANGED_AT);
        return userSkill;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserSkill createUpdatedEntity(EntityManager em) {
        UserSkill userSkill = new UserSkill()
            .changedAt(UPDATED_CHANGED_AT);
        return userSkill;
    }

    @BeforeEach
    public void initTest() {
        userSkill = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserSkill() throws Exception {
        int databaseSizeBeforeCreate = userSkillRepository.findAll().size();

        // Create the UserSkill
        UserSkillDTO userSkillDTO = userSkillMapper.toDto(userSkill);
        restUserSkillMockMvc.perform(post("/api/user-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userSkillDTO)))
            .andExpect(status().isCreated());

        // Validate the UserSkill in the database
        List<UserSkill> userSkillList = userSkillRepository.findAll();
        assertThat(userSkillList).hasSize(databaseSizeBeforeCreate + 1);
        UserSkill testUserSkill = userSkillList.get(userSkillList.size() - 1);
        assertThat(testUserSkill.getChangedAt()).isEqualTo(DEFAULT_CHANGED_AT);
    }

    @Test
    @Transactional
    public void createUserSkillWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userSkillRepository.findAll().size();

        // Create the UserSkill with an existing ID
        userSkill.setId(1L);
        UserSkillDTO userSkillDTO = userSkillMapper.toDto(userSkill);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserSkillMockMvc.perform(post("/api/user-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userSkillDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserSkill in the database
        List<UserSkill> userSkillList = userSkillRepository.findAll();
        assertThat(userSkillList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserSkills() throws Exception {
        // Initialize the database
        userSkillRepository.saveAndFlush(userSkill);

        // Get all the userSkillList
        restUserSkillMockMvc.perform(get("/api/user-skills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userSkill.getId().intValue())))
            .andExpect(jsonPath("$.[*].changedAt").value(hasItem(DEFAULT_CHANGED_AT.toString())));
    }

    @Test
    @Transactional
    public void getUserSkill() throws Exception {
        // Initialize the database
        userSkillRepository.saveAndFlush(userSkill);

        // Get the userSkill
        restUserSkillMockMvc.perform(get("/api/user-skills/{id}", userSkill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userSkill.getId().intValue()))
            .andExpect(jsonPath("$.changedAt").value(DEFAULT_CHANGED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserSkill() throws Exception {
        // Get the userSkill
        restUserSkillMockMvc.perform(get("/api/user-skills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserSkill() throws Exception {
        // Initialize the database
        userSkillRepository.saveAndFlush(userSkill);

        int databaseSizeBeforeUpdate = userSkillRepository.findAll().size();

        // Update the userSkill
        UserSkill updatedUserSkill = userSkillRepository.findById(userSkill.getId()).get();
        // Disconnect from session so that the updates on updatedUserSkill are not directly saved in db
        em.detach(updatedUserSkill);
        updatedUserSkill
            .changedAt(UPDATED_CHANGED_AT);
        UserSkillDTO userSkillDTO = userSkillMapper.toDto(updatedUserSkill);

        restUserSkillMockMvc.perform(put("/api/user-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userSkillDTO)))
            .andExpect(status().isOk());

        // Validate the UserSkill in the database
        List<UserSkill> userSkillList = userSkillRepository.findAll();
        assertThat(userSkillList).hasSize(databaseSizeBeforeUpdate);
        UserSkill testUserSkill = userSkillList.get(userSkillList.size() - 1);
        assertThat(testUserSkill.getChangedAt()).isEqualTo(UPDATED_CHANGED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingUserSkill() throws Exception {
        int databaseSizeBeforeUpdate = userSkillRepository.findAll().size();

        // Create the UserSkill
        UserSkillDTO userSkillDTO = userSkillMapper.toDto(userSkill);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserSkillMockMvc.perform(put("/api/user-skills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userSkillDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserSkill in the database
        List<UserSkill> userSkillList = userSkillRepository.findAll();
        assertThat(userSkillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserSkill() throws Exception {
        // Initialize the database
        userSkillRepository.saveAndFlush(userSkill);

        int databaseSizeBeforeDelete = userSkillRepository.findAll().size();

        // Delete the userSkill
        restUserSkillMockMvc.perform(delete("/api/user-skills/{id}", userSkill.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserSkill> userSkillList = userSkillRepository.findAll();
        assertThat(userSkillList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
