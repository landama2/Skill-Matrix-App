package org.jhipster.blog.service;

import org.jhipster.blog.domain.SkillLevel;
import org.jhipster.blog.repository.SkillLevelRepository;
import org.jhipster.blog.service.dto.SkillLevelDTO;
import org.jhipster.blog.service.mapper.SkillLevelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link SkillLevel}.
 */
@Service
@Transactional
public class SkillLevelService {

    private final Logger log = LoggerFactory.getLogger(SkillLevelService.class);

    private final SkillLevelRepository skillLevelRepository;

    private final SkillLevelMapper skillLevelMapper;

    public SkillLevelService(SkillLevelRepository skillLevelRepository, SkillLevelMapper skillLevelMapper) {
        this.skillLevelRepository = skillLevelRepository;
        this.skillLevelMapper = skillLevelMapper;
    }

    /**
     * Save a skillLevel.
     *
     * @param skillLevelDTO the entity to save.
     * @return the persisted entity.
     */
    public SkillLevelDTO save(SkillLevelDTO skillLevelDTO) {
        log.debug("Request to save SkillLevel : {}", skillLevelDTO);
        SkillLevel skillLevel = skillLevelMapper.toEntity(skillLevelDTO);
        skillLevel = skillLevelRepository.save(skillLevel);
        return skillLevelMapper.toDto(skillLevel);
    }

    /**
     * Get all the skillLevels.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<SkillLevelDTO> findAll() {
        log.debug("Request to get all SkillLevels");
        return skillLevelRepository.findAll().stream()
            .map(skillLevelMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one skillLevel by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<SkillLevelDTO> findOne(Long id) {
        log.debug("Request to get SkillLevel : {}", id);
        return skillLevelRepository.findById(id)
            .map(skillLevelMapper::toDto);
    }

    /**
     * Delete the skillLevel by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete SkillLevel : {}", id);
        skillLevelRepository.deleteById(id);
    }
}
