package cz.cvut.fel.skillmatrix.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class SkillLevelMapperTest {

    private SkillLevelMapper skillLevelMapper;

    @BeforeEach
    public void setUp() {
        skillLevelMapper = new SkillLevelMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(skillLevelMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(skillLevelMapper.fromId(null)).isNull();
    }
}
