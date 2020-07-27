package org.jhipster.blog.service;

import org.jhipster.blog.domain.UserSkill;
import org.jhipster.blog.repository.UserRepository;
import org.jhipster.blog.repository.UserSkillRepository;
import org.jhipster.blog.security.SecurityUtils;
import org.jhipster.blog.service.dto.UserSkillDTO;
import org.jhipster.blog.service.mapper.UserSkillMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link UserSkill}.
 */
@Service
@Transactional
public class UserSkillService {

    private final Logger log = LoggerFactory.getLogger(UserSkillService.class);

    private final UserSkillRepository userSkillRepository;

    private final UserRepository userRepository;

    private final UserSkillMapper userSkillMapper;

    public UserSkillService(UserSkillRepository userSkillRepository, UserRepository userRepository, UserSkillMapper userSkillMapper) {
        this.userSkillRepository = userSkillRepository;
        this.userRepository = userRepository;
        this.userSkillMapper = userSkillMapper;
    }

    /**
     * Save a userSkill.
     *
     * @param userSkillDTO the entity to save.
     * @return the persisted entity.
     */
    public UserSkillDTO save(UserSkillDTO userSkillDTO) {
        log.debug("Request to save UserSkill : {}", userSkillDTO);
        UserSkill userSkill = userSkillMapper.toEntity(userSkillDTO);
        userSkill = userSkillRepository.save(userSkill);
        return userSkillMapper.toDto(userSkill);
    }

    /**
     * Save a userSkill.
     *
     * @param userSkillDTO the entity to save.
     * @return the persisted entity.
     */
    public UserSkillDTO saveForCurrentUser(UserSkillDTO userSkillDTO) {
        log.debug("Request to save UserSkill : {}", userSkillDTO);
        String userLogin = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new RuntimeException("Current user login not found"));
        //TODO uncomment this
//        Optional<User> optionalUser = userRepository.findOneByLogin(userLogin);
//        userSkillDTO.setUserId(optionalUser.get().getId());
        UserSkill userSkill = userSkillMapper.toEntity(userSkillDTO);
        userSkill = userSkillRepository.save(userSkill);
        return userSkillMapper.toDto(userSkill);
    }

    /**
     * Get all the userSkills.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<UserSkillDTO> findAll() {
        log.debug("Request to get all UserSkills");
        return userSkillRepository.findAll().stream()
            .map(userSkillMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one userSkill by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<UserSkillDTO> findOne(Long id) {
        log.debug("Request to get UserSkill : {}", id);
        return userSkillRepository.findById(id)
            .map(userSkillMapper::toDto);
    }

    /**
     * Delete the userSkill by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete UserSkill : {}", id);
        userSkillRepository.deleteById(id);
    }


}
