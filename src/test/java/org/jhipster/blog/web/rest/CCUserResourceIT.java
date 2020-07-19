package org.jhipster.blog.web.rest;

import org.jhipster.blog.BlogApp;
import org.jhipster.blog.domain.CCUser;
import org.jhipster.blog.repository.CCUserRepository;
import org.jhipster.blog.service.CCUserService;
import org.jhipster.blog.service.dto.CCUserDTO;
import org.jhipster.blog.service.mapper.CCUserMapper;

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
 * Integration tests for the {@link CCUserResource} REST controller.
 */
@SpringBootTest(classes = BlogApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class CCUserResourceIT {

    private static final String DEFAULT_FULL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FULL_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CCUserRepository cCUserRepository;

    @Autowired
    private CCUserMapper cCUserMapper;

    @Autowired
    private CCUserService cCUserService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCCUserMockMvc;

    private CCUser cCUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CCUser createEntity(EntityManager em) {
        CCUser cCUser = new CCUser()
            .fullName(DEFAULT_FULL_NAME)
            .createdAt(DEFAULT_CREATED_AT);
        return cCUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CCUser createUpdatedEntity(EntityManager em) {
        CCUser cCUser = new CCUser()
            .fullName(UPDATED_FULL_NAME)
            .createdAt(UPDATED_CREATED_AT);
        return cCUser;
    }

    @BeforeEach
    public void initTest() {
        cCUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createCCUser() throws Exception {
        int databaseSizeBeforeCreate = cCUserRepository.findAll().size();

        // Create the CCUser
        CCUserDTO cCUserDTO = cCUserMapper.toDto(cCUser);
        restCCUserMockMvc.perform(post("/api/cc-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cCUserDTO)))
            .andExpect(status().isCreated());

        // Validate the CCUser in the database
        List<CCUser> cCUserList = cCUserRepository.findAll();
        assertThat(cCUserList).hasSize(databaseSizeBeforeCreate + 1);
        CCUser testCCUser = cCUserList.get(cCUserList.size() - 1);
        assertThat(testCCUser.getFullName()).isEqualTo(DEFAULT_FULL_NAME);
        assertThat(testCCUser.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
    }

    @Test
    @Transactional
    public void createCCUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cCUserRepository.findAll().size();

        // Create the CCUser with an existing ID
        cCUser.setId(1L);
        CCUserDTO cCUserDTO = cCUserMapper.toDto(cCUser);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCCUserMockMvc.perform(post("/api/cc-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cCUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CCUser in the database
        List<CCUser> cCUserList = cCUserRepository.findAll();
        assertThat(cCUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCCUsers() throws Exception {
        // Initialize the database
        cCUserRepository.saveAndFlush(cCUser);

        // Get all the cCUserList
        restCCUserMockMvc.perform(get("/api/cc-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cCUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].fullName").value(hasItem(DEFAULT_FULL_NAME)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())));
    }
    
    @Test
    @Transactional
    public void getCCUser() throws Exception {
        // Initialize the database
        cCUserRepository.saveAndFlush(cCUser);

        // Get the cCUser
        restCCUserMockMvc.perform(get("/api/cc-users/{id}", cCUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cCUser.getId().intValue()))
            .andExpect(jsonPath("$.fullName").value(DEFAULT_FULL_NAME))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCCUser() throws Exception {
        // Get the cCUser
        restCCUserMockMvc.perform(get("/api/cc-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCCUser() throws Exception {
        // Initialize the database
        cCUserRepository.saveAndFlush(cCUser);

        int databaseSizeBeforeUpdate = cCUserRepository.findAll().size();

        // Update the cCUser
        CCUser updatedCCUser = cCUserRepository.findById(cCUser.getId()).get();
        // Disconnect from session so that the updates on updatedCCUser are not directly saved in db
        em.detach(updatedCCUser);
        updatedCCUser
            .fullName(UPDATED_FULL_NAME)
            .createdAt(UPDATED_CREATED_AT);
        CCUserDTO cCUserDTO = cCUserMapper.toDto(updatedCCUser);

        restCCUserMockMvc.perform(put("/api/cc-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cCUserDTO)))
            .andExpect(status().isOk());

        // Validate the CCUser in the database
        List<CCUser> cCUserList = cCUserRepository.findAll();
        assertThat(cCUserList).hasSize(databaseSizeBeforeUpdate);
        CCUser testCCUser = cCUserList.get(cCUserList.size() - 1);
        assertThat(testCCUser.getFullName()).isEqualTo(UPDATED_FULL_NAME);
        assertThat(testCCUser.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingCCUser() throws Exception {
        int databaseSizeBeforeUpdate = cCUserRepository.findAll().size();

        // Create the CCUser
        CCUserDTO cCUserDTO = cCUserMapper.toDto(cCUser);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCCUserMockMvc.perform(put("/api/cc-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cCUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CCUser in the database
        List<CCUser> cCUserList = cCUserRepository.findAll();
        assertThat(cCUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCCUser() throws Exception {
        // Initialize the database
        cCUserRepository.saveAndFlush(cCUser);

        int databaseSizeBeforeDelete = cCUserRepository.findAll().size();

        // Delete the cCUser
        restCCUserMockMvc.perform(delete("/api/cc-users/{id}", cCUser.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CCUser> cCUserList = cCUserRepository.findAll();
        assertThat(cCUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
