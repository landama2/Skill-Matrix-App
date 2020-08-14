package cz.cvut.fel.skillmatrix.service;

import cz.cvut.fel.skillmatrix.service.mapper.CCUserMapper;
import cz.cvut.fel.skillmatrix.domain.CCUser;
import cz.cvut.fel.skillmatrix.repository.CCUserRepository;
import cz.cvut.fel.skillmatrix.service.dto.CCUserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link CCUser}.
 */
@Service
@Transactional
public class CCUserService {

    private final Logger log = LoggerFactory.getLogger(CCUserService.class);

    private final CCUserRepository cCUserRepository;

    private final CCUserMapper cCUserMapper;

    public CCUserService(CCUserRepository cCUserRepository, CCUserMapper cCUserMapper) {
        this.cCUserRepository = cCUserRepository;
        this.cCUserMapper = cCUserMapper;
    }

    /**
     * Save a cCUser.
     *
     * @param cCUserDTO the entity to save.
     * @return the persisted entity.
     */
    public CCUserDTO save(CCUserDTO cCUserDTO) {
        log.debug("Request to save CCUser : {}", cCUserDTO);
        CCUser cCUser = cCUserMapper.toEntity(cCUserDTO);
        cCUser = cCUserRepository.save(cCUser);
        return cCUserMapper.toDto(cCUser);
    }

    /**
     * Get all the cCUsers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<CCUserDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CCUsers");
        return cCUserRepository.findAll(pageable)
            .map(cCUserMapper::toDto);
    }

    /**
     * Get one cCUser by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CCUserDTO> findOne(Long id) {
        log.debug("Request to get CCUser : {}", id);
        return cCUserRepository.findById(id)
            .map(cCUserMapper::toDto);
    }

    /**
     * Delete the cCUser by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CCUser : {}", id);
        cCUserRepository.deleteById(id);
    }
}
